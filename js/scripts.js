
// ------------------- FUNKCJA INICJALIZOWANA PO ZALADOWANIU DOM, DZIALANIE PRZEWIJANIA OKNA ----------------------
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;     // Zmienna do śledzenia pozycji przewijania
    // Pobranie elementu głównej nawigacji i jego wysokości
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;

    // Dodanie zdarzenia przewijania do okna
    window.addEventListener('scroll', function() {
        // Obliczanie aktualnej pozycji przewijania
        const currentTop = document.body.getBoundingClientRect().top * -1;
        // Sprawdzanie kierunku przewijania
        if ( currentTop < scrollPos) {
            // Przewijanie w górę
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Przewijanie w dół
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        // Aktualizacja pozycji przewijania
        scrollPos = currentTop;
    });
})

//---------------------- FUNKCJA WYŚWIETLAJĄCA AKTUALNĄ POGODE - OPENWEATHER API--------------------------
function pogoda(){

    //przypisanie api call do stałej, w linku znajdują sie koordynaty dla miasta Katania oraz dla Taorminy (urlT), oraz wygenerowany przeze mnie klucz Api, wramach darmowego planu - 60 calls/min
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.507877&lon=15.083030&appid=c1864a61efa2ebabebf32b1380f99eb4&units=metric&lang=pl`; //URL dla Katanii
    const urlT = `https://api.openweathermap.org/data/2.5/weather?lat=37.853069&lon=15.287920&appid=c1864a61efa2ebabebf32b1380f99eb4&units=metric&lang=pl`; //URL dla Taorminy

    // Pobieranie danych pogodowych dla Katanii
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weather');
            const weatherIcon = document.getElementById('weather-icon');
            //odpowiedz serwera daje wiele danych, wybralem następujące:
            const temp = data.main.temp;  //wartosc temperatury
            const clouds = data.clouds.all; //% zachmurzenia
            const description = data.weather[0].description; //opis warunków pogodowych
            const humidity = data.main.humidity;   //wilgotność
            const windSpeed = data.wind.speed; //prędkość wiatru
            const img  =  data.weather[0].icon;  // ikona aktualnej pogody
            //przypisanie wartości do odpowiedniego elementu
            weatherContainer.innerHTML = `
                    <p>Temperatura: ${temp.toFixed(1)}°C</p>
                    <p>Zachmurzenie: ${clouds}% ,  ${description}</p>
                    <p>Wilgotność: ${humidity}%</p>
                    <p>Prędkość wiatru: ${windSpeed} m/s</p>
                    
                `;
            //dodanie src ikony
            weatherIcon.src = `http://openweathermap.org/img/wn/${img}.png`;
        })
        // w przypadku błędu wyświetlenie komunikatu
        .catch(error => {
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = '<p>Nie udało się pobrać danych pogodowych.</p>';
        });

    // wyswietlenie aktualnej pogody dla Taorminy
    fetch(urlT)
        .then(response => response.json())
        .then(data => {
            const weatherContainerT = document.getElementById('weatherT');
            const weatherIconT = document.getElementById('weather-iconT');
            const temp = data.main.temp;
            const clouds = data.clouds.all;
            const description = data.weather[0].description;

            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const img  =  data.weather[0].icon;

            weatherContainerT.innerHTML = `
                    <p>Temperatura: ${temp.toFixed(1)}°C</p>
                    <p>Zachmurzenie: ${clouds}% ,  ${description}</p>
                    <p>Wilgotność: ${humidity}%</p>
                    <p>Prędkość wiatru: ${windSpeed} m/s</p>
                    
                `;
            weatherIconT.src = `http://openweathermap.org/img/wn/${img}.png`;
        })
        .catch(error => {
            const weatherContainerT = document.getElementById('weatherT');
            weatherContainerT.innerHTML = '<p>Nie udało się pobrać danych pogodowych.</p>';
        });

}
// Wywołanie funkcji, aby pobrać i wyświetlić pogodę przy załadowaniu strony
pogoda();


//------------- FUNKCJA POKAZUJACA LOKALIZACJE ZABYTKU -------------

