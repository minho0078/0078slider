$(document).ready(function(){
   sliderFnc.init();
});

var sliderFnc = function(){
   this.init = function(){
      var sCnt = Object.keys(sliderInfo_json).length;

      for(var i=0; i<sCnt; i++){
         var oSpace = $('#sliderSpace_uniqId_'+i);
             oSpace.css({
                "width":sliderInfo_json[i].width,
                "height":sliderInfo_json[i].height,
                "overflow":'hidden'
             });
         var oImgDiv = this.build_oImg_Div(i);
         var oBtnDiv = this.build_oBtn_Div(i);

         oSpace.append(oImgDiv).append(oBtnDiv);

         if(sliderInfo_json[i].isCenter){
            oSpace.css("margin","0 auto");
         }

         var imgDiv = $('#slider_img_div_uniqId_'+i);
         var oImg = "";
         for(var j=0; j<sliderInfo_json[i].obj.slider.fileName.length; j++){
            oImg = this.build_oImg(i,j);
            imgDiv.append(oImg);
         }

         var speed = sliderInfo_json[i].speed;

         var gap = 0;

         var imgWidth = "";
         if(this.isPercent(sliderInfo_json[i].width)){
           var percent = parseInt( (sliderInfo_json[i].width).replace("%",""))*0.01;
           gap = document.body.clientWidth * percent;
         }else{
           gap = parseInt(sliderInfo_json[i].width.replace("px"));
         }

         var scrollPosition = gap;
         var scrollImgCnt = sliderInfo_json[i].obj.slider.fileName.length;
         var limit = gap * (scrollImgCnt-1);

         setInterval(function(){
            oSpace.animate({scrollLeft: scrollPosition}, speed);

            if(scrollPosition <limit){
               scrollPosition += gap;
            }else{
               scrollPosition = 0;
            }
         },speed);

      }
   },
   this.build_oImg_Div = function(i){
      var oImg_width = 0;
      if(this.isPercent(sliderInfo_json[i].width)){
         oImg_width = window.innerWidth * sliderInfo_json[i].obj.slider.fileName.length + 25;
      }else{
         oImg_width = parseInt((sliderInfo_json[i].width).replace("px","")) * sliderInfo_json[i].obj.slider.fileName.length + 25;
      }

      var oImg = document.createElement("div");
          oImg.id = "slider_img_div_uniqId_"+i;
          oImg.className = "slider_img_div";
          oImg.style.width =  oImg_width+"px";
          oImg.style.height = sliderInfo_json[i].obj.slider.height;
          oImg.style.overflow = "hidden";
      return oImg;
   },
   this.build_oBtn_Div = function(i){
      /* i를 uniqId로 갖는 btn Div 객체 생성 */
      var oBtn = document.createElement("div");
          oBtn.id = "slider_btn_div_uniqId_"+i;
          oBtn.className = "slider_btn_div";
          oBtn.style.width = sliderInfo_json[i].obj.btn.width;
          oBtn.style.height = sliderInfo_json[i].obj.btn.height;
      return oBtn;
   }
   this.build_oImg = function(i,j){
      /* i를 uniqId로 갖는 image Div 객체 생성 */
      var oImg = document.createElement("img");
          oImg.id = "slider_img_uniqId_"+i;
          oImg.className = "slider_img";
          oImg.src = sliderInfo_json[i].obj.slider.fileName[j];
          oImg.align= "left";

          var img_width = "";
          if(this.isPercent(sliderInfo_json[i].width)){
             var percent = parseInt( (sliderInfo_json[i].width).replace("%",""))*0.01;
             img_width = (document.body.clientWidth * percent)+"px";
          }else{
             img_width = sliderInfo_json[i].width;
          }
          oImg.style.width = img_width;

          oImg.style.height = sliderInfo_json[i].obj.slider.height;
          oImg.style.float = "left";
      return oImg;
   },
   this.isPercent = function(p){
      if(p.indexOf("%")>-1){
         return true;
      }else{
         return false;
      }
   }

}






























// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
