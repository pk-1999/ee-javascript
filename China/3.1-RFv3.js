var SamplePoints1 = ee.FeatureCollection("projects/ee-pkyu1999/assets/PointsWithValue/RMD_GM2020_China_first_v2"),
  SamplePoints2 = ee.FeatureCollection("projects/ee-pkyu1999/assets/PointsWithValue/RMD_GM2020_China_second_v2"),
  S2_and_L8 = ee.ImageCollection("projects/ee-pkyu1999/assets/S2_and_L8-China_v3"),
  GMD_GM2020 = ee.FeatureCollection("projects/ee-pkyu1999/assets/mangrove/GlobalMangrove2020"),
  elevation = ee.Image("USGS/SRTMGL1_003");


function CreateRoi() {
  var roi = /* color: #98ff00 */ee.Geometry.Polygon(
    [[[108.01757161486313, 21.789945512875757],
    [108.08363833745882, 21.34770620566116],
    [108.51635439607479, 21.535693709858617],
    [109.35317186544138, 21.37864551830771],
    [109.67482733991957, 20.2279164228556],
    [108.2900142380906, 19.66982471756799],
    [108.356182278942, 18.2979758301751],
    [109.8729666340648, 17.859348973082557],
    [110.68757292314653, 18.724516213443103],
    [111.36753725373032, 19.711564567695774],
    [110.75194195132914, 20.55770764714599],
    [110.83979858948815, 21.276410131476887],
    [112.20273623046478, 21.578366294290603],
    [112.81828006354702, 21.440334963513248],
    [114.29863100729894, 21.927495176509336],
    [114.75280617484212, 22.439552302951395],
    [116.64346868135688, 22.819968238568947],
    [117.35258204352684, 23.328128452843824],
    [117.94057876968616, 23.914735847396134],
    [119.32573655185612, 25.08495623286363],
    [119.52910119200689, 25.084903568909144],
    [119.76154423652069, 25.33720505567478],
    [120.85563553803182, 24.82083365970125],
    [120.19511834269353, 23.92111024715092],
    [120.0863096154855, 23.614750685122],
    [120.10297007296319, 23.406226509098023],
    [120.05374661827565, 23.338814891771523],
    [120.03170834493515, 23.17090784170798],
    [119.99573904862919, 23.0771400778596],
    [120.20288012335597, 22.719188258646238],
    [120.31112204504048, 22.479189802512735],
    [120.53790167519507, 22.354038514165186],
    [120.63733811802372, 22.19470587219679],
    [120.70897834016928, 21.893821594392648],
    [120.90117313379078, 21.878119328690907],
    [120.91631851983357, 22.04820530464138],
    [120.9369942922568, 22.172462665184334],
    [120.98012158930925, 22.44538903580176],
    [121.08115301978434, 22.64714663993257],
    [121.36952046152973, 22.94650431655916],
    [121.56648045198007, 23.530968135072467],
    [121.68241425465656, 24.100166063484384],
    [121.88108533848037, 24.39424307905964],
    [121.92873258275164, 24.622490110013395],
    [121.8995091676782, 24.850736580005915],
    [122.09637238463309, 25.07400566805607],
    [121.76864754538175, 25.219064589130962],
    [121.57205615229493, 25.368501057524387],
    [121.34794566963065, 25.199998213543434],
    [121.0502777649571, 25.098213752030507],
    [120.8733183159952, 24.85198200079383],
    [119.78687741778799, 25.35817634375017],
    [119.92717373732154, 25.499669010035312],
    [120.02384785221045, 25.690650032300137],
    [119.78225906083513, 25.848904527868132],
    [119.82603109720648, 26.11091462836655],
    [120.04978078139479, 26.25820046948146],
    [120.08155409779587, 26.425092877307765],
    [120.41545490538736, 26.679606339592915],
    [120.42433524068217, 26.859489074979628],
    [120.85412710400529, 27.645328473551842],
    [120.38236937213591, 27.732808328507325],
    [119.90952528556595, 27.074014087297883],
    [119.59588559567685, 27.044897334890948],
    [119.33783154193239, 26.81935635416351],
    [119.21682600199351, 25.80930573917994],
    [117.32594395010199, 24.390936042775802],
    [115.87086908874119, 23.27594658850731],
    [114.9543635091325, 23.179732165670035],
    [114.10663059507294, 22.896739276401252],
    [113.2382338742185, 23.46763465799423],
    [112.92716146135481, 23.240507015850987],
    [112.69410682108052, 22.932121894624704],
    [112.85357173289911, 22.282719964679778],
    [112.089646417346, 22.130028839090166],
    [110.52336382460481, 21.640322342314597],
    [109.89628031925778, 21.671931300188866],
    [109.3851298361538, 21.927014344484466],
    [108.48122660857003, 22.022960765318356]]]);
  return roi;
}
var roi = CreateRoi();
// ***********
//Map.centerObject(roi);
// output
var assetId = 'Classified-China-v2';
var count = 10;
var name_image = ee.List(
  //['19-1']
  ['19-1', '19-2', '20-1', '20-2', '21-1', '21-2', '22-1', '22-2', '23-1', '23-2']
);

