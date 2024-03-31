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
      console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
      console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
      console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
      console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");
      
  
  