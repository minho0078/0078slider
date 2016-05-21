// sliderBox의 갯수를 파악함.
// sliderBox_uniqId_0 <-- json의 길이를 보면 알 수 있음.
$(document).ready(function(){
   sliderFnc.init();
});

var sliderFnc = function(){
   this.init = function(){
      var sCnt = Object.keys(sliderInfo_json).length;

      // slider 갯수만큼 loop를 돌면서 내부 div 객체를 채워 줌.
      // 내부 div --> image div 와 btn div
      // 기능들은 uniqId를 따라서 개별적으로 작동될 수 있도록 해야 함.

      for(var i=0; i<sCnt; i++){
         // slider객체의 id 구조 --> sliderSpace_uniqId_0
         // uniqId를 갖는 객체.
         var oSpace = $('#sliderSpace_uniqId_'+i);
             oSpace.css({
                "width":sliderInfo_json[i].width,
                "height":sliderInfo_json[i].height,
                "overflow":'hidden'
             });
         // oSpace 내부에 image div 객체와 btn div 객체를 생성예정.
         var oImgDiv = this.build_oImg_Div(i);
         var oBtnDiv = this.build_oBtn_Div(i);

         oSpace.append(oImgDiv).append(oBtnDiv);

         if(sliderInfo_json[i].isCenter){
            oSpace.css("margin","0 auto");
         }


         // 실제 Image 객체를 세팅함.
         var imgDiv = $('#slider_img_div_uniqId_'+i);
         var oImg = "";
         for(var j=0; j<sliderInfo_json[i].obj.slider.fileName.length; j++){
            oImg = this.build_oImg(i,j);
            imgDiv.append(oImg);
         }

         var speed = sliderInfo_json[i].speed;
         var gap = parseInt(sliderInfo_json[i].width.replace("px"));
         var scrollPosition = gap;
         var scrollImgCnt = sliderInfo_json[i].obj.slider.fileName.length;
         var limit = gap * (scrollImgCnt-1);

         setInterval(function(){
            //oSpace.scrollLeft(scrollPosition);

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
      /* i를 uniqId로 갖는 image Div 객체 생성 */
      var oImg_width = parseInt((sliderInfo_json[i].obj.slider.width).replace("px","")) * sliderInfo_json[i].obj.slider.fileName.length + 25;

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
          oImg.style.width = sliderInfo_json[i].obj.slider.width;
          oImg.style.height = sliderInfo_json[i].obj.slider.height;
          oImg.style.float = "left";
      return oImg;
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
