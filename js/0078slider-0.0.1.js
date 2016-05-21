$(document).ready(function(){
   sliderFnc.init();
});
var gap = 0;
var oInterval = [];
var sliderFnc = function(){
   this.init = function(){
      var sCnt = Object.keys(sliderInfo_json).length;

      for(var i=0; i<sCnt; i++){
         var sliderInfo = sliderInfo_json[i].obj.slider;
         var btnInfo = sliderInfo_json[i].obj.btn;

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

         if(sliderInfo_json[i].form=="circle"){
            oSpace.css("border-radius","50%");
         }

         var imgDiv = $('#slider_img_div_uniqId_'+i);
         var oImg = "";
         for(var j=0; j < sliderInfo.fileName.length; j++){
            oImg = this.build_oImg(i,j);
            imgDiv.append(oImg);
         }

         var speed = sliderInfo_json[i].speed;



         if(this.isPercent(sliderInfo_json[i].width)){
           var percent = parseInt( (sliderInfo_json[i].width).replace("%",""))*0.01;
           gap = document.body.clientWidth * percent;
         }else{
           gap = parseInt(sliderInfo_json[i].width.replace("px"));
         }

         var scrollPosition = gap;
         var scrollImgCnt = sliderInfo.fileName.length;
         var limit = gap * (scrollImgCnt-1);
         var btnNumber = 1;

         var beforeImg = btnInfo.fileName.before;
         var afterImg = btnInfo.fileName.after;

         oInterval = setInterval(function(){

            oSpace.animate({scrollLeft: scrollPosition}, speed);
            if(btnNumber > 0){
               $('#slider_btn_uniqId_'+(btnNumber-1)).attr("src",beforeImg[btnNumber-1]);
            }else{
               $('#slider_btn_uniqId_'+(scrollImgCnt-1)).attr("src",beforeImg[scrollImgCnt-1]);
            }

            $('#slider_btn_uniqId_'+btnNumber).attr("src",afterImg[btnNumber]);

            if(scrollPosition <limit){
               scrollPosition += gap;
               btnNumber += 1;
            }else{
               scrollPosition = 0;
               btnNumber = 0;
            }

         },speed);

         /* BUTTON -> START */
         var btnDiv = $('#slider_btn_div_uniqId_'+i);
         var oBtn = "";
         for(j=0; j<sliderInfo.fileName.length; j++){
            oBtn = this.build_oBtn(i,j);
            btnDiv.append(oBtn);
         }

      }
   },
   this.build_oImg_Div = function(i){
      var sliderInfo = sliderInfo_json[i].obj.slider;
      var oImg_width = 0;
      if(this.isPercent(sliderInfo_json[i].width)){
         oImg_width = window.innerWidth * sliderInfo.fileName.length + 25;
      }else{
         oImg_width = parseInt((sliderInfo_json[i].width).replace("px","")) * sliderInfo.fileName.length + 25;
      }

      var oImg = document.createElement("div");
          oImg.id = "slider_img_div_uniqId_"+i;
          oImg.className = "slider_img_div";
          var style = oImg.style;
              style.width =  oImg_width+"px";
              style.height = sliderInfo.height;
              style.overflow = "hidden";
      return oImg;
   },
   this.build_oBtn_Div = function(i){
      /* i를 uniqId로 갖는 btn Div 객체 생성 */
      var oBtn = document.createElement("div");
          oBtn.id = "slider_btn_div_uniqId_"+i;
          oBtn.className = "slider_btn_div";
          //oBtn.style.width = sliderInfo_json[i].width;
          var style = oBtn.style;
              style.height = sliderInfo_json[i].obj.btn.height;
              style.position = "fixed";
              style.textAlign = "center";
              style.margin = "0 auto";
      return oBtn;
   }
   this.build_oImg = function(i,j){
      /* i를 uniqId로 갖는 image Div 객체 생성 */
      var sliderInfo = sliderInfo_json[i].obj.slider;
      var oImg = document.createElement("img");
          oImg.id = "slider_img_uniqId_"+i;
          oImg.className = "slider_img";
          oImg.src = sliderInfo.fileName[j];
          oImg.align= "left";

          var img_width = "";
          if(this.isPercent(sliderInfo_json[i].width)){
             var percent = parseInt( (sliderInfo_json[i].width).replace("%",""))*0.01;
             img_width = (document.body.clientWidth * percent)+"px";
          }else{
             img_width = sliderInfo_json[i].width;
          }
          var style = oImg.style;
              style.width = img_width;
              style.height = sliderInfo.height;
              style.float = "left";
      return oImg;
   },
   this.build_oBtn = function(i,j){
      var btnInfo = sliderInfo_json[i].obj.btn;

      var oBtn = document.createElement("img");
          oBtn.id = "slider_btn_uniqId_"+j;
          oBtn.className = "slider_btn";
          if(j==0){
             oBtn.src = btnInfo.fileName.after[j];
          }else{
             oBtn.src = btnInfo.fileName.before[j];
          }
          oBtn.align= "left";
          var style = oBtn.style;
              style.width = btnInfo.height;
              style.height = btnInfo.height;
              style.float = "left";
              style.marginRight = "10px";
              style.cursor="pointer";
          oBtn.onclick=function(){

             var speed = sliderInfo_json[i].speed;
             var oSpace = $('#sliderSpace_uniqId_'+i);
                 oSpace.animate({scrollLeft: j*gap}, speed);

             clearInterval(oInterval);

            var scrollPosition = j*gap;
            var scrollImgCnt = sliderInfo_json[i].obj.slider.fileName.length;
            var limit = gap * (scrollImgCnt-1);
            var btnNumber = j;
            var btnFileName = btnInfo.fileName;
            var beforeImg = btnFileName.before;
            var afterImg = btnFileName.after;

            for(var m = 0; m< scrollImgCnt; m++){
               $('#slider_btn_uniqId_'+m).attr("src",beforeImg[m]);
            }

            $('#slider_btn_uniqId_'+btnNumber).attr("src",afterImg[btnNumber]);

             oInterval = setInterval(function(){
               oSpace.animate({scrollLeft: scrollPosition}, speed);

               if(btnNumber > 0){
                  $('#slider_btn_uniqId_'+(btnNumber-1)).attr("src",beforeImg[btnNumber-1]);
               }else{
                  $('#slider_btn_uniqId_'+(scrollImgCnt-1)).attr("src",beforeImg[scrollImgCnt-1]);
               }

               $('#slider_btn_uniqId_'+btnNumber).attr("src",afterImg[btnNumber]);

               if(scrollPosition <limit){
                  scrollPosition += gap;
                  btnNumber += 1;
               }else{
                  scrollPosition = 0;
                  btnNumber = 0;
               }

            },speed);
          }
      return oBtn;
   }
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