function pokazLokalizacje(id) {
    const localization = document.getElementById('lokalizacja-zabytku'); //przypisanie do stalej elementu za pomoca jego id
    const mapContainer = document.getElementById('localization-container');

    //stworznie mapy URL dla kazdego z obiektow, kazdy przycisk przypisany jest do odpowiedniego url z lokalizacja obiektu
    const mapUrls = {
        firstSlideButton: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395.6471609990589!2d15.087321778361723!3d37.503736534498216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313e32e8ba55555%3A0x6b2ba8ca5b93c68a!2zUGHFgmFjIMWad2nEmXRlZ28gSnVsaWFuYQ!5e0!3m2!1spl!2spl!4v1717873146043!5m2!1spl!2spl",
        secondSlideButton: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d559.5280015598735!2d15.084508111042808!3d37.503947281979926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313e3294d73bbcf%3A0x4347a336bd1b5c09!2sChurch%20of%20Saint%20Francis%20Borgia!5e0!3m2!1spl!2spl!4v1717872739570!5m2!1spl!2spl",
        thirdSlideButton: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395.64396647088915!2d15.086408962017146!3d37.50433934277758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313e32e90ed3be9%3A0x29cf7b615d62386b!2sBasilica%20della%20Collegiata!5e0!3m2!1spl!2spl!4v1717873360510!5m2!1spl!2spl",
        fourthSlideButton: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d791.3006745429726!2d15.079528501062548!3d37.50313716288854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313e38adbd1c3e3%3A0x3e92edeba3800567!2sChistro%20di%20Levante%20Caffeaos!5e0!3m2!1spl!2spl!4v1717873690269!5m2!1spl!2spl",

        // z dopiskiem T dla miejsc w Taorminie
        firstSlideButtonT: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1113.82824178919!2d15.29470091411015!3d37.851351066536964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1314119be2bde563%3A0xe96a41d658c984bc!2sBelvedere%20di%20Via%20Pirandello!5e0!3m2!1spl!2spl!4v1717879300454!5m2!1spl!2spl",
        secondSlideButtonT:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393.79967507296396!2d15.290009604201005!3d37.85099090998032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131411989eb8cff5%3A0x77590d279a22b515!2sVilla%20Comunale%20di%20Taormina!5e0!3m2!1spl!2spl!4v1717879463862!5m2!1spl!2spl",
        thirdSlideButtonT: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1575.1972591860585!2d15.298555491613987!3d37.85105836318749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1314119cdb3147e5%3A0xb323c9e246d1e303!2sSpiaggia%20di%20Isola%20Bella!5e0!3m2!1spl!2spl!4v1717879665176!5m2!1spl!2spl",
        fourthSlideButtonT:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196.89626865375922!2d15.28755781644865!3d37.85232726796822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131411a225ad44af%3A0x7322547bdb9327f!2sVia%20Naumachia%2C%2012%2C%2098039%20Taormina%20ME%2C%20W%C5%82ochy!5e0!3m2!1spl!2spl!4v1717879770714!5m2!1spl!2spl"
    };
// sprawdzenie czy mapa jest już wyświetlona, jesli element src lokalizacji zabytku jest taki sam co url wciśniętego przycisku to wtedy mapa jest ukrywana i wartość src zmienana na pusta
    if (localization.src === mapUrls[id]) {
        mapContainer.style.display = "none";
        localization.src = "";
    } else {  // w przeciwnym razie znaczy ze mapa nie jest aktualnie wyswietlona wiec do localization.src wpisywana jest wartość url dla odpowiedniego przycisku
        localization.src = mapUrls[id];
        mapContainer.style.display = "block"; //wyświetlenie mapy
    }
}


// --------------- FUNKCJA SPRAWDZAJĄCA I WYŚWIETLAJĄCA ILOŚĆ OSÓB WYBRANYCH W FORMULARZU -----------------

