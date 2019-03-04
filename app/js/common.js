$(document).ready(function() {
  modal = {
    mainEl: $('.modal'),
    orderSent: function orderSent() {
      this.mainEl.addClass('active');
      $('.order-accepted').addClass('active');

      var checkBoxes = $('input[type=checkbox]');
      checkBoxes.each(function(i, el) {
        $(el).prop('checked', false);
      });
    },
    orderFailed: function orderFailed() {
      this.mainEl.addClass('active');
      $('.order-failed').addClass('active');
    }
  }

  initFuncs.initSlider();
  initFuncs.initCloseModalBtns(modal);
  initFuncs.initBg();
  initFuncs.initSubmitForm(modal)
});

var modal;

var initFuncs = {
  initSlider: function initSlider() {
    var imgContainers = $('.img-wrapper');

    setInterval(function() {
      if ($(imgContainers[0]).hasClass('active')) {
        $(imgContainers[1]).addClass('active');
        $(imgContainers[0]).removeClass('active');
      } else {
        $(imgContainers[0]).addClass('active');
        $(imgContainers[1]).removeClass('active');
      }
    }, 2000)
  },
  initCloseModalBtns: function initCloseBtns(modal) {
    var closeModalBtns = $('.close-btn');

    closeModalBtns.each(function(i, el) {
      $(el).on('click', function() {
        var $parent = $($(this).parent());
        $parent.removeClass('active');
        modal.mainEl.removeClass('active');
      });
    });
  },
  initBg: function initBg() {
    var bg = $('.bg-modal');
    var orderResultMessageElements = [
      $('.order-accepted'),
      $('.order-failed'),
    ]

    bg.on('click', function() {
      var $parent = $($(this).parent());
      $parent.removeClass('active');

      orderResultMessageElements.forEach(function(el) {
        el.removeClass('active');
      })
    });
  },
  initSubmitForm: function initSubmitForm(modal) {
    //E-mail Ajax Send
    $("form").on('submit', function(e) { //Change
      e.preventDefault();

      console.log('ajax started to form');
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "/sendOrder", //Change
        data: th.serialize()
      }).done(function(message) {
        console.log('ajax done');
        if (message === 'ok') {
          console.log('order sent successfully');
          $('#name').val('');
          $('#phone').val('');
          $('#testCheckBox-1').val('');
          $('#testCheckBox-2').val('');
          $('#testCheckBox-3').val('');


          modal.orderSent();
        } else {
          console.log('error ajax sending', message);
          modal.orderFailed();
        }
      }).fail(function(message) {
        modal.orderFailed();
      });
      return false;
    });
  }
}
