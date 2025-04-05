export const register = (req, res) => {
  const { name, email, dob, phone, cv, password } = req.body;
  const tip = cv ? 2 : 3;
  const currTime = new Date(getTime2());
  const currTimeFormatted = formatForDatabase(currTime);

  // Proveri da li email već postoji
  const checkEmailQuery = "SELECT * FROM korisnik WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, emailData) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (emailData.length) return res.status(409).json({ message: "Nalog sa datim mailom već postoji!" });

    // Proveri da li telefon već postoji
    const checkPhoneQuery = "SELECT * FROM korisnik WHERE broj_telefona = ?";
    db.query(checkPhoneQuery, [phone], (err2, phoneData) => {
      if (err2) return res.status(500).json({ message: "Database error", error: err2 });
      if (phoneData.length) return res.status(408).json({ message: "Nalog sa datim brojem telefona već postoji!" });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Počinje SQL transakcija
      db.beginTransaction(err => {
        if (err) return res.status(500).json({ message: "Database transaction error", error: err });

        const insertUserQuery = "INSERT INTO korisnik (ime, email, datum_rodjenja, broj_telefona, biografija, id_tipa, password, vrijeme_kreiranja) VALUES (?)";
        const values = [name, email, dob, phone, cv, tip, hashedPassword, currTimeFormatted];

        db.query(insertUserQuery, [values], (err, result) => {
          if (err) {
            db.rollback(); // Poništi transakciju ako dođe do greške
            return res.status(500).json({ message: "Database error", error: err });
          }

          const userId = result.insertId; // Dobij ID novog korisnika

          // Pošalji verifikacioni email
          sendVerificationEmail(email, userId)
            .then(() => {
              db.commit(); // Potvrdi transakciju ako je sve prošlo dobro
              return res.status(200).json({ message: "Nalog je uspješno napravljen, provjerite email za verifikaciju!" });
            })
            .catch(emailError => {
              db.rollback(); // Poništi transakciju ako email ne može biti poslat
              return res.status(500).json({ message: "Greška pri slanju emaila, molimo Vas pokušajte ponovo.", error: emailError });
            });
        });
      });
    });
  });
};