/* we now want when scrolling down the background change we do this by js i guess */

let fixedNave = document.querySelector('.header'),
    scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener('scroll', (e) => {
    const nav = document.querySelector('.header');
    if (window.pageYOffset > 0) {
        nav.classList.add("activ");
    } else {
        nav.classList.remove("activ");
    };

    window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');


});

scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})

//explore btn
let explorebtn = document.querySelector('.title .btn');
const HadithSection = document.querySelector('.hadith');

//When clicking ابدا التصفح btn want it to do smth and go to haidth seciton 
explorebtn.addEventListener('click', function () {
    HadithSection.scrollIntoView({ behavior: "smooth" });
});

//hadith changer

let hadithContainer = document.querySelector('.hadithcontainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
let hadithIndex = 0;
HadithChanger();

function HadithChanger() {
    fetch('./assets/ahmad.json')
        .then(response => response.json())
        .then(data => {

            let Hadiths = data;
            changeHadith();
            next.addEventListener('click', () => {
                hadithIndex == 20 ? hadithIndex = 0 : hadithIndex++;
                changeHadith()
            })
            prev.addEventListener('click', () => {
                hadithIndex == 0 ? hadithIndex = 20 : hadithIndex--;
                changeHadith()
            })
            function changeHadith() {
                hadithContainer.innerText = Hadiths[hadithIndex].arab;
                number.innerText = `20  -  ${hadithIndex + 1}`
            }
        })
}


//lectures




// link Section

// 3shan agm3 kol sections fe wa7ed

let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');

//loop on links for adding event listener for each link
// we use data filter at html so on click of each link it heads to its part 
links.forEach(link => {
    link.addEventListener('click', (e) => {
        // should remove active class first from prev and put it on current
        document.querySelector('.header li.active').classList.remove("active");
        link.classList.add("active");

        // to scroll to specfic link
        /*let target = link.dataset.filter;
        console.log(target);*/

        let target = link.dataset.filter;
        sections.forEach(section => {
            if (section.classList.contains(target)) {
                section.scrollIntoView({ behavior: "smooth" })
            }
        })

    })
})


// Quran Section
getSurahs();
function getSurahs() {
    //fetch surahs meta data {name of surah}
    fetch("http://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            let surahs = data.data.surahs.references;
            //console.log(surahs);
            let numberofSurahs = data.data.surahs.count;
            //console.log(numberofSurahs);
            // loop on surahs 
            let SurahsContainer = document.querySelector('.surahsContainer')
            SurahsContainer.innerHTML = ""

            for (let i = 0; i < numberofSurahs; i++) {

                //console.log(surahs[i]);
                // 3ayz a7ot fe Container Esm Sorah Shakl dah 

                SurahsContainer.innerHTML += `
                <div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName}</p>
                </div>`
            }

            // for popup page on click on surah title
            let surahsTitle = document.querySelectorAll('.surah');
            //console.log(surahstitle);
            let popup = document.querySelector('.surah-popup'),
                ayatContainer = document.querySelector('.ayat');

            surahsTitle.forEach((title, index) => {
                /*console.log(title);
                console.log(index);*/
                title.addEventListener('click', function () {
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            // press at surah
                            //console.log(data);

                            // just making sure ayat container is empty
                            ayatContainer.innerHTML = "";
                            let Ayat = data.data.ayahs;
                            //console.log(Ayat);
                            // just making sure ayat container is empty every time before opening new surah

                            Ayat.forEach(ayah => {
                                //console.log(ayah);
                                popup.classList.add('active');
                                //ayatContainer.innerHTML += ayah;
                                ayatContainer.innerHTML += `
                            <p>(${ayah.numberInSurah}) - ${ayah.text}</p>
                            `
                            })
                        })
                })

            })

            let closePopup = document.querySelector('.close-popup');
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active')
            })


        })
}

// Praytimes

let cards = document.querySelector('.cards');

getPrayTimes();

function getPrayTimes() {
    fetch("http://api.aladhan.com/v1/timingsByCity?city=Giza&country=Egypt&method=8")
        .then(response => response.json())
        .then(data => {
            //console.log(times);
            let times = data.data.timings;
            console.log(times);
            cards.innerHTML = "";



            for (let time in times) {
                cards.innerHTML +=
                    `
        <div class="card">
            <div class="circle">
                <svg>
                    <Circle cx="100" cy="100" r="100"></Circle>
                </svg>
                <div class="prayTime">${times[time]}</div>
            </div>
            <p>
            ${time}
            </p>
        </div>
        
        `
            }


        })

};





//Active SideBar
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    SideBar.classList.toggle("active");
})