document.addEventListener("DOMContentLoaded", function() {
    // Pobieranie elementów range i span
    const iloscDoroslychRange = document.getElementById("iloscDoroslych");
    const iloscDoroslychValue = document.getElementById("iloscDoroslychValue");
    const iloscDzieciRange = document.getElementById("iloscDzieci");
    const iloscDzieciValue = document.getElementById("iloscDzieciValue");

    // Funkcja aktualizująca wyświetlaną wartość dorosłych
    function updateDoroslychValue() {
        iloscDoroslychValue.textContent = iloscDoroslychRange.value;
    }

    // Funkcja aktualizująca wyświetlaną wartość dzieci
    function updateDzieciValue() {
        iloscDzieciValue.textContent = iloscDzieciRange.value;
    }

    // Dodanie nasłuchiwania zdarzeń input dla suwaków co sprawia że dane mogą zmieniać się na bierząco
    iloscDoroslychRange.addEventListener("input", updateDoroslychValue);
    iloscDzieciRange.addEventListener("input", updateDzieciValue);
});



// --------------- FUNKCJA SPRAWIAJĄCA ŻE BLIK JEST DOSTĘPNĄ OPCJĄ PŁATNOŚCI TYLKO WTEDY JEŚLI NARODOWOŚĆ TO POLSKA ---------------------------
document.addEventListener("DOMContentLoaded", function() {

    const narodowoscSelect = document.querySelector(".form-select"); //przypisanie elementu z klasy form-select do narodowoscSelect
    const blik = document.getElementById("platnoscBlik").closest(".form-check"); //wynikowa referencja do elementu z klasą form-check jest przypisywana do zmiennej blik.
    const platnoscBlik = document.getElementById("platnoscBlik");

    function aktualizujBlik() {
        const narodowosc = narodowoscSelect.value; // pobranie wartości dla wybranej narodowości
        if (narodowosc == 1) {//jesli narodowosc to Polska wtedy opcja Blik jest widoczna
            blik.style.display = "block";
        } else {
            blik.style.display = "none";
            // Odznaczenie opcji Blik, jeśli nie jest już dostępna
            if (platnoscBlik.checked) {
                platnoscBlik.checked = false;
            }
        }
    }

    // Wywołanie funkcji przy załadowaniu strony
    aktualizujBlik();

    // Dodanie event listenera na zmianę wyboru narodowości
    narodowoscSelect.addEventListener("change", aktualizujBlik);
});




// ----------   FUNKCJA OBLICZAJĄCA CENĘ REJSU -----------

