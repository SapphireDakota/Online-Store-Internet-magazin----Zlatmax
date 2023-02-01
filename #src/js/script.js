@@include('sliders.js')
@@include('rating.js')

document.addEventListener("DOMContentLoaded", () => {
  const spollers = [document.querySelector("[data-spoller]")];
  const conditions = [
    "height:0;overflow:hidden;padding-top:0;padding-bottom:0;transition:all 0.5s ease;z-index:1;",
    "overflow:hidden;height: 100px;transition:all 0.5s ease;z-index:99;",
  ];
  spollers.forEach((element) => {
    let i = 0;
    element.nextElementSibling.style.cssText =
      "height:0;overflow:hidden;padding-top:0;padding-bottom:0;";
    element.addEventListener("click", () => {
      element.classList.toggle("_active-spoiler");
      i = Math.abs(i - 1);
      element.nextElementSibling.style.cssText = conditions[i];
    });
  });
  slider();
});

document.addEventListener("click", documentActions);
function documentActions(e) {
  const targetElement = e.target;
  if (targetElement.closest("[data-parent]")) {
    const subMenuId = targetElement.dataset.parent;
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
    if (subMenu !== document.querySelector("._sub-menu-open")) {
      document
        .querySelector("._sub-menu-active")
        ?.classList.remove("_sub-menu-active");
      document
        .querySelector("._sub-menu-open")
        ?.classList.remove("_sub-menu-open");
      document.documentElement?.classList.remove("sub-menu-open");
    }
    document.documentElement.classList.toggle("sub-menu-open");
    targetElement.classList.toggle("_sub-menu-active");
    subMenu.classList.toggle("_sub-menu-open");

    const gridColumns = subMenu.querySelectorAll(
      ".sub-menu-catalog__category"
    ).length;
    subMenu.style.gridTemplateColumns = `repeat(${gridColumns}, minmax(auto,20rem))`;
    e.preventDefault();
  }
  if (targetElement.closest(".menu-top-header__link_catalog")) {
    document.documentElement.classList.add("catalog-open");
    e.preventDefault();
  }
  if (targetElement.closest(".menu-catalog__back")) {
    document.querySelector(".menu-catalog").style.cssText = "left:-100%;";
    document.querySelector(".sub-menu-catalog").style.cssText = "left:-100%;";
    setTimeout(() => {
      document.querySelector(".menu-catalog").style.cssText = "";
      document.querySelector(".sub-menu-catalog").style.cssText = "";
      document.documentElement.classList.remove("catalog-open");
      document.documentElement.classList.remove("sub-catalog-open");
      document
        .querySelector("._sub-menu-active")
        ?.classList.remove("_sub-menu-active");
      document
        .querySelector("._sub-menu-open")
        ?.classList.remove("_sub-menu-open");
      document.documentElement?.classList.remove("sub-menu-open");
    }, 300);
    e.preventDefault();
  }
}

function spollerActions() {
  let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = !showmore ? true : false;
        !showmore ? target.style.removeProperty('height') : null;
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        !showmore ? target.style.removeProperty('overflow') : null;
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
        // Создаем событие 
        document.dispatchEvent(new CustomEvent("slideUpDone", {
          detail: {
            target: target
          }
        }));
      }, duration);
    }
  }
  let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty('height') : null;
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
        // Создаем событие 
        document.dispatchEvent(new CustomEvent("slideDownDone", {
          detail: {
            target: target
          }
        }));
      }, duration);
    }
  }
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
  function uniqArray(array) {
    return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  }
  function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
        return item.dataset[dataSetValue].split(",")[0];
      }
    });
    // Инициализация объектов с медиа запросами
    if (media.length) {
      const breakpointsArray = [];
      media.forEach(item => {
        const params = item.dataset[dataSetValue];
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];

      if (mdQueries.length) {
        // Работаем с каждым брейкпоинтом
        mdQueries.forEach(breakpoint => {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);
          // Объекты с нужными условиями
          const itemsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
              return true;
            }
          });
          mdQueriesArray.push({
            itemsArray,
            matchMedia
          })
        });
        return mdQueriesArray;
      }
    }
  }
  function spollers() {
    const spollersArray = document.querySelectorAll('[data-spollers]');
    if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length) {
        initSpollers(spollersRegular);
      }
      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      }
      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
          spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
          if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_spoller-init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
          } else {
            spollersBlock.classList.remove('_spoller-init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length) {
          spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
          spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
              spollerTitle.removeAttribute('tabindex');
              if (!spollerTitle.classList.contains('_spoller-active')) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            } else {
              spollerTitle.setAttribute('tabindex', '-1');
              spollerTitle.nextElementSibling.hidden = false;
            }
          });
        }
      }
      function setSpollerAction(e) {
        const el = e.target;
        if (el.closest('[data-spoller]')) {
          const spollerTitle = el.closest('[data-spoller]');
          const spollersBlock = spollerTitle.closest('[data-spollers]');
          const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
          if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
              hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_spoller-active');
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
          }
          e.preventDefault();
        }
      }
      function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
        if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
          spollerActiveTitle.classList.remove('_spoller-active');
          _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
        }
      }
      // Закрытие при клике вне спойлера
      const spollersClose = document.querySelectorAll('[data-spoller-close]');
      if (spollersClose.length) {
        document.addEventListener("click", function (e) {
          const el = e.target;
          if (!el.closest('[data-spollers]')) {
            spollersClose.forEach(spollerClose => {
              const spollersBlock = spollerClose.closest('[data-spollers]');
              const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
              spollerClose.classList.remove('_spoller-active');
              _slideUp(spollerClose.nextElementSibling, spollerSpeed);
            });
          }
        });
      }
    }
  }
  spollers();
}


document.querySelector(".menu__icon").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("menu-open");
  document.documentElement.classList.remove("catalog-open");
  document
    .querySelector("._sub-menu-active")
    ?.classList.remove("_sub-menu-active");
  document.querySelector("._sub-menu-open")?.classList.remove("_sub-menu-open");
});

function adaptiveMenu(element, newPlace, breakpoint, position) {
  const targetElement = document.querySelector(`${element}`);
  const targetParent = targetElement.parentElement;
  const newParent = document.querySelector(`${newPlace}`);
  position =
    typeof position === "number" ? position : newParent.children.length + 1;

  innerWidth < breakpoint
    ? position <= newParent.children.length
      ? newParent.insertBefore(targetElement, newParent.children[position - 1])
      : newParent.insertBefore(
          targetElement,
          newParent.children[newParent.children.length - 1]
        )
    : targetParent.appendChild(targetElement);

  matchMedia(`(max-width:` + breakpoint + `px)`).addEventListener(
    "change",
    (e) => {
      e.matches
        ? position <= newParent.children.length
          ? newParent.insertBefore(
              targetElement,
              newParent.children[position - 1]
            )
          : newParent.appendChild(targetElement)
        : targetParent.appendChild(targetElement);
    }
  );
}

adaptiveMenu(".menu-top-header__list", ".menu__body", 991.98);
adaptiveMenu(".actions-header__phones", ".top-header__container", 991.98, 1);
adaptiveMenu(".actions-header__favorite", ".top-header__container", 991.98, 4);
adaptiveMenu(".actions-header__cart", ".top-header__container", 991.98, 5);
adaptiveMenu(".body-header__search", ".catalog-header__container", 479.98);
adaptiveMenu(".body-header__actions", ".catalog-header__container", 479.98);

spollerActions();
formRating();