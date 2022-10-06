import modal from "./modules/modal.min.js";

(function () {
   ("use strict");

   const modalObj = {
      activeButton: ".hamburger", // Кнопка открытия\закрытия модального окна | Обязательно для заполнения
      modal: ".nav", // Модальное окно | Обязательно для заполнения
      closeButton: ".nav__close", // Кнопка закрытия модального окна
      // overlay: ".overlay", // Класс для оверлэя
      activeClass: "--active", // Класс, который будет добавляться при активации | Обязательно для заполнения
      isRoving: false, // Необходимо ли переещать фокус только внутри открытого модального окна
   };

   modal(modalObj);

   // const navOpenBtn = document.querySelector(".hamburger");
   // const navCloseBtn = document.querySelector(".nav__btn");

   // const nav = document.querySelector("#navigation");

   // navOpenBtn.addEventListener("click", () => {
   //    nav.classList.add("nav--active");
   // });
   // navCloseBtn.addEventListener("click", () => {
   //    nav.classList.remove("nav--active");
   // });

   gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
   let activPage = 0;

   let sections = gsap.utils.toArray(".section");
   sections.forEach((section, i) => {
      // Анимация пролистывания страниц
      gsap.to(section, {
         scrollTrigger: {
            trigger: section,
            start: "top top",
            snap: 1,
            // onToggle: (progress, direction, isActive) => console.log(isActive),
         },
      });
      // Секция Инфо
      section.info = section.querySelector(".info");
      // gsap.fromTo(
      //    section.info,
      //    { yPercent: 200 },
      //    {
      //       yPercent: -200,
      //       scrollTrigger: {
      //          trigger: section,
      //          start: "top center",
      //          // end: "bottom center",
      //          markers: true,
      //          scrub: 1,
      //       },
      //    }
      // );
      // Секция img
      section.img = section.querySelector(".section__img-wrapper");
      gsap.fromTo(
         section.img,
         { opacity: 0, className: "section__img-wrapper--fixed" },
         {
            opacity: 1,
            scrollTrigger: {
               trigger: section,
               start: "top center",
               end: "bottom center",
               // markers: true,
               toggleActions: "restart reverse restart reverse",
               onEnter: () => {
                  activPage++;
               },
               onEnterBack: () => {
                  activPage--;
               },
            },
         }
      );
   });

   // ---------

   const prevPage = document.querySelector(".page-nav__arrow--up");
   const nextPage = document.querySelector(".page-nav__arrow--down");

   prevPage.addEventListener("click", () => {
      if (activPage <= 1) return;
      // activPage--;
      movePageTo(activPage - 1);
   });

   nextPage.addEventListener("click", () => {
      if (activPage >= sections.length) return;
      // activPage++;
      movePageTo(activPage + 1);
   });

   function movePageTo(activPage) {
      let y = (activPage - 1) * window.innerHeight;
      gsap.to(window, {
         scrollTo: {
            y: y,
            autoKill: false,
         },
         duration: 1,
      });
   }
})();