var GMD = GMD_GM2020;
var RMD = GMD.filterBounds(roi);
// Map.centerObject(roi, 9);
Map.addLayer(S2_and_L8.first(), { band: ['red', 'green', 'blue'], min: 0, max: 0.25 }, 'S2_and_L8', false);

// 定义中值滤波的半径
var closingKernal = ee.Kernel.square({ radius: 20, units: 'meters' });
var closingIteration = 1;
var filterRadius = 50;

// *******************

// 将 filteredCollection 中的要素进行缓冲
var BMD = RMD.map(function (feature) {
  return feature.buffer(2000);
});

// 在 RMD 中设置 'value' 属性为 1
RMD = RMD.map(function (feature) {
  return feature.set('value', 1);
});
// 在 BMD 中设置 'value' 属性为 0
BMD = BMD.map(function (feature) {
  return feature.set('value', 0);
});

// 将 FeatureCollection 转换为 Image
var img_RMD = RMD.reduceToImage(['value'], ee.Reducer.first()).eq(1);
var img_BMD = BMD.reduceToImage(['value'], ee.Reducer.first()).eq(0);
var elevationMask = elevation.lt(8);//.and(elevation.gt(-4));
var img_Region = ee.Image.constant(1).updateMask(img_BMD.and(elevationMask)).clip(roi).rename('landcover');
//Map.addLayer(elevationMask, {min: -10, max: 10, palette: ['white', 'black']}, 'Elevation Image');
Map.addLayer(img_Region, { min: 0, max: 1, palette: ['white', 'grey'] }, 'Interest region Image', false);


// *******************

var bands = ['red', 'green', 'blue', 'nir', 'swir1', 'swir2'];
var classProperty = 'landcover';

var withRandom = SamplePoints1;
var split = 0.7;
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));

// RF
var trainedClassifier_RF_1 = ee.Classifier.smileRandomForest(150).train({
  features: trainingPartition,
  classProperty: classProperty,
  inputProperties: bands
});
var test_RF = testingPartition.classify(trainedClassifier_RF_1);
var confusionMatrix_RF = test_RF.errorMatrix(classProperty, 'classification');
print('Confusion Matrix RF', confusionMatrix_RF);
print('kappa RF', confusionMatrix_RF.kappa());

var withRandom = SamplePoints2;
var split = 0.7;
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));

// RF
var trainedClassifier_RF_2 = ee.Classifier.smileRandomForest(150).train({
  features: trainingPartition,
  classProperty: classProperty,
  inputProperties: bands
});
var test_RF = testingPartition.classify(trainedClassifier_RF_2);
var confusionMatrix_RF = test_RF.errorMatrix(classProperty, 'classification');
print('Confusion Matrix RF', confusionMatrix_RF);
print('kappa RF', confusionMatrix_RF.kappa());