document.addEventListener("DOMContentLoaded", function() {

    // Pobieranie elementów range i span
    const iloscDoroslychRange = document.getElementById("iloscDoroslych");
    const iloscDzieciRange = document.getElementById("iloscDzieci");
    const iloscDoroslychValue = document.getElementById("iloscDoroslychValue");
    const iloscDzieciValue = document.getElementById("iloscDzieciValue");

    // Pobieranie elementów checkbox dla dodatkowych opcji
    const dodatek1 = document.getElementById("Dodatek1");
    const dodatek2 = document.getElementById("Dodatek2");
    const dodatek3 = document.getElementById("Dodatek3");

    // Pobieranie elementów do wyświetlania cen poszczególnych dodatków oraz łącznej ceny dla wszystkich dodatków
    const cenaDodatkow = document.getElementById("cenaDodatkow");
    const cenaDodatku1 = document.getElementById("cenaDodatku1");
    const cenaDodatku2 = document.getElementById("cenaDodatku2");
    const cenaDodatku3 = document.getElementById("cenaDodatku3");


    // Pobieranie elementu do wyświetlania całkowitej ceny (cena podstawowa + dodatki)
    const calkowitaCena = document.getElementById("calkowitaCena");

    // Funkcja aktualizująca wyświetlaną wartość dorosłych
    function updateDoroslychValue() {
        iloscDoroslychValue.textContent = iloscDoroslychRange.value;
    }

    // Funkcja aktualizująca wyświetlaną wartość dzieci
    function updateDzieciValue() {
        iloscDzieciValue.textContent = iloscDzieciRange.value;
    }

    // Funkcja obliczająca całkowitą cenę
    function calculatePrice() {
        //pobieranie wartosci range do zmniennych
        const iloscDoroslych = parseInt(iloscDoroslychRange.value);
        const iloscDzieci = parseInt(iloscDzieciRange.value);

        //obliczenie ceny podstawowej
        let total = (iloscDoroslych * 60) + (iloscDzieci * 50);
        //ustawienie cen dodatkow na 0
        let dodatkiTotal = 0;

        //jesli dodatek1 zaznaczony to obliczana jest cena dodatku1, wyswietlana i dodana do calkowitej ceny dodatków
        if (dodatek1.checked) {
            const dodatek1Cena = (iloscDoroslych + iloscDzieci) * 20;
            dodatkiTotal += dodatek1Cena;
            cenaDodatku1.textContent = dodatek1Cena + " EUR";
        } else {
            cenaDodatku1.textContent = "0 EUR";
        }
        //jesli dodatek2 zaznaczony to obliczana jest cena dodatku2, wyswietlana i dodana do calkowitej ceny dodatków
        if (dodatek2.checked) {
            const dodatek2Cena = (iloscDoroslych + iloscDzieci) * 12;
            dodatkiTotal += dodatek2Cena;
            cenaDodatku2.textContent = dodatek2Cena + " EUR";
        } else {
            cenaDodatku2.textContent = "0 EUR";
        }
//jesli dodatek3 zaznaczony to obliczana jest cena dodatku3, wyswietlana i dodana do calkowitej ceny dodatków
        if (dodatek3.checked) {
            const dodatek3Cena = (iloscDoroslych + iloscDzieci) * 10;
            dodatkiTotal += dodatek3Cena;
            cenaDodatku3.textContent = dodatek3Cena + " EUR";
        } else {
            cenaDodatku3.textContent = "0 EUR";
        }
//cena calkowita zwiekszona jest o wartosc wszystkich dodatkow
        total += dodatkiTotal;
        cenaDodatkow.textContent = dodatkiTotal + " EUR";
        calkowitaCena.value = total + " EUR";
    }

    // Dodanie nasłuchiwania zdarzeń input dla suwaków
    iloscDoroslychRange.addEventListener("input", function() {
        updateDoroslychValue();
        calculatePrice();
    });

    iloscDzieciRange.addEventListener("input", function() {
        updateDzieciValue();
        calculatePrice();
    });

    // Dodanie nasłuchiwania zdarzeń change dla checkboxów
    dodatek1.addEventListener("change", calculatePrice);
    dodatek2.addEventListener("change", calculatePrice);
    dodatek3.addEventListener("change", calculatePrice);

    // Inicjalizacja wyświetlanych wartości
    updateDoroslychValue();
    updateDzieciValue();
    calculatePrice();
});




// ------------------ SPRAWDZENIE AKTUALNEGO KURSU EURO ZA POMOCĄ NBP API ------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {//kod wewnątrz tego bloku zostanie wykonany dopiero po całkowitym załadowaniu dokumentu HTML
    //pobieranie elementów dokumentu http - calkowitej ceny, kurs euro oraz cenaPLn
    const calkowitaCenaInput = document.getElementById('calkowitaCena');
    const kursEuroP = document.getElementById('kursEuro');
    const cenaPLNP = document.getElementById('cenaPLN');

    window.sprawdzCenePLN = async function() {
        try {
            // Pobranie aktualnego kursu wymiany euro, response przechowuje wynik operacji fetch
            const response = await fetch('https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json'); //fetch to funkcja ktora inicjuje żądanie GET do podanego URL,await powoduje, że wykonanie funkcji jest wstrzymywane, dopóki obietnica (Promise) zwracana przez fetch nie zostanie rozwiązana.
            const data = await response.json(); //data przechowuje wynik danych uzyskanych z API
            const kursEuro = data.rates[0].mid;//wyodrębnienie wartosci kursu euro

            // Wyświetlenie aktualnego kursu euro
            kursEuroP.textContent = `Aktualny kurs Euro: ${kursEuro} PLN`;

            // Pobranie wartości ceny calkowitej w euro
            const calkowitaCenaEuro = parseFloat(calkowitaCenaInput.value);

            // Obliczenie ceny w PLN
            const calkowitaCenaPLN = calkowitaCenaEuro * kursEuro;

            // Wyswietlenie ceny w PLN
            cenaPLNP.textContent = `Całkowita cena w PLN: ${calkowitaCenaPLN.toFixed(2)} PLN`;
        } catch (error) { //w przypadku błędu pojawia sie błąd i odpowiedni komunikat
            console.error('Error fetching the exchange rate:', error);
            kursEuroP.textContent = 'Nie udało się pobrać kursu Euro. Spróbuj ponownie później.';
        }
    };
});



