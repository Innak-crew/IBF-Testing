import {} from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    function openModal($el) {
        $el.classList.add('is-active');
    }
    function closeModal($el) {
        $el.classList.remove('is-active');
    }
    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });
    (document.querySelectorAll('.modal-background, .modal-close') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });

    
});

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-menu a");
  
    function highlightNavLink() {
      sections.forEach(section => {
        const top = section.offsetTop - 50;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute("id");
  
        if (window.scrollY >= top && window.scrollY < bottom) {
          navLinks.forEach(link => {
            link.classList.remove("is-active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("is-active");
            }
          });
        }
      });
    }
  
    window.addEventListener("scroll", highlightNavLink);
  });


     console.clear();
const styles = `
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
            color: #FF0000; 
            background-color: #FFFF00; 
            padding: 10px;
            border: 2px solid #FF0000; 
            border-radius: 5px;
            text-align: center;
            display: block;
            margin: 10px 0;
        `;
const warningMessage = `%c⚠️  STOP! ⚠️%c\n`;
const warningDetails =
    `%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.\n\n`;
const developedBy = `%c👨‍💻 Made by INNAK\n`;
const moreInfo = `%c🔗 For more information, visit: https://innak.in\n`;

console.log(
    warningMessage + warningDetails + developedBy + moreInfo,
    'font-size: 20px; color: #FF0000; font-weight: bold;',
    'font-size: 16px; color: #000000;',
    'font-size: 16px; color: #000000; font-weight: bold;',
    'font-size: 16px; color: #000000;',
    'font-size: 16px; color: #1E90FF; font-weight: bold;'
);
  
  
