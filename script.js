
const map = L.map('map').setView([33.67069591406787, 130.44462560635102], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

//L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',}).addTo(map);

// Open Street Map hot
// L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
// }).addTo(map);
//アイコン
// const whiteIcon = L.icon({
//     iconUrl: 'images/ico.png',
//     shadowUrl: 'images/ico_shadow.png',
  
//   iconSize:     [40, 40], // size of the icon
//   shadowSize:   [40, 40], // size of the shadow
//   iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
//   shadowAnchor: [20, 40],  // the same for the shadow
//   popupAnchor:  [0, -42] // point from which the popup should open relative to the iconAnchor
//   });
  
// L.marker([33.67069591406787, 130.44462560635102], { icon: whiteIcon }).addTo(map).bindPopup('こんにちは！').openPopup();

  const circle = L.circle([33.67069591406787, 130.44462560635102], {
    color: 'blue', //円の輪郭線の色
    fillColor: 'skyblue', //円の塗りつぶしの色
    fillOpacity: 0.3, //塗りつぶしの不透明度
    radius: 1000 //半径、メートルで指定
  }).addTo(map);

 // circle.bindPopup("半径1kmの範囲");

// クリック位置の緯度経度表示
const popup = L.popup();

//function onMapClick(e) {
//  popup
//    .setLatLng(e.latlng)
//    .setContent("ここは" + e.latlng.toString() + "です")
//    .openOn(map);
//}

//ネットから引っ張ってきたやつ↓
const popupContents = {"features":[
  {
  "latlng": [33.67069591406787, 130.44462560635102],//マーカーの緯度経度
  "image": ["images/im01.png","images/img02.png"],//画像へのパスを書く
  "txt": ["<h1>九州産業大学</h1><p>テキスト</p>",//1枚目の写真の上に表示する文
          "<h1>九州産業大学</h1><p>テキスト</p>",]//2枚目の写真の上に表示する文
  },
  {
  "latlng": [33.659611421012094, 130.44417933417964],
  "image": ["images/im03.png"],
  "txt": ["<h1>香椎駅</h1><p>テキスト</p>"]
  }
]}

var myFeatureGroup = L.featureGroup().addTo(map).on("click", groupClick);
var marker;
for (let i = 0; i < popupContents.features.length; i ++) {//マーカーの数だけループ
  const image = popupContents.features[i].image;//写真までのパスの配列
  const txt = popupContents.features[i].txt;//テキストの配列
  const length = image.length;//写真の数
  const latLng = popupContents.features[i].latlng;//マーカーの緯度経度
  var contents = ``;
  for (let j=0; j<length; j++){//写真の数だけループ
      if(j==0){
          contents += `<div id="content${j}" style="display:block">`
      }else{
          contents += `<div id="content${j}" style="display:none">`
      }
      contents += `<div class="text">${txt[j]}</div>`
      contents += `<div class="slide"><img src="${image[j]}"/></div>`
      contents += `</div>`
  }
  if(length != 1) {
      contents += `<div id="box"><div id="arrow-left${i}" class="arrow-left"></div>
                  <div id="arrow-right${i}" class="arrow-right"></div></div>`;
  }
  marker = L.marker(latLng).addTo(myFeatureGroup).bindPopup(contents,{autoClose:true});
  marker.length = length;
  marker.number = i;
}

function groupClick(event) {
  const length = event.layer.length;
  const number = event.layer.number;
  var current = 0;
  if(length != 1) {
      var arrowRight = document.getElementById(`arrow-right${number}`);
      var arrowLeft = document.getElementById(`arrow-left${number}`);
  
      arrowRight.addEventListener('click', function() {
          document.getElementById(`content${current}`).style.display = 'none';
          if(current === length - 1){
              current = -1;
          }
          current++;
          document.getElementById(`content${current}`).style.display = 'block';
      })

      arrowLeft.addEventListener('click', function() {
          document.getElementById(`content${current}`).style.display = 'none';
          if(current === 0){
              current = length;
          }
          current--;
          document.getElementById(`content${current}`).style.display = 'block';
      })
}}


map.on('click', onMapClick);