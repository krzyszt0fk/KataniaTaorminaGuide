//----------------- WALIDACJA FORMULARZA----------------------------

//funkcja sprawdzająca poprawnosc wprowadzonych danych w polu o odpowiednim id
// funkcja porownuje wpisną wartość z wyrazeniem regularnym
// jesli nie będzie sie zgadzać funkcja zwraca false
function sprawdzPole(pole_id,obiektRegex) {
    var obiektPole = document.getElementById(pole_id); //pobranie elementu formularza na podstawie id
    if(!obiektRegex.test(obiektPole.value)) return false;
    else return true;

}

//funkcja sprawdzająca czy jeden z przycisków radio został wciśnięty

function sprawdzRadio(nazwa_radio) {
    var obiekt = document.getElementsByName(nazwa_radio); //pobranie elementu o odpowiedniej nazwie
    for (var i = 0; i < obiekt.length; i++) { // sprawdzenie w pętli czy przycisk radio jej zaznaczony
        if (obiekt[i].checked) {
            return true;                              // zwrócenie true gdy przycisk radio jest wciśnięty
        }
    }
    return false;
}


//główna funkcja sprawdzająca poprawność danych formularza

function sprawdz() {
    var ok = true; // zmienna informująca o poprawnym wypełnieniu formularza

    // Wyrażenia regularne dla walidacji
    var obiektNazw = /^[a-zA-Z]{2,20}$/; // wyrażenie regularne dla nazwiska
    var obiektImie = /^[a-zA-Z]{2,20}$/; // wyrażenie regularne dla imienia
    var obiektemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // wyrażenie regularne dla email
    var obiektNumer = /^\d{9}$/; // wyrażenie regularne dla numeru telefonu


    // Sprawdzenie imienia
    var imieERR=document.getElementById('imieERR');      //pobranie elementu w ktorym wyswietlany jest błąd
    if (!sprawdzPole('imie',obiektImie)) {
        ok = false;                                                             //jesli funkcja sprawdzPole zwróciła false to do zmiennej ok przypisana jest wartość false
        document.getElementById('imie').classList.add('is-invalid');   //dodanie do elementu imie czerwonej obramowki iformujacej o bledzie
        imieERR.style.display = 'block';                                        // wyswietlenie komunikatu z trescią błędu
    } else {
        document.getElementById('imie').classList.remove('is-invalid'); //jesli element jest wypełniony poprawnie to wtedy obramowanie czerwone zostaje zatąpione na zielone
        document.getElementById('imie').classList.add('is-valid');
        imieERR.style.display = 'none';                                             // ukrycie komunikatu o błędzie
    }

// Sprawdzenie nazwiska
    var nazwiskoERR = document.getElementById('nazwiskoERR'); // pobranie elementu, w którym wyświetlany jest błąd
    if (!sprawdzPole('nazwisko', obiektNazw)) {
        ok = false;                                                                 // jeśli funkcja sprawdzPole zwróciła false, to do zmiennej ok przypisana jest wartość false
        document.getElementById('nazwisko').classList.add('is-invalid');   // dodanie do elementu nazwisko czerwonej obramówki informującej o błędzie
        nazwiskoERR.style.display = 'block';                                        // wyświetlenie komunikatu z treścią błędu
    } else {
        document.getElementById('nazwisko').classList.remove('is-invalid'); // jeśli element jest wypełniony poprawnie, to obramowanie czerwone zostaje zastąpione na zielone
        document.getElementById('nazwisko').classList.add('is-valid');
        nazwiskoERR.style.display = 'none';                                     // ukrycie komunikatu o błędzie
    }

    // Sprawdzenie numeru telefonu
    var nrTelERR = document.getElementById('nrTelERR');     // pobranie elementu, w którym wyświetlany jest błąd
    if (!sprawdzPole('nrTel', obiektNumer)) {
        ok = false;                                                               // jeśli funkcja sprawdzPole zwróciła false, to do zmiennej ok przypisana jest wartość false
        document.getElementById('nrTel').classList.add('is-invalid');    // dodanie do elementu nrTel czerwonej obramówki informującej o błędzie
        nrTelERR.style.display = 'block';                                           // wyświetlenie komunikatu z treścią błędu
    } else {
        document.getElementById('nrTel').classList.remove('is-invalid'); // jeśli element jest wypełniony poprawnie, to obramowanie czerwone zostaje zastąpione na zielone
        document.getElementById('nrTel').classList.add('is-valid');
        nrTelERR.style.display = 'none';                                         // ukrycie komunikatu o błędzie
    }

    // Sprawdzenie emaila
    var emailERR = document.getElementById('emailERR');         // pobranie elementu, w którym wyświetlany jest błąd
    if (!sprawdzPole('email', obiektemail)) {
        ok = false;                                                                   // jeśli funkcja sprawdzPole zwróciła false, to do zmiennej ok przypisana jest wartość false
        document.getElementById('email').classList.add('is-invalid');           // dodanie do elementu email czerwonej obramówki informującej o błędzie
        emailERR.style.display = 'block';                                                // wyświetlenie komunikatu z treścią błędu
    } else {
        document.getElementById('email').classList.remove('is-invalid'); // jeśli element jest wypełniony poprawnie, to obramowanie czerwone zostaje zastąpione na zielone
        document.getElementById('email').classList.add('is-valid');
        emailERR.style.display = 'none';                                                 // ukrycie komunikatu o błędzie
    }

    // Sprawdzenie, czy została wybrana metoda płatności
    var sposobPlatnosciErr = document.getElementById('sposobPlatnosciERR'); // pobranie elementu, w którym wyświetlany jest błąd

    if (!sprawdzRadio('platnosc')) {                                        // sprawdzenie, czy został zaznaczony jeden z przycisków radio dla płatności
        ok = false;                                                                     // jeśli funkcja sprawdzRadio zwróciła false, to do zmiennej ok przypisana jest wartość false
        sposobPlatnosciErr.style.display = "block";                                     // wyświetlenie komunikatu z treścią błędu
    } else {
        sposobPlatnosciErr.style.display = "none";                                      // ukrycie komunikatu o błędzie
    }

    // Sprawdzenie, czy został wybrany port
    var wyborPortuErr = document.getElementById('wyborPortuERR'); // pobranie elementu, w którym wyświetlany jest błąd

    if (!sprawdzRadio('wyborPortu')) {                                       // sprawdzenie, czy został zaznaczony jeden z przycisków radio dla portu
        ok = false;                                                                     // jeśli funkcja sprawdzRadio zwróciła false, to do zmiennej ok przypisana jest wartość false
        wyborPortuErr.style.display = "block";                                          // wyświetlenie komunikatu z treścią błędu
    } else {
        wyborPortuErr.style.display = "none";                                            // ukrycie komunikatu o błędzie
    }

    return ok;                                                                          // zwrócenie wartości zmiennej ok
}