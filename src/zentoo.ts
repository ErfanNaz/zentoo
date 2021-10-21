const jQuery = require("jquery");

window['jQuery'] = jQuery;
window['$'] = jQuery;

require("bootstrap");
require("jquery-smooth-scroll");

export class Zentoo {

  private _menueOpen = false;
  private _impressumOpen = false;
  private _isMobile = false;
  private _isPhone = false;
  private _scrollSpy = null;
  private _inVisibleList: string[];

  constructor() {

    this._inVisibleList = ["#about", "#services", "#contact"];
    $("#nav .nav").click(() => {
      this.toggleMenue();
    });
    $("#menuButton").click(() => {
      this.toggleMenue();
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this._isMobile = true;
    }
    if (this._isMobile && $(window).width() <= 767) {
      this._isPhone = true;
    }
    $(".impressumButton").click(this.toggleImpressum.bind(this));
    $("a").smoothScroll();
    if (!this._isPhone) {
      $(window).on("scroll", this.collapseNavbar.bind(this));
      this.collapseNavbar();
      var windowHeight = $(window).height();
      var height = windowHeight > 500 ? windowHeight - 250 : windowHeight;
      this._scrollSpy = $(window).scrollspy({
        offset: height
      });
      this._scrollSpy.on("activate.bs.scrollspy", (e) => {
        var targetID = $(e.target.innerHTML).attr("href");
        this.onScroll(targetID);
      });
    }
  }

  onScroll(targetID) {
    switch (targetID) {
      case ("#about"):
        this.onAboutVisible();
        break;
      case ("#services"):
        this.onServicesVisible();
        break;
      case ("#contact"):
        this.onContactVisible();
        break;
    }
    if (this._inVisibleList.length === 0) {
      this._scrollSpy.off("activate.bs.scrollspy");
    }
  }

  onAboutVisible() {
    const itemIndex = this._inVisibleList.indexOf("#about");
    if (itemIndex !== -1) {
      this._inVisibleList.splice(itemIndex, 1);
      $("#about").addClass("animated fadeIn");
    }
  }

  onServicesVisible() {
    const itemIndex = this._inVisibleList.indexOf("#services");
    if (itemIndex !== -1) {
      this._inVisibleList.splice(itemIndex, 1);
      const infoContainerList = $("#services .InfoContainer > div");
      $(infoContainerList[0]).addClass("animated fadeInLeft");
      $(infoContainerList[1]).addClass("animated fadeInUp");
      $(infoContainerList[2]).addClass("animated fadeInRight");
    }
  }

  onContactVisible() {
    const itemIndex = this._inVisibleList.indexOf("#contact");
    if (itemIndex !== -1) {
      this._inVisibleList.splice(itemIndex, 1);
      $("#contact").addClass("animated fadeIn");
    }
  }

  toggleMenue() {
    if (this._menueOpen) {
      window.setTimeout(() => {
        $("#nav").toggleClass("hide");
      }, 200);
      $("body").toggleClass("menuOpen");
      $("#nav").toggleClass("fade-in");
      if (!this._isPhone) {
        $(window).on("scroll", this.collapseNavbar.bind(this));
        this.collapseNavbar();
      }
    } else {
      $("body").toggleClass("menuOpen");
      $("#nav").toggleClass("hide");
      $("#nav").toggleClass("fade-in");
      if (!this._isPhone) {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(window).off("scroll", this.collapseNavbar.bind(this));
      }
    }
    $("#menuButton").toggleClass("is-active");
    this._menueOpen = !this._menueOpen;
  }

  toggleImpressum() {
    $("#impressum").toggleClass("hide");
    this._impressumOpen = !this._impressumOpen;
    if (this._impressumOpen) {
      $.smoothScroll({
        scrollTarget: "#impressum"
      });
    } else {
      $.smoothScroll({
        scrollTarget: ".impressumButton"
      });
    }
  }

  collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  }
}

new Zentoo();
