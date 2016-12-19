function Ad(ten, hinh, link){
  this.ten = ten;
  this.hinh = hinh;
  this.link = link;
}

var arrAds = [
  new Ad('Cho tot', '1.jpg', 'chotot.vn'),
  new Ad('Huyndai', '2.jpg', 'huyndai.com'),
  new Ad('Cocacola', '3.jpg', 'cocacola.com.vn'),
  new Ad('Pepsi', '4.jpg', 'pepsico.vn'),
  new Ad('Tam quoc', '5.jpg', 'tamquoc.zing.vn')
];

module.exports = arrAds;