// ------------------- SPRAWDZENIE DANYCH I ZAPSIANIE  DO LOCAL STORAGE ---------------------------------------

function zapiszDane() {
    // Pobranie danych z formularza
    const imie = document.getElementById("imie").value;
    const nazwisko = document.getElementById("nazwisko").value;
    const email = document.getElementById("email").value;
    const nrTel = document.getElementById("nrTel").value;
    const narodowosc = document.querySelector(".form-select").value;
    const platnosc = document.querySelector('input[name="platnosc"]:checked').id;
    const wyborPortu = document.querySelector('input[name="wyborPortu"]:checked').id;
    const iloscDoroslych = document.getElementById("iloscDoroslych").value;
    const iloscDzieci = document.getElementById("iloscDzieci").value;
    const dodatek1 = document.getElementById("Dodatek1").checked;
    const dodatek2 = document.getElementById("Dodatek2").checked;
    const dodatek3 = document.getElementById("Dodatek3").checked;
    const calkowitaCena = document.getElementById("calkowitaCena").value;

    // Utworzenie obiektu z danymi
    const daneFormularza = {
        imie,
        nazwisko,
        email,
        nrTel,
        narodowosc,
        platnosc,
        wyborPortu,
        iloscDoroslych,
        iloscDzieci,
        dodatki: {
            nurkowanie: dodatek1,
            degustacja: dodatek2,
            widok: dodatek3
        },
        calkowitaCena
    };

    // Wyświetlenie okna z danymi do zapisania
    const daneDoZapisania = `
        Imię: ${imie}\n
        Nazwisko: ${nazwisko}\n
        Email: ${email}\n
        Numer telefonu: ${nrTel}\n
        Narodowość: ${narodowosc}\n
        Sposób płatności: ${platnosc}\n
        Port: ${wyborPortu}\n
        Ilość dorosłych: ${iloscDoroslych}\n
        Ilość dzieci: ${iloscDzieci}\n
        Dodatki: Nurkowanie: ${dodatek1}, Degustacja: ${dodatek2}, Widok: ${dodatek3}\n
        Całkowita cena: ${calkowitaCena}
    `;
    const potwierdzenie = confirm(`Czy chcesz zapisać następujące dane?\n${daneDoZapisania}`);

    if (potwierdzenie) {
        // Zapisanie danych do local storage
        localStorage.setItem("daneFormularza", JSON.stringify(daneFormularza));
        alert("Dane zostały zapisane.");
        return true;
    } else {
        alert("Dane nie zostały zapisane.");
        return false;
    }
}

//------------------------- WYŚWIETLANIE ZAPISANYCH DANYCH W LOCAL STORAGE --------------------------------