// ******************
// postprogress
// close: erosion+dilation;   open: dialation+erosion
function morphologicalOperation(image, kernel, iterations) {
  //var erosion = image.focalMin({kernel: kernel, iterations: iterations});
  //var dilation = erosion.focalMax({kernel: kernel, iterations: iterations});
  //var close = dialation;
  var dilation = image.focalMax({ kernel: kernel, iterations: iterations });
  var erosion = dilation.focalMin({ kernel: kernel, iterations: iterations });
  var open = erosion;
  return open;
}
var classified = S2_and_L8.map(function (image) {
  var trainedClassifier = ee.Algorithms.If(ee.String(image.get('system:index')).slice(-1) === '1', trainedClassifier_RF_1, trainedClassifier_RF_2);    //CONDITION!
  var restrictedImage = image.classify(trainedClassifier).updateMask(img_Region);   //.updateMask(img_BMD)
  var landcoverImage = restrictedImage.rename(['landcover']);
  var zeroMaskedImage = ee.Image(0).clip(image.geometry()).rename(['landcover']);
  var compositeImage = zeroMaskedImage.where(img_Region, landcoverImage);
  // 形态学操作(morphological)
  // var morphologicalImage = morphologicalOperation(compositeImage,closingKernal,closingIteration);
  // 应用中值滤波
  var filteredImage = compositeImage.reduceNeighborhood({
    reducer: ee.Reducer.mode(),  // 选择中值滤波
    kernel: ee.Kernel.square({ radius: filterRadius, units: 'meters' }),  // 定义滤波器半径
  });
  return filteredImage.copyProperties(image, image.propertyNames());//.rename(['landcover']);
});

// 检查结果
print('Classified Images:', classified);


// 第一帧
var firstClassifiedImage = ee.Image(classified.first());
var outputImages = ee.ImageCollection.fromImages([firstClassifiedImage]);
// 遍历中间 Image
var classifiedList = classified.toList(classified.size());
for (var i = 1; i < classified.size().getInfo() - 1; i++) {
  var eeImage_this = ee.Image(classifiedList.get(i));
  outputImages = outputImages.merge(ee.ImageCollection.fromImages([eeImage_this]));
}
// 最后一帧
var lastClassifiedImage = ee.Image(classifiedList.get(classified.size().getInfo() - 1));
var outputImages = outputImages.merge(ee.ImageCollection.fromImages([lastClassifiedImage]));
print('output images:', outputImages);

//******************
// output
var outputImages_list = outputImages.toList(count);

for (var i = 0; i < count; i++) {
  var toAssetImage = ee.Image(outputImages_list.get(i));
  var f_name = name_image.get(i).getInfo();
  // 可视化
  var visParams = {
    bands: ['landcover_mode'], // 替换为你的分类结果波段名称
    min: 0,
    max: 1,
    palette: ['white', 'yellow'],
  };
  Map.addLayer(toAssetImage.updateMask(toAssetImage.neq(0)), visParams, 'Image_' + i, false);
  // 导出
  Export.image.toAsset({
    image: toAssetImage,
    assetId: assetId + '/' + f_name,
    description: f_name,
    region: roi,
    scale: 30, //重采样使空间分辨率为30m
    crs: "EPSG:4326", //使用WGS84坐标系
    maxPixels: 1e13,
    pyramidingPolicy: {  // 设置金字塔模式
      '.default': 'mode'
    }
  });
}

/*
// 遍历图像集合
var Classified_list = outputImages_list;
var sequence = ee.List.sequence(0, 9);

var computeNonZeroArea = function(index, accum) {
  var accums = ee.List(accum);
  // 获取图像
  var currentImage = ee.Image(Classified_list.get(index));

  // 计算非零值的面积
  var nonZeroArea = currentImage.mask(currentImage).gt(0).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: roi,
    scale: 30,
    maxPixels: 1e13
  }).get('landcover_mode');
  
  var pixelArea = 30 * 30; // 像素面积（平方米）
  var areaInSquareMeters = ee.Number(nonZeroArea).multiply(pixelArea); // 转换为平方米
  
  // 将结果添加到累加器
  var newAccum = accums.cat([ee.Dictionary({
    index: index,
    nonZeroArea: areaInSquareMeters
  })]);

  // 返回累加器
  return newAccum;
};

// 初始化累加器
var initialAccum = ee.List([]);

// 使用 iterate 函数执行计算
var nonZeroAreas = sequence.iterate(computeNonZeroArea, initialAccum);

print('Area in Square Meters:', nonZeroAreas);
*/
