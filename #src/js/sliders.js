function slider() {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach(e => {
    const swiper = e.children[0],
      dotts = e.querySelector(".controll-main-block__dotts");
    for (let i = 0; i < swiper.children.length; i++) {
      dotts.insertAdjacentHTML(
        "afterbegin",
        '<span class="controll-main-block__dott"></span>'
      );
    }
    setTimeout(() => {
      let i = 0;
      dotts.children[i].classList.add("controll-main-block__dott_active");
      setInterval(() => {
        dotts.children[i].classList.remove("controll-main-block__dott_active");
        i = (i + 1) % dotts.children.length;
        dotts.children[i].classList.add("controll-main-block__dott_active");
        document.querySelector(".fraction-controll__current").innerText =
          "0" + (i + 1);
      }, 4000);
    }, 0);
    if (e.dataset.fixwidth) {
    }
  });
  const slider = document.querySelector(".main-block__slider");
  const wrapper = slider.querySelector(".main-block__wrapper");
  [...wrapper.children].forEach(element => {
    element.style.width = slider.clientWidth + "px";
  });
  wrapper.style.width = wrapper.children.length * wrapper.clientWidth + "px";

  window.addEventListener("resize", () => {
    [...wrapper.children].forEach(element => {
      element.style.width = slider.clientWidth + "px";
    });
    wrapper.style.width = wrapper.children.length * slider.clientWidth + "px";
  });

  const sliderBlockDotts = document.querySelectorAll(
    ".controll-main-block__dotts"
  );
  // .forEach( e => {
  // const sliderBullets = e.querySelectorAll(".controll-main-block__dott"),
  // controll = e.querySelector(".fraction-controll__all") || undefined;
  // if (controll) controll.innerText = "0" + wrapper.children.length;
  // let i = 0;
  // sliderBullets[i]?.classList.add("controll-main-block__dott_active");
  // setInterval(() => {
  //   sliderBullets[i]?.classList.remove("controll-main-block__dott_active");
  //   i = (i + 1) % sliderBullets.length;
  //   sliderBullets[i]?.classList.add("controll-main-block__dott_active");
  //   document.querySelector(".fraction-controll__current").innerText =
  //     "0" + (i + 1);
  // }, 4000);
  // })
}