function wyswietlDane() {
    // Pobranie danych z local storage
    const daneFormularza = JSON.parse(localStorage.getItem("daneFormularza"));
// gdy nie ma nic zapisanego pojawia się komunikat
    if (!daneFormularza) {
        alert("Brak zapisanych danych.");
        return;
    }

    // Utworzenie tabelki z danymi
    const tabela = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Pole</th>
                    <th scope="col">Wartość</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Imię</td>
                    <td>${daneFormularza.imie}</td>
                </tr>
                <tr>
                    <td>Nazwisko</td>
                    <td>${daneFormularza.nazwisko}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${daneFormularza.email}</td>
                </tr>
                <tr>
                    <td>Numer telefonu</td>
                    <td>${daneFormularza.nrTel}</td>
                </tr>
                <tr>
                    <td>Narodowość</td>
                    <td>${daneFormularza.narodowosc}</td>
                </tr>
                <tr>
                    <td>Sposób płatności</td>
                    <td>${daneFormularza.platnosc}</td>
                </tr>
                <tr>
                    <td>Port</td>
                    <td>${daneFormularza.wyborPortu}</td>
                </tr>
                <tr>
                    <td>Ilość dorosłych</td>
                    <td>${daneFormularza.iloscDoroslych}</td>
                </tr>
                <tr>
                    <td>Ilość dzieci</td>
                    <td>${daneFormularza.iloscDzieci}</td>
                </tr>
                <tr>
                    <td>Dodatki</td>
                    <td>
                        Nurkowanie z akwalungiem: ${daneFormularza.dodatki.nurkowanie ? 'Tak' : 'Nie'}<br>
                        Degustacja miejscowych potraw: ${daneFormularza.dodatki.degustacja ? 'Tak' : 'Nie'}<br>
                        Miejsca z najlepszym widokiem: ${daneFormularza.dodatki.widok ? 'Tak' : 'Nie'}
                    </td>
                </tr>
                <tr>
                    <td>Całkowita cena</td>
                    <td>${daneFormularza.calkowitaCena}</td>
                </tr>
            </tbody>
        </table>
    `;

    // Wstawienie tabelki do odpowiedniego elementu w HTML
    document.getElementById("daneLS").innerHTML = tabela;
    const daneLocalStorage = document.getElementById("daneLS");
    daneLocalStorage.style.display="block"; // ustawienie elementu jako widoczny
}


// ------------------- FUNKCJA USUWAJACA DANE ZAPISANE W LOCAL STORAGE ------------------------------

function usunDane() {
    // Wyświetlenie komunikatu potwierdzającego usunięcie danych
    const potwierdzenie = confirm("Czy na pewno chcesz usunąć zapisane dane?");

    if (potwierdzenie) {
        // Usunięcie danych z local storage
        localStorage.removeItem("daneFormularza");
        alert("Dane zostały usunięte.");
        //DODATKOWO BRAK WYSWIETLENIE DIVA Z DANYMI LOCAL STORAGE
        const daneLocalStorage = document.getElementById("daneLS");
        daneLocalStorage.style.display="none";

    } else {
        alert("Dane nie zostały usunięte.");
    }
}




// ------------- OBSLUGA PRZYCISKOW ODPOWIEDZIALNYCH ZA POWIEKSZANIE I ZMNIEJSZANIE WIDOKU GALERII -----------

// Nasłuchiwacz zdarzeń, który uruchamia się gdy cały dokument HTML jest w pełni załadowany
document.addEventListener("DOMContentLoaded", function() {
    // Pobiera przycisk o ID "zmniejsz" i przypisuje go do zmiennej zmniejszButton
    const zmniejszButton = document.getElementById("zmniejsz");
    // Pobiera przycisk o ID "powieksz" i przypisuje go do zmiennej powiekszButton
    const powiekszButton = document.getElementById("powieksz");
    // Pobiera wszystkie elementy obrazów w kontenerze o ID "zdjecia" i przypisuje je do zmiennej miniaturki
    const miniaturki = document.querySelectorAll("#zdjecia img");

    // Nasłuchiwacz zdarzeń kliknięcia do przycisku zmniejszButton.
    zmniejszButton.addEventListener("click", function() {
        // Iteruje przez każdą miniaturkę
        miniaturki.forEach(function(miniatura) {
            // Pobiera aktualną szerokość miniaturki jeśli jest ustawiona lub domyślnie ustawia na 20
            let currentWidth = parseFloat(miniatura.style.width) || 20;
            // Oblicza nową szerokość, która jest zmniejszona o 5% ale nowa wartość nie może być mniejsza niż 10%
            let newWidth = Math.max(10, currentWidth - 5);
            // Ustawia nową szerokość miniaturki.
            miniatura.style.width = newWidth + "%";
            // Ustawia nową wysokość miniaturki
            miniatura.style.height = newWidth + "%";
        });
    });

    // Nasłuchiwacz zdarzeń kliknięcia do przycisku powiekszButton
    powiekszButton.addEventListener("click", function() {
        // Iteruje przez każdą miniaturkę
        miniaturki.forEach(function(miniatura) {
            // Pobiera aktualną szerokość miniaturki jeśli jest ustawiona lub domyślnie ustawia na 20
            let currentWidth = parseFloat(miniatura.style.width) || 20;
            // Oblicza nową szerokość, która jest zwiększona o 5% - nowa wartosc nie może być większa niż 50%
            let newWidth = Math.min(50, currentWidth + 5);
            // Ustawia nową szerokość miniaturki
            miniatura.style.width = newWidth + "%";
            // Ustawia nową wysokość miniaturki
            miniatura.style.height = newWidth + "%";
        });
    });
});





