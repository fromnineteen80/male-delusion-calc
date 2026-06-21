import React, { useState, useMemo, useCallback, useEffect, useRef, Component } from "react";
// PREVIEW BUILD: a local ZIP sample is inlined below as ZIP_DATA so this runs in the sandbox.
// FOR GITHUB/PRODUCTION: replace the inlined ZIP_DATA object with the full 30k-ZIP snapshot.
// See README for how to load the full data file alongside this component.
const ZIP_DATA = {"62001":{"medHHIncome":93646,"eduShareBplus":0.21934501142421933,"eduShareGrad":0.08301599390708302,"eduShareAssoc":0.11348057882711349,"femIncome":{"zero":0.4773936170212766,"u75":0.4507978723404255,"b7599":0.043882978723404256,"p100":0.027925531914893616},"dist":{"p20":32839,"p40":78114,"p60":108825,"p80":136000,"p95":177482},"maleMedEarn":54766,"homeValue":208600,"grossRent":957,"ownerCostMortgage":1540,"pop":1814,"women":{"a18_24":60,"a25_29":8,"a30_34":68,"a35_39":39,"a40_49":121,"a50_64":166},"race":{"total":1814,"white":1777,"black":0,"asian":6,"native":15,"pacific":0,"other":1,"multi":15,"hispanic":46},"marital":{"neverMarried":0.1935897435897436,"separated":0,"divorced":0.08974358974358974},"obesity":0.387,"ll":[38.8814,-89.745]},"62002":{"medHHIncome":57851,"eduShareBplus":0.23617926071311743,"eduShareGrad":0.08579840179447638,"eduShareAssoc":0.11084630122902939,"femIncome":{"zero":0.3809071479458561,"u75":0.5480091823003246,"b7599":0.04211192907464577,"p100":0.02897174067917359},"dist":{"p20":22801,"p40":46012,"p60":72330,"p80":118128,"p95":200502},"maleMedEarn":44033,"homeValue":114300,"grossRent":941,"ownerCostMortgage":1200,"pop":30036,"women":{"a18_24":962,"a25_29":901,"a30_34":1223,"a35_39":911,"a40_49":2200,"a50_64":2912},"race":{"total":30036,"white":21484,"black":6097,"asian":332,"native":43,"pacific":0,"other":259,"multi":1821,"hispanic":675},"marital":{"neverMarried":0.33202819107282694,"separated":0.01793265465935787,"divorced":0.18379013312451056},"obesity":0.37,"ll":[38.9392,-90.1349]},"62006":{"medHHIncome":95625,"eduShareBplus":0.16619718309859155,"eduShareGrad":0.022535211267605635,"eduShareAssoc":0.10985915492957747,"femIncome":{"zero":0.3217821782178218,"u75":0.6237623762376238,"b7599":0.019801980198019802,"p100":0.034653465346534656},"dist":{"p20":47900,"p40":67375,"p60":109250,"p80":136500,"p95":203042},"maleMedEarn":64018,"homeValue":208000,"grossRent":null,"ownerCostMortgage":1841,"pop":536,"women":{"a18_24":0,"a25_29":1,"a30_34":28,"a35_39":13,"a40_49":27,"a50_64":77},"race":{"total":536,"white":526,"black":0,"asian":0,"native":2,"pacific":0,"other":0,"multi":8,"hispanic":2},"marital":{"neverMarried":0.3364485981308411,"separated":0,"divorced":0.06542056074766354},"obesity":0.353,"ll":[39.0643,-90.679]},"62009":{"medHHIncome":44875,"eduShareBplus":0.11083123425692695,"eduShareGrad":0.05289672544080604,"eduShareAssoc":0.15029387069689337,"femIncome":{"zero":0.3937984496124031,"u75":0.5782945736434109,"b7599":0.021705426356589147,"p100":0.006201550387596899},"dist":{"p20":19558,"p40":36643,"p60":59220,"p80":104075,"p95":191586},"maleMedEarn":41667,"homeValue":84300,"grossRent":823,"ownerCostMortgage":995,"pop":1746,"women":{"a18_24":66,"a25_29":31,"a30_34":38,"a35_39":92,"a40_49":113,"a50_64":132},"race":{"total":1746,"white":1625,"black":20,"asian":6,"native":3,"pacific":0,"other":43,"multi":49,"hispanic":11},"marital":{"neverMarried":0.250381679389313,"separated":0.030534351145038167,"divorced":0.20458015267175572},"obesity":0.37,"ll":[39.0936,-89.7981]},"62010":{"medHHIncome":72717,"eduShareBplus":0.2971777864481727,"eduShareGrad":0.0896085316686175,"eduShareAssoc":0.12420340746521004,"femIncome":{"zero":0.4176369124622682,"u75":0.4885726606295817,"b7599":0.046140577835273824,"p100":0.04764984907287624},"dist":{"p20":36504,"p40":62072,"p60":86675,"p80":142516,"p95":214755},"maleMedEarn":60492,"homeValue":170000,"grossRent":896,"ownerCostMortgage":1442,"pop":11154,"women":{"a18_24":441,"a25_29":278,"a30_34":341,"a35_39":325,"a40_49":604,"a50_64":1204},"race":{"total":11154,"white":10715,"black":107,"asian":21,"native":2,"pacific":0,"other":4,"multi":305,"hispanic":115},"marital":{"neverMarried":0.21468203158344004,"separated":0.0034144259496372174,"divorced":0.1267605633802817},"obesity":0.387,"ll":[38.9191,-90.0483]},"62011":{"medHHIncome":40455,"eduShareBplus":0.08542713567839195,"eduShareGrad":0.06030150753768844,"eduShareAssoc":0.08542713567839195,"femIncome":{"zero":0.7466666666666667,"u75":0.25333333333333335,"b7599":0,"p100":0},"dist":{"p20":17000,"p40":33500,"p60":41318,"p80":50250,"p95":92150},"maleMedEarn":29271,"homeValue":null,"grossRent":null,"ownerCostMortgage":null,"pop":259,"women":{"a18_24":0,"a25_29":0,"a30_34":8,"a35_39":7,"a40_49":17,"a50_64":3},"race":{"total":259,"white":255,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":4,"hispanic":24},"marital":{"neverMarried":0.22666666666666666,"separated":0.05333333333333334,"divorced":0},"obesity":0.39799999999999996,"ll":[39.1287,-89.2176]},"62012":{"medHHIncome":91862,"eduShareBplus":0.17758658724906243,"eduShareGrad":0.04390028678579307,"eduShareAssoc":0.15662916390911097,"femIncome":{"zero":0.3412474849094567,"u75":0.5126760563380282,"b7599":0.09215291750503019,"p100":0.053923541247484906},"dist":{"p20":43648,"p40":74019,"p60":108447,"p80":154600,"p95":207391},"maleMedEarn":53902,"homeValue":165500,"grossRent":1002,"ownerCostMortgage":1489,"pop":6496,"women":{"a18_24":208,"a25_29":164,"a30_34":179,"a35_39":217,"a40_49":404,"a50_64":639},"race":{"total":6496,"white":6364,"black":9,"asian":0,"native":14,"pacific":0,"other":57,"multi":52,"hispanic":69},"marital":{"neverMarried":0.20737509912767646,"separated":0.006344171292624901,"divorced":0.10031720856463125},"obesity":0.39,"ll":[39.0448,-90.1483]},"62013":{"medHHIncome":71250,"eduShareBplus":0.23773584905660378,"eduShareGrad":0.0830188679245283,"eduShareAssoc":0.21132075471698114,"femIncome":{"zero":0.4973821989528796,"u75":0.5026178010471204,"b7599":0,"p100":0},"dist":{"p20":37143,"p40":54625,"p60":81500,"p80":118125,"p95":219167},"maleMedEarn":67500,"homeValue":136700,"grossRent":null,"ownerCostMortgage":1325,"pop":425,"women":{"a18_24":34,"a25_29":4,"a30_34":6,"a35_39":20,"a40_49":33,"a50_64":29},"race":{"total":425,"white":380,"black":29,"asian":0,"native":0,"pacific":0,"other":5,"multi":11,"hispanic":3},"marital":{"neverMarried":0.4973821989528796,"separated":0,"divorced":0.06282722513089005},"obesity":0.353,"ll":[38.9564,-90.5736]},"62014":{"medHHIncome":82583,"eduShareBplus":0.1591532732261858,"eduShareGrad":0.04900039200313602,"eduShareAssoc":0.14464915719325755,"femIncome":{"zero":0.39539748953974896,"u75":0.5355648535564853,"b7599":0.038354253835425386,"p100":0.030683403068340307},"dist":{"p20":50840,"p40":70377,"p60":97171,"p80":144846,"p95":250001},"maleMedEarn":62500,"homeValue":187900,"grossRent":968,"ownerCostMortgage":1489,"pop":3695,"women":{"a18_24":158,"a25_29":76,"a30_34":117,"a35_39":180,"a40_49":218,"a50_64":332},"race":{"total":3695,"white":3434,"black":27,"asian":18,"native":0,"pacific":0,"other":20,"multi":196,"hispanic":112},"marital":{"neverMarried":0.29918032786885246,"separated":0.00273224043715847,"divorced":0.10177595628415301},"obesity":0.37,"ll":[39.0434,-89.9504]},"62015":{"medHHIncome":63097,"eduShareBplus":0.10236220472440945,"eduShareGrad":0,"eduShareAssoc":0.10498687664041995,"femIncome":{"zero":0.4157303370786517,"u75":0.5842696629213483,"b7599":0,"p100":0},"dist":{"p20":10600,"p40":51919,"p60":64443,"p80":123773,"p95":159534},"maleMedEarn":38528,"homeValue":101100,"grossRent":955,"ownerCostMortgage":1094,"pop":465,"women":{"a18_24":9,"a25_29":0,"a30_34":9,"a35_39":51,"a40_49":13,"a50_64":43},"race":{"total":465,"white":421,"black":0,"asian":0,"native":1,"pacific":0,"other":0,"multi":43,"hispanic":0},"marital":{"neverMarried":0.14795918367346939,"separated":0,"divorced":0.04591836734693878},"obesity":0.391,"ll":[39.2123,-89.5442]},"62016":{"medHHIncome":61155,"eduShareBplus":0.2127906976744186,"eduShareGrad":0.06511627906976744,"eduShareAssoc":0.11589147286821705,"femIncome":{"zero":0.3570898292501856,"u75":0.5270972531551597,"b7599":0.06533036377134373,"p100":0.050482553823311065},"dist":{"p20":28596,"p40":56534,"p60":76844,"p80":131500,"p95":249017},"maleMedEarn":42353,"homeValue":117100,"grossRent":906,"ownerCostMortgage":1271,"pop":3650,"women":{"a18_24":112,"a25_29":89,"a30_34":102,"a35_39":77,"a40_49":222,"a50_64":313},"race":{"total":3650,"white":3477,"black":15,"asian":30,"native":0,"pacific":0,"other":35,"multi":93,"hispanic":47},"marital":{"neverMarried":0.23414985590778098,"separated":0.028097982708933718,"divorced":0.11095100864553314},"obesity":0.402,"ll":[39.2968,-90.4155]},"62017":{"medHHIncome":83393,"eduShareBplus":0.12549537648612946,"eduShareGrad":0.0488771466314399,"eduShareAssoc":0.04227212681638045,"femIncome":{"zero":0.5314861460957179,"u75":0.4534005037783375,"b7599":0.005037783375314861,"p100":0.010075566750629723},"dist":{"p20":29045,"p40":58375,"p60":101227,"p80":124500,"p95":149963},"maleMedEarn":69048,"homeValue":102400,"grossRent":796,"ownerCostMortgage":1515,"pop":1040,"women":{"a18_24":25,"a25_29":42,"a30_34":42,"a35_39":9,"a40_49":74,"a50_64":98},"race":{"total":1040,"white":939,"black":5,"asian":0,"native":0,"pacific":0,"other":0,"multi":96,"hispanic":0},"marital":{"neverMarried":0.17587939698492464,"separated":0.01507537688442211,"divorced":0.11809045226130653},"obesity":0.39,"ll":[39.0651,-89.3686]},"62018":{"medHHIncome":41750,"eduShareBplus":0.057633973710819006,"eduShareGrad":0.015672396359959553,"eduShareAssoc":0.11880687563195147,"femIncome":{"zero":0.4175257731958763,"u75":0.5824742268041238,"b7599":0,"p100":0},"dist":{"p20":17957,"p40":29267,"p60":51746,"p80":88071,"p95":127397},"maleMedEarn":38000,"homeValue":78400,"grossRent":1018,"ownerCostMortgage":869,"pop":3006,"women":{"a18_24":96,"a25_29":77,"a30_34":74,"a35_39":122,"a40_49":250,"a50_64":196},"race":{"total":3006,"white":2681,"black":187,"asian":0,"native":0,"pacific":0,"other":9,"multi":129,"hispanic":111},"marital":{"neverMarried":0.3293718166383701,"separated":0.011035653650254669,"divorced":0.20118845500848898},"obesity":0.387,"ll":[38.9139,-90.0819]},"62019":{"medHHIncome":53594,"eduShareBplus":0.09124087591240876,"eduShareGrad":0.0036496350364963502,"eduShareAssoc":0.10583941605839416,"femIncome":{"zero":0.7425742574257426,"u75":0.25742574257425743,"b7599":0,"p100":0},"dist":{"p20":16500,"p40":46100,"p60":57000,"p80":110944,"p95":117201},"maleMedEarn":null,"homeValue":102800,"grossRent":813,"ownerCostMortgage":1048,"pop":310,"women":{"a18_24":6,"a25_29":0,"a30_34":0,"a35_39":0,"a40_49":5,"a50_64":26},"race":{"total":310,"white":263,"black":10,"asian":0,"native":0,"pacific":0,"other":0,"multi":37,"hispanic":0},"marital":{"neverMarried":0.0891089108910891,"separated":0.009900990099009901,"divorced":0.0891089108910891},"obesity":0.39,"ll":[39.0187,-89.4415]},"62021":{"medHHIncome":108125,"eduShareBplus":0.3212045169385194,"eduShareGrad":0.07026348808030113,"eduShareAssoc":0.1468005018820577,"femIncome":{"zero":0.17336683417085427,"u75":0.6457286432160804,"b7599":0.03768844221105527,"p100":0.14321608040201006},"dist":{"p20":67125,"p40":104043,"p60":109239,"p80":220000,"p95":250001},"maleMedEarn":69609,"homeValue":277700,"grossRent":null,"ownerCostMortgage":2553,"pop":1127,"women":{"a18_24":38,"a25_29":19,"a30_34":77,"a35_39":0,"a40_49":68,"a50_64":122},"race":{"total":1127,"white":1106,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":21,"hispanic":10},"marital":{"neverMarried":0.11306532663316583,"separated":0,"divorced":0.01507537688442211},"obesity":0.37,"ll":[38.9836,-89.9766]},"62022":{"medHHIncome":120350,"eduShareBplus":0.08352668213457076,"eduShareGrad":0,"eduShareAssoc":0.14037122969837587,"femIncome":{"zero":0.37595419847328243,"u75":0.6068702290076335,"b7599":0.01717557251908397,"p100":0},"dist":{"p20":51035,"p40":79825,"p60":127026,"p80":140239,"p95":173555},"maleMedEarn":42358,"homeValue":190200,"grossRent":null,"ownerCostMortgage":2152,"pop":1073,"women":{"a18_24":28,"a25_29":49,"a30_34":0,"a35_39":26,"a40_49":48,"a50_64":175},"race":{"total":1073,"white":1008,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":65,"hispanic":0},"marital":{"neverMarried":0.42748091603053434,"separated":0,"divorced":0.1183206106870229},"obesity":0.39,"ll":[39.0032,-90.3262]},"62023":{"medHHIncome":71250,"eduShareBplus":0.18421052631578946,"eduShareGrad":0.05263157894736842,"eduShareAssoc":0.17105263157894737,"femIncome":{"zero":0.32,"u75":0.64,"b7599":0,"p100":0.04},"dist":{"p20":31125,"p40":68167,"p60":79000,"p80":121500,"p95":208500},"maleMedEarn":null,"homeValue":65600,"grossRent":null,"ownerCostMortgage":1188,"pop":138,"women":{"a18_24":9,"a25_29":0,"a30_34":2,"a35_39":4,"a40_49":14,"a50_64":13},"race":{"total":138,"white":119,"black":0,"asian":2,"native":2,"pacific":0,"other":11,"multi":4,"hispanic":0},"marital":{"neverMarried":0.3787878787878788,"separated":0,"divorced":0.13636363636363635},"obesity":0.37,"ll":[39.1087,-89.779]},"62024":{"medHHIncome":60775,"eduShareBplus":0.2058412520961431,"eduShareGrad":0.07252655114589156,"eduShareAssoc":0.09264952487423142,"femIncome":{"zero":0.41626429479034305,"u75":0.5359593392630242,"b7599":0.02363405336721728,"p100":0.0241423125794155},"dist":{"p20":24997,"p40":48895,"p60":75016,"p80":103413,"p95":182507},"maleMedEarn":52198,"homeValue":112500,"grossRent":851,"ownerCostMortgage":1161,"pop":9465,"women":{"a18_24":175,"a25_29":314,"a30_34":441,"a35_39":315,"a40_49":345,"a50_64":1212},"race":{"total":9465,"white":8856,"black":104,"asian":0,"native":0,"pacific":0,"other":0,"multi":505,"hispanic":161},"marital":{"neverMarried":0.19306184012066366,"separated":0.014580191050779286,"divorced":0.17998994469582705},"obesity":0.387,"ll":[38.8831,-90.0899]},"62025":{"medHHIncome":103300,"eduShareBplus":0.5254672690229427,"eduShareGrad":0.22229604039330322,"eduShareAssoc":0.0901762777925414,"femIncome":{"zero":0.33080464241716917,"u75":0.49847630162743956,"b7599":0.08837450560850678,"p100":0.08234455034688452},"dist":{"p20":42663,"p40":79264,"p60":132062,"p80":199112,"p95":250001},"maleMedEarn":71031,"homeValue":295700,"grossRent":1215,"ownerCostMortgage":2143,"pop":36156,"women":{"a18_24":3207,"a25_29":940,"a30_34":1090,"a35_39":848,"a40_49":2589,"a50_64":3327},"race":{"total":36156,"white":32005,"black":1974,"asian":556,"native":34,"pacific":26,"other":241,"multi":1320,"hispanic":1184},"marital":{"neverMarried":0.3280690537084399,"separated":0.01272378516624041,"divorced":0.12698209718670075},"obesity":0.387,"ll":[38.8299,-89.931]},"62027":{"medHHIncome":72500,"eduShareBplus":0.18564356435643564,"eduShareGrad":0.04702970297029703,"eduShareAssoc":0.06435643564356436,"femIncome":{"zero":0.3611111111111111,"u75":0.6296296296296297,"b7599":0,"p100":0.009259259259259259},"dist":{"p20":18800,"p40":60344,"p60":88143,"p80":108957,"p95":161583},"maleMedEarn":41071,"homeValue":108300,"grossRent":504,"ownerCostMortgage":1561,"pop":517,"women":{"a18_24":15,"a25_29":11,"a30_34":11,"a35_39":3,"a40_49":34,"a50_64":94},"race":{"total":517,"white":500,"black":0,"asian":3,"native":0,"pacific":0,"other":9,"multi":5,"hispanic":1},"marital":{"neverMarried":0.2222222222222222,"separated":0.018518518518518517,"divorced":0.05555555555555555},"obesity":0.402,"ll":[39.2434,-90.5574]},"62028":{"medHHIncome":62656,"eduShareBplus":0.3968609865470852,"eduShareGrad":0.2556053811659193,"eduShareAssoc":0.06278026905829596,"femIncome":{"zero":0.5436363636363636,"u75":0.43636363636363634,"b7599":0.005454545454545455,"p100":0.014545454545454545},"dist":{"p20":3786,"p40":28411,"p60":66078,"p80":125353,"p95":171433},"maleMedEarn":7156,"homeValue":167600,"grossRent":null,"ownerCostMortgage":1240,"pop":1098,"women":{"a18_24":294,"a25_29":12,"a30_34":10,"a35_39":8,"a40_49":4,"a50_64":40},"race":{"total":1098,"white":904,"black":69,"asian":70,"native":2,"pacific":11,"other":23,"multi":19,"hispanic":58},"marital":{"neverMarried":0.6381818181818182,"separated":0,"divorced":0.06909090909090909},"obesity":0.39,"ll":[38.9582,-90.3548]},"62030":{"medHHIncome":43750,"eduShareBplus":0.05,"eduShareGrad":0,"eduShareAssoc":0,"femIncome":{"zero":0.5833333333333334,"u75":0.4166666666666667,"b7599":0,"p100":0},"dist":{"p20":20833,"p40":41667,"p60":50417,"p80":60000,"p95":69375},"maleMedEarn":null,"homeValue":92500,"grossRent":null,"ownerCostMortgage":null,"pop":105,"women":{"a18_24":0,"a25_29":0,"a30_34":0,"a35_39":6,"a40_49":0,"a50_64":18},"race":{"total":105,"white":99,"black":0,"asian":6,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.23404255319148937,"separated":0,"divorced":0},"obesity":0.39,"ll":[39.1546,-90.1645]},"62031":{"medHHIncome":91250,"eduShareBplus":0.19322709163346613,"eduShareGrad":0.045816733067729085,"eduShareAssoc":0.05179282868525897,"femIncome":{"zero":0.3272058823529412,"u75":0.5147058823529411,"b7599":0.08823529411764706,"p100":0.06985294117647059},"dist":{"p20":46750,"p40":81167,"p60":111938,"p80":144500,"p95":198708},"maleMedEarn":58167,"homeValue":127700,"grossRent":null,"ownerCostMortgage":1278,"pop":637,"women":{"a18_24":15,"a25_29":4,"a30_34":11,"a35_39":15,"a40_49":20,"a50_64":97},"race":{"total":637,"white":603,"black":0,"asian":0,"native":0,"pacific":0,"other":10,"multi":24,"hispanic":0},"marital":{"neverMarried":0.1696113074204947,"separated":0.014134275618374558,"divorced":0.1625441696113074},"obesity":0.39,"ll":[39.1115,-90.5369]},"62032":{"medHHIncome":65625,"eduShareBplus":0.05319148936170213,"eduShareGrad":0,"eduShareAssoc":0.08156028368794327,"femIncome":{"zero":0.4253246753246753,"u75":0.474025974025974,"b7599":0.003246753246753247,"p100":0.09740259740259741},"dist":{"p20":19923,"p40":46433,"p60":83950,"p80":142870,"p95":250001},"maleMedEarn":46750,"homeValue":66900,"grossRent":670,"ownerCostMortgage":1076,"pop":783,"women":{"a18_24":6,"a25_29":10,"a30_34":19,"a35_39":34,"a40_49":41,"a50_64":78},"race":{"total":783,"white":670,"black":0,"asian":7,"native":0,"pacific":0,"other":0,"multi":106,"hispanic":0},"marital":{"neverMarried":0.25,"separated":0.006493506493506494,"divorced":0.06818181818181818},"obesity":0.39799999999999996,"ll":[39.1158,-89.2883]},"62033":{"medHHIncome":75477,"eduShareBplus":0.1795519091195961,"eduShareGrad":0.05932470810981382,"eduShareAssoc":0.08236036604607132,"femIncome":{"zero":0.47274813539873783,"u75":0.4159495123350545,"b7599":0.03098106712564544,"p100":0.08032128514056225},"dist":{"p20":29140,"p40":55513,"p60":90813,"p80":133130,"p95":215539},"maleMedEarn":59122,"homeValue":104700,"grossRent":769,"ownerCostMortgage":1003,"pop":4398,"women":{"a18_24":121,"a25_29":157,"a30_34":124,"a35_39":109,"a40_49":189,"a50_64":433},"race":{"total":4398,"white":4127,"black":11,"asian":3,"native":1,"pacific":0,"other":10,"multi":246,"hispanic":37},"marital":{"neverMarried":0.20959451741861793,"separated":0.018275271273557967,"divorced":0.15248429468874927},"obesity":0.37,"ll":[39.1366,-89.8399]},"62034":{"medHHIncome":93366,"eduShareBplus":0.4944869375186252,"eduShareGrad":0.1974769047382537,"eduShareAssoc":0.08900367537498759,"femIncome":{"zero":0.39916457811194656,"u75":0.44477861319966583,"b7599":0.06148705096073517,"p100":0.09456975772765247},"dist":{"p20":43279,"p40":77118,"p60":118112,"p80":179545,"p95":250001},"maleMedEarn":68898,"homeValue":274300,"grossRent":1100,"ownerCostMortgage":2024,"pop":14519,"women":{"a18_24":553,"a25_29":380,"a30_34":472,"a35_39":571,"a40_49":797,"a50_64":1419},"race":{"total":14519,"white":12345,"black":1234,"asian":95,"native":4,"pacific":0,"other":50,"multi":791,"hispanic":566},"marital":{"neverMarried":0.22982193376601764,"separated":0.018805125644866034,"divorced":0.12780828756864704},"obesity":0.387,"ll":[38.7549,-89.9722]},"62035":{"medHHIncome":91696,"eduShareBplus":0.32991239048811016,"eduShareGrad":0.10755110554860242,"eduShareAssoc":0.13858990404672508,"femIncome":{"zero":0.3722689075630252,"u75":0.5008403361344538,"b7599":0.07801120448179272,"p100":0.04887955182072829},"dist":{"p20":48546,"p40":75529,"p60":113509,"p80":146046,"p95":250001},"maleMedEarn":61242,"homeValue":179900,"grossRent":1158,"ownerCostMortgage":1426,"pop":15915,"women":{"a18_24":436,"a25_29":603,"a30_34":374,"a35_39":417,"a40_49":865,"a50_64":2103},"race":{"total":15915,"white":14144,"black":835,"asian":123,"native":0,"pacific":11,"other":13,"multi":789,"hispanic":250},"marital":{"neverMarried":0.2046639231824417,"separated":0.009327846364883402,"divorced":0.14554183813443072},"obesity":0.39,"ll":[38.9587,-90.2427]},"62036":{"medHHIncome":103750,"eduShareBplus":0.24935064935064935,"eduShareGrad":0.14285714285714285,"eduShareAssoc":0.07272727272727272,"femIncome":{"zero":0.3920704845814978,"u75":0.5550660792951542,"b7599":0.004405286343612335,"p100":0.048458149779735685},"dist":{"p20":47167,"p40":93000,"p60":116273,"p80":153725,"p95":230475},"maleMedEarn":39583,"homeValue":221900,"grossRent":null,"ownerCostMortgage":1819,"pop":531,"women":{"a18_24":31,"a25_29":0,"a30_34":2,"a35_39":13,"a40_49":29,"a50_64":59},"race":{"total":531,"white":529,"black":0,"asian":0,"native":0,"pacific":0,"other":1,"multi":1,"hispanic":1},"marital":{"neverMarried":0.15151515151515152,"separated":0,"divorced":0.07792207792207792},"obesity":0.353,"ll":[38.9183,-90.5897]},"62037":{"medHHIncome":71838,"eduShareBplus":0.26711309523809523,"eduShareGrad":0.10863095238095238,"eduShareAssoc":0.08779761904761904,"femIncome":{"zero":0.44600280504908835,"u75":0.49228611500701264,"b7599":0.023842917251051893,"p100":0.037868162692847124},"dist":{"p20":23923,"p40":59538,"p60":93667,"p80":149600,"p95":250001},"maleMedEarn":67054,"homeValue":222900,"grossRent":null,"ownerCostMortgage":1772,"pop":1682,"women":{"a18_24":16,"a25_29":25,"a30_34":65,"a35_39":82,"a40_49":21,"a50_64":186},"race":{"total":1682,"white":1568,"black":19,"asian":0,"native":1,"pacific":0,"other":0,"multi":94,"hispanic":14},"marital":{"neverMarried":0.19810040705563092,"separated":0,"divorced":0.054274084124830396},"obesity":0.39,"ll":[39.0109,-90.4651]},"62040":{"medHHIncome":60558,"eduShareBplus":0.1609256315138668,"eduShareGrad":0.04614025790496379,"eduShareAssoc":0.10998056880409822,"femIncome":{"zero":0.4316555637799161,"u75":0.5099309153713298,"b7599":0.03361707377251419,"p100":0.024796447076239823},"dist":{"p20":24682,"p40":49893,"p60":74218,"p80":109067,"p95":188248},"maleMedEarn":45628,"homeValue":106600,"grossRent":852,"ownerCostMortgage":1170,"pop":40365,"women":{"a18_24":1438,"a25_29":1382,"a30_34":1334,"a35_39":1765,"a40_49":2276,"a50_64":3623},"race":{"total":40365,"white":32250,"black":3641,"asian":550,"native":47,"pacific":0,"other":1197,"multi":2680,"hispanic":3651},"marital":{"neverMarried":0.29972441888329737,"separated":0.023064941289240356,"divorced":0.13371675053918045},"obesity":0.387,"ll":[38.7149,-90.0989]},"62044":{"medHHIncome":73598,"eduShareBplus":0.17651245551601424,"eduShareGrad":0.03416370106761566,"eduShareAssoc":0.09679715302491103,"femIncome":{"zero":0.3553421368547419,"u75":0.5918367346938775,"b7599":0.009603841536614645,"p100":0.04321728691476591},"dist":{"p20":36667,"p40":66417,"p60":91136,"p80":139583,"p95":250001},"maleMedEarn":59199,"homeValue":106800,"grossRent":857,"ownerCostMortgage":1167,"pop":2086,"women":{"a18_24":66,"a25_29":63,"a30_34":29,"a35_39":145,"a40_49":95,"a50_64":224},"race":{"total":2086,"white":2026,"black":0,"asian":0,"native":2,"pacific":0,"other":0,"multi":58,"hispanic":20},"marital":{"neverMarried":0.2687427912341407,"separated":0,"divorced":0.16608996539792387},"obesity":0.402,"ll":[39.3658,-90.202]},"62046":{"medHHIncome":96750,"eduShareBplus":0.3913793103448276,"eduShareGrad":0.08103448275862069,"eduShareAssoc":0.12586206896551724,"femIncome":{"zero":0.3471502590673575,"u75":0.4585492227979275,"b7599":0.08549222797927461,"p100":0.10880829015544041},"dist":{"p20":32472,"p40":78417,"p60":118167,"p80":167875,"p95":226951},"maleMedEarn":70313,"homeValue":229600,"grossRent":940,"ownerCostMortgage":1875,"pop":974,"women":{"a18_24":50,"a25_29":25,"a30_34":28,"a35_39":53,"a40_49":59,"a50_64":64},"race":{"total":974,"white":932,"black":14,"asian":2,"native":0,"pacific":0,"other":0,"multi":26,"hispanic":6},"marital":{"neverMarried":0.24871794871794872,"separated":0,"divorced":0.11282051282051282},"obesity":0.387,"ll":[38.8925,-89.8387]},"62047":{"medHHIncome":110982,"eduShareBplus":0.224031007751938,"eduShareGrad":0.04573643410852713,"eduShareAssoc":0.34108527131782945,"femIncome":{"zero":0.29959514170040485,"u75":0.6207827260458839,"b7599":0.0310391363022942,"p100":0.048582995951417005},"dist":{"p20":55327,"p40":91700,"p60":132594,"p80":186083,"p95":250001},"maleMedEarn":34792,"homeValue":144100,"grossRent":417,"ownerCostMortgage":1531,"pop":1833,"women":{"a18_24":104,"a25_29":50,"a30_34":24,"a35_39":28,"a40_49":96,"a50_64":198},"race":{"total":1833,"white":1774,"black":14,"asian":0,"native":1,"pacific":0,"other":0,"multi":44,"hispanic":0},"marital":{"neverMarried":0.234375,"separated":0,"divorced":0.20442708333333334},"obesity":0.353,"ll":[39.1231,-90.6266]},"62048":{"medHHIncome":39364,"eduShareBplus":0.07621009268795056,"eduShareGrad":0.035015447991761074,"eduShareAssoc":0.10710607621009269,"femIncome":{"zero":0.48739495798319327,"u75":0.46638655462184875,"b7599":0.046218487394957986,"p100":0},"dist":{"p20":23696,"p40":37873,"p60":46375,"p80":89167,"p95":167647},"maleMedEarn":48333,"homeValue":65800,"grossRent":925,"ownerCostMortgage":935,"pop":1456,"women":{"a18_24":134,"a25_29":35,"a30_34":13,"a35_39":84,"a40_49":47,"a50_64":136},"race":{"total":1456,"white":1306,"black":11,"asian":0,"native":0,"pacific":0,"other":63,"multi":76,"hispanic":69},"marital":{"neverMarried":0.37675070028011204,"separated":0.0056022408963585435,"divorced":0.12324929971988796},"obesity":0.387,"ll":[38.7729,-90.1372]},"62049":{"medHHIncome":54767,"eduShareBplus":0.1404971932638332,"eduShareGrad":0.06832397754611066,"eduShareAssoc":0.08115477145148356,"femIncome":{"zero":0.47180085569817193,"u75":0.46246596654998057,"b7599":0.032283158304161806,"p100":0.033450019447685726},"dist":{"p20":22325,"p40":46216,"p60":82805,"p80":141500,"p95":204176},"maleMedEarn":42375,"homeValue":106600,"grossRent":817,"ownerCostMortgage":1165,"pop":8078,"women":{"a18_24":190,"a25_29":77,"a30_34":136,"a35_39":146,"a40_49":395,"a50_64":806},"race":{"total":8078,"white":7014,"black":670,"asian":0,"native":0,"pacific":6,"other":96,"multi":292,"hispanic":300},"marital":{"neverMarried":0.20825372564004585,"separated":0.0022927015666794038,"divorced":0.16545662972869699},"obesity":0.391,"ll":[39.141,-89.4795]},"62051":{"medHHIncome":51875,"eduShareBplus":0.18128654970760233,"eduShareGrad":0.02729044834307992,"eduShareAssoc":0.18518518518518517,"femIncome":{"zero":0.672316384180791,"u75":0.3192090395480226,"b7599":0.00847457627118644,"p100":0},"dist":{"p20":11905,"p40":30200,"p60":61662,"p80":98167,"p95":139975},"maleMedEarn":40625,"homeValue":99600,"grossRent":478,"ownerCostMortgage":2051,"pop":735,"women":{"a18_24":95,"a25_29":9,"a30_34":11,"a35_39":13,"a40_49":53,"a50_64":118},"race":{"total":735,"white":708,"black":3,"asian":0,"native":0,"pacific":0,"other":9,"multi":15,"hispanic":13},"marital":{"neverMarried":0.3389830508474576,"separated":0,"divorced":0.1638418079096045},"obesity":0.391,"ll":[39.2017,-89.4033]},"62052":{"medHHIncome":75296,"eduShareBplus":0.21531375935521013,"eduShareGrad":0.0743811168681635,"eduShareAssoc":0.14058721934369603,"femIncome":{"zero":0.40238331678252237,"u75":0.5255213505461768,"b7599":0.04309831181727904,"p100":0.028997020854021848},"dist":{"p20":28947,"p40":61491,"p60":89183,"p80":141196,"p95":242952},"maleMedEarn":60400,"homeValue":156000,"grossRent":790,"ownerCostMortgage":1307,"pop":12483,"women":{"a18_24":535,"a25_29":382,"a30_34":398,"a35_39":456,"a40_49":601,"a50_64":1344},"race":{"total":12483,"white":11948,"black":25,"asian":31,"native":3,"pacific":13,"other":3,"multi":460,"hispanic":210},"marital":{"neverMarried":0.2633107454017425,"separated":0.027686350435624396,"divorced":0.12623426911907068},"obesity":0.402,"ll":[39.1128,-90.3195]},"62054":{"medHHIncome":58456,"eduShareBplus":0.07434944237918216,"eduShareGrad":0.0037174721189591076,"eduShareAssoc":0.055762081784386616,"femIncome":{"zero":0.4357142857142857,"u75":0.5357142857142857,"b7599":0.02857142857142857,"p100":0},"dist":{"p20":34667,"p40":51750,"p60":64500,"p80":79308,"p95":132938},"maleMedEarn":30833,"homeValue":87800,"grossRent":833,"ownerCostMortgage":1036,"pop":347,"women":{"a18_24":15,"a25_29":7,"a30_34":5,"a35_39":10,"a40_49":21,"a50_64":46},"race":{"total":347,"white":323,"black":4,"asian":5,"native":5,"pacific":0,"other":3,"multi":7,"hispanic":3},"marital":{"neverMarried":0.24285714285714285,"separated":0.014285714285714285,"divorced":0.17857142857142858},"obesity":0.402,"ll":[39.2075,-90.3506]},"62056":{"medHHIncome":62705,"eduShareBplus":0.25581020012911554,"eduShareGrad":0.08311814073595869,"eduShareAssoc":0.07843770174306004,"femIncome":{"zero":0.44544708777686626,"u75":0.47908121410992616,"b7599":0.0440251572327044,"p100":0.031446540880503145},"dist":{"p20":20589,"p40":46657,"p60":78951,"p80":122352,"p95":196107},"maleMedEarn":46250,"homeValue":119800,"grossRent":655,"ownerCostMortgage":1208,"pop":8591,"women":{"a18_24":280,"a25_29":272,"a30_34":252,"a35_39":213,"a40_49":458,"a50_64":860},"race":{"total":8591,"white":8520,"black":0,"asian":23,"native":10,"pacific":0,"other":0,"multi":38,"hispanic":26},"marital":{"neverMarried":0.2472890769637662,"separated":0.009785770960063476,"divorced":0.14361280084633696},"obesity":0.37,"ll":[39.1756,-89.6744]},"62058":{"medHHIncome":57750,"eduShareBplus":0.1342512908777969,"eduShareGrad":0.025817555938037865,"eduShareAssoc":0.10499139414802065,"femIncome":{"zero":0.44912280701754387,"u75":0.5368421052631579,"b7599":0.014035087719298246,"p100":0},"dist":{"p20":28722,"p40":50643,"p60":63667,"p80":109750,"p95":184182},"maleMedEarn":56845,"homeValue":101800,"grossRent":641,"ownerCostMortgage":1118,"pop":791,"women":{"a18_24":6,"a25_29":32,"a30_34":24,"a35_39":20,"a40_49":13,"a50_64":64},"race":{"total":791,"white":672,"black":0,"asian":2,"native":0,"pacific":0,"other":6,"multi":111,"hispanic":8},"marital":{"neverMarried":0.22837370242214533,"separated":0,"divorced":0.11418685121107267},"obesity":0.387,"ll":[38.9684,-89.7646]},"62059":{"medHHIncome":37656,"eduShareBplus":0.24836601307189543,"eduShareGrad":0.09368191721132897,"eduShareAssoc":0.010893246187363835,"femIncome":{"zero":0.3185840707964602,"u75":0.5663716814159292,"b7599":0.04129793510324484,"p100":0.07374631268436578},"dist":{"p20":12833,"p40":21290,"p60":45109,"p80":62000,"p95":246272},"maleMedEarn":45404,"homeValue":37200,"grossRent":950,"ownerCostMortgage":957,"pop":811,"women":{"a18_24":13,"a25_29":88,"a30_34":18,"a35_39":43,"a40_49":38,"a50_64":64},"race":{"total":811,"white":9,"black":787,"asian":0,"native":0,"pacific":0,"other":0,"multi":15,"hispanic":21},"marital":{"neverMarried":0.640117994100295,"separated":0.014749262536873156,"divorced":0.15634218289085547},"obesity":0.38799999999999996,"ll":[38.6531,-90.1734]},"62060":{"medHHIncome":40139,"eduShareBplus":0.07493900313698153,"eduShareGrad":0.02474729871035204,"eduShareAssoc":0.07772743116068316,"femIncome":{"zero":0.46443514644351463,"u75":0.4793783622235505,"b7599":0.02749551703526599,"p100":0.02869097429766886},"dist":{"p20":13765,"p40":22226,"p60":49155,"p80":75766,"p95":118103},"maleMedEarn":45423,"homeValue":53600,"grossRent":1019,"ownerCostMortgage":1027,"pop":3619,"women":{"a18_24":138,"a25_29":218,"a30_34":82,"a35_39":99,"a40_49":219,"a50_64":596},"race":{"total":3619,"white":821,"black":2390,"asian":0,"native":0,"pacific":0,"other":47,"multi":361,"hispanic":151},"marital":{"neverMarried":0.5588928150765606,"separated":0.008244994110718492,"divorced":0.1607773851590106},"obesity":0.387,"ll":[38.6818,-90.1424]},"62061":{"medHHIncome":77120,"eduShareBplus":0.2344213649851632,"eduShareGrad":0.0712166172106825,"eduShareAssoc":0.12858555885262116,"femIncome":{"zero":0.48344370860927155,"u75":0.4652317880794702,"b7599":0.024834437086092714,"p100":0.026490066225165563},"dist":{"p20":46621,"p40":68934,"p60":89632,"p80":126286,"p95":189021},"maleMedEarn":59476,"homeValue":185900,"grossRent":880,"ownerCostMortgage":1531,"pop":1528,"women":{"a18_24":75,"a25_29":43,"a30_34":42,"a35_39":11,"a40_49":109,"a50_64":140},"race":{"total":1528,"white":1393,"black":0,"asian":5,"native":0,"pacific":0,"other":37,"multi":93,"hispanic":72},"marital":{"neverMarried":0.20757825370675453,"separated":0.011532125205930808,"divorced":0.10543657331136738},"obesity":0.387,"ll":[38.7907,-89.7764]},"62062":{"medHHIncome":97409,"eduShareBplus":0.4607932182864063,"eduShareGrad":0.15485921889191645,"eduShareAssoc":0.08113835906751438,"femIncome":{"zero":0.42106625258799174,"u75":0.4340062111801242,"b7599":0.07013457556935818,"p100":0.07479296066252587},"dist":{"p20":46676,"p40":77819,"p60":126571,"p80":161641,"p95":250001},"maleMedEarn":59817,"homeValue":249500,"grossRent":975,"ownerCostMortgage":1629,"pop":8521,"women":{"a18_24":303,"a25_29":297,"a30_34":309,"a35_39":184,"a40_49":344,"a50_64":1192},"race":{"total":8521,"white":7524,"black":498,"asian":176,"native":0,"pacific":0,"other":0,"multi":323,"hispanic":174},"marital":{"neverMarried":0.2196546470289487,"separated":0.018791264601320468,"divorced":0.14956830878618588},"obesity":0.387,"ll":[38.7257,-89.9631]},"62063":{"medHHIncome":51250,"eduShareBplus":0.1268357810413885,"eduShareGrad":0.06141522029372497,"eduShareAssoc":0.03471295060080107,"femIncome":{"zero":0.6900212314225053,"u75":0.267515923566879,"b7599":0.01910828025477707,"p100":0.02335456475583864},"dist":{"p20":11372,"p40":21267,"p60":67333,"p80":101500,"p95":215350},"maleMedEarn":40375,"homeValue":118600,"grossRent":859,"ownerCostMortgage":1080,"pop":869,"women":{"a18_24":24,"a25_29":4,"a30_34":14,"a35_39":115,"a40_49":40,"a50_64":199},"race":{"total":869,"white":859,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":10,"hispanic":16},"marital":{"neverMarried":0.35157894736842105,"separated":0,"divorced":0.29473684210526313},"obesity":0.402,"ll":[39.1985,-90.1499]},"62067":{"medHHIncome":80515,"eduShareBplus":0.14009661835748793,"eduShareGrad":0.05037957211870255,"eduShareAssoc":0.15527950310559005,"femIncome":{"zero":0.37057522123893805,"u75":0.5088495575221239,"b7599":0.04756637168141593,"p100":0.07300884955752213},"dist":{"p20":36516,"p40":61222,"p60":84500,"p80":111636,"p95":236039},"maleMedEarn":54152,"homeValue":220500,"grossRent":1057,"ownerCostMortgage":1537,"pop":1960,"women":{"a18_24":95,"a25_29":27,"a30_34":13,"a35_39":78,"a40_49":248,"a50_64":161},"race":{"total":1960,"white":1868,"black":30,"asian":0,"native":0,"pacific":0,"other":0,"multi":62,"hispanic":61},"marital":{"neverMarried":0.26852846401718583,"separated":0,"divorced":0.09129967776584318},"obesity":0.387,"ll":[38.929,-89.9833]},"62069":{"medHHIncome":57642,"eduShareBplus":0.1469970600587988,"eduShareGrad":0.046619067618647626,"eduShareAssoc":0.14321713565728686,"femIncome":{"zero":0.46887966804979253,"u75":0.47441217150760717,"b7599":0.01590594744121715,"p100":0.04080221300138313},"dist":{"p20":25861,"p40":44568,"p60":69119,"p80":123667,"p95":223257},"maleMedEarn":48274,"homeValue":105700,"grossRent":711,"ownerCostMortgage":1059,"pop":3102,"women":{"a18_24":136,"a25_29":29,"a30_34":22,"a35_39":74,"a40_49":291,"a50_64":386},"race":{"total":3102,"white":2993,"black":19,"asian":0,"native":0,"pacific":0,"other":0,"multi":90,"hispanic":17},"marital":{"neverMarried":0.17724137931034484,"separated":0.001379310344827586,"divorced":0.21586206896551724},"obesity":0.37,"ll":[39.0891,-89.7393]},"62074":{"medHHIncome":88450,"eduShareBplus":0.2308598351001178,"eduShareGrad":0.05889281507656066,"eduShareAssoc":0.160188457008245,"femIncome":{"zero":0.2761904761904762,"u75":0.6071428571428571,"b7599":0.07380952380952381,"p100":0.04285714285714286},"dist":{"p20":46861,"p40":75488,"p60":122542,"p80":156125,"p95":219163},"maleMedEarn":55595,"homeValue":263700,"grossRent":775,"ownerCostMortgage":1835,"pop":1236,"women":{"a18_24":31,"a25_29":23,"a30_34":27,"a35_39":46,"a40_49":87,"a50_64":133},"race":{"total":1236,"white":1201,"black":0,"asian":0,"native":1,"pacific":0,"other":3,"multi":31,"hispanic":5},"marital":{"neverMarried":0.13064133016627077,"separated":0,"divorced":0.09738717339667459},"obesity":0.39,"ll":[38.955,-89.6897]},"62075":{"medHHIncome":65341,"eduShareBplus":0.15619136960600374,"eduShareGrad":0.055347091932457786,"eduShareAssoc":0.0975609756097561,"femIncome":{"zero":0.43249797898140663,"u75":0.5060630557801131,"b7599":0.04850444624090541,"p100":0.012934518997574777},"dist":{"p20":24531,"p40":52500,"p60":79569,"p80":106707,"p95":176667},"maleMedEarn":50147,"homeValue":86700,"grossRent":811,"ownerCostMortgage":976,"pop":3180,"women":{"a18_24":135,"a25_29":78,"a30_34":159,"a35_39":97,"a40_49":138,"a50_64":211},"race":{"total":3180,"white":2990,"black":6,"asian":119,"native":1,"pacific":0,"other":0,"multi":64,"hispanic":43},"marital":{"neverMarried":0.14820717131474104,"separated":0.02549800796812749,"divorced":0.13147410358565736},"obesity":0.381,"ll":[39.3021,-89.2958]},"62077":{"medHHIncome":60096,"eduShareBplus":0.07509881422924901,"eduShareGrad":0.015810276679841896,"eduShareAssoc":0.11462450592885376,"femIncome":{"zero":0.5821917808219178,"u75":0.410958904109589,"b7599":0.00684931506849315,"p100":0},"dist":{"p20":27333,"p40":52231,"p60":65700,"p80":81375,"p95":110688},"maleMedEarn":49722,"homeValue":60800,"grossRent":833,"ownerCostMortgage":815,"pop":327,"women":{"a18_24":7,"a25_29":20,"a30_34":5,"a35_39":6,"a40_49":12,"a50_64":50},"race":{"total":327,"white":324,"black":0,"asian":0,"native":0,"pacific":0,"other":1,"multi":2,"hispanic":1},"marital":{"neverMarried":0.1506849315068493,"separated":0.03424657534246575,"divorced":0.2054794520547945},"obesity":0.39,"ll":[39.0318,-89.5115]},"62079":{"medHHIncome":129205,"eduShareBplus":0.10454545454545454,"eduShareGrad":0.06818181818181818,"eduShareAssoc":0.19090909090909092,"femIncome":{"zero":0.1377245508982036,"u75":0.7964071856287425,"b7599":0.0658682634730539,"p100":0},"dist":{"p20":44850,"p40":128045,"p60":148500,"p80":250001,"p95":250001},"maleMedEarn":null,"homeValue":234100,"grossRent":null,"ownerCostMortgage":1625,"pop":370,"women":{"a18_24":41,"a25_29":0,"a30_34":0,"a35_39":11,"a40_49":49,"a50_64":66},"race":{"total":370,"white":337,"black":0,"asian":0,"native":0,"pacific":0,"other":33,"multi":0,"hispanic":43},"marital":{"neverMarried":0.2934131736526946,"separated":0,"divorced":0.16766467065868262},"obesity":0.39,"ll":[39.1084,-90.1318]},"62080":{"medHHIncome":58225,"eduShareBplus":0.15851775604734947,"eduShareGrad":0.023674729799279464,"eduShareAssoc":0.10190427174472465,"femIncome":{"zero":0.5890196078431372,"u75":0.38745098039215686,"b7599":0.0196078431372549,"p100":0.00392156862745098},"dist":{"p20":22487,"p40":50217,"p60":74125,"p80":114037,"p95":173289},"maleMedEarn":49000,"homeValue":85000,"grossRent":800,"ownerCostMortgage":1236,"pop":3056,"women":{"a18_24":274,"a25_29":81,"a30_34":78,"a35_39":106,"a40_49":122,"a50_64":300},"race":{"total":3056,"white":2734,"black":21,"asian":0,"native":5,"pacific":0,"other":0,"multi":296,"hispanic":150},"marital":{"neverMarried":0.3091190108191654,"separated":0.019319938176197836,"divorced":0.0687789799072643},"obesity":0.39799999999999996,"ll":[39.1419,-89.1031]},"62081":{"medHHIncome":60833,"eduShareBplus":0.1552511415525114,"eduShareGrad":0,"eduShareAssoc":0.2557077625570776,"femIncome":{"zero":0.44692737430167595,"u75":0.553072625698324,"b7599":0,"p100":0},"dist":{"p20":52540,"p40":54380,"p60":83500,"p80":104300,"p95":140700},"maleMedEarn":59792,"homeValue":86000,"grossRent":null,"ownerCostMortgage":1042,"pop":293,"women":{"a18_24":3,"a25_29":2,"a30_34":42,"a35_39":6,"a40_49":34,"a50_64":46},"race":{"total":293,"white":259,"black":12,"asian":0,"native":0,"pacific":0,"other":2,"multi":20,"hispanic":19},"marital":{"neverMarried":0.5675675675675675,"separated":0.10810810810810811,"divorced":0.12432432432432433},"obesity":0.402,"ll":[39.2649,-90.225]},"62084":{"medHHIncome":64375,"eduShareBplus":0.18775510204081633,"eduShareGrad":0.052244897959183675,"eduShareAssoc":0.12816326530612246,"femIncome":{"zero":0.40942562592047127,"u75":0.5375552282768777,"b7599":0.039764359351988215,"p100":0.013254786450662739},"dist":{"p20":32611,"p40":51946,"p60":81100,"p80":113300,"p95":169011},"maleMedEarn":48864,"homeValue":104300,"grossRent":949,"ownerCostMortgage":1084,"pop":1660,"women":{"a18_24":37,"a25_29":48,"a30_34":70,"a35_39":83,"a40_49":67,"a50_64":193},"race":{"total":1660,"white":1610,"black":27,"asian":2,"native":1,"pacific":0,"other":0,"multi":20,"hispanic":18},"marital":{"neverMarried":0.2947976878612717,"separated":0,"divorced":0.0968208092485549},"obesity":0.387,"ll":[38.8407,-90.0634]},"62085":{"medHHIncome":48571,"eduShareBplus":0.18543046357615894,"eduShareGrad":0.026490066225165563,"eduShareAssoc":0.006622516556291391,"femIncome":{"zero":0.4823529411764706,"u75":0.5058823529411764,"b7599":0,"p100":0.011764705882352941},"dist":{"p20":14571,"p40":43417,"p60":59833,"p80":120200,"p95":147000},"maleMedEarn":48036,"homeValue":82100,"grossRent":null,"ownerCostMortgage":813,"pop":195,"women":{"a18_24":6,"a25_29":0,"a30_34":9,"a35_39":9,"a40_49":9,"a50_64":24},"race":{"total":195,"white":191,"black":0,"asian":0,"native":2,"pacific":0,"other":1,"multi":1,"hispanic":2},"marital":{"neverMarried":0.17647058823529413,"separated":0,"divorced":0.2},"obesity":0.37,"ll":[39.0819,-89.8045]},"62086":{"medHHIncome":61705,"eduShareBplus":0.15608740894901144,"eduShareGrad":0.08740894901144641,"eduShareAssoc":0.04058272632674298,"femIncome":{"zero":0.3823038397328882,"u75":0.5125208681135225,"b7599":0.04006677796327212,"p100":0.0651085141903172},"dist":{"p20":35031,"p40":47000,"p60":82750,"p80":146714,"p95":219692},"maleMedEarn":55000,"homeValue":101800,"grossRent":617,"ownerCostMortgage":1449,"pop":1399,"women":{"a18_24":113,"a25_29":25,"a30_34":30,"a35_39":38,"a40_49":102,"a50_64":150},"race":{"total":1399,"white":1262,"black":2,"asian":1,"native":76,"pacific":0,"other":5,"multi":53,"hispanic":15},"marital":{"neverMarried":0.2973856209150327,"separated":0.027777777777777776,"divorced":0.08660130718954248},"obesity":0.39,"ll":[38.9899,-89.5896]},"62087":{"medHHIncome":56364,"eduShareBplus":0.055756698044895005,"eduShareGrad":0.025343953656770456,"eduShareAssoc":0.14699493120926865,"femIncome":{"zero":0.3927392739273927,"u75":0.5995599559955995,"b7599":0.0011001100110011,"p100":0.006600660066006601},"dist":{"p20":28032,"p40":42339,"p60":67000,"p80":96125,"p95":162750},"maleMedEarn":37639,"homeValue":87200,"grossRent":821,"ownerCostMortgage":973,"pop":2180,"women":{"a18_24":192,"a25_29":99,"a30_34":41,"a35_39":43,"a40_49":178,"a50_64":186},"race":{"total":2180,"white":1874,"black":90,"asian":4,"native":0,"pacific":0,"other":9,"multi":203,"hispanic":108},"marital":{"neverMarried":0.39868565169769987,"separated":0.009857612267250822,"divorced":0.1664841182913472},"obesity":0.387,"ll":[38.8148,-90.071]},"62088":{"medHHIncome":66066,"eduShareBplus":0.2055441478439425,"eduShareGrad":0.045379876796714576,"eduShareAssoc":0.08069815195071868,"femIncome":{"zero":0.4254428341384863,"u75":0.45893719806763283,"b7599":0.08599033816425121,"p100":0.02962962962962963},"dist":{"p20":28139,"p40":57844,"p60":78587,"p80":118268,"p95":195909},"maleMedEarn":51959,"homeValue":142800,"grossRent":803,"ownerCostMortgage":1234,"pop":6482,"women":{"a18_24":278,"a25_29":193,"a30_34":234,"a35_39":151,"a40_49":328,"a50_64":928},"race":{"total":6482,"white":6166,"black":20,"asian":113,"native":8,"pacific":0,"other":0,"multi":175,"hispanic":18},"marital":{"neverMarried":0.26965582570255764,"separated":0.0366277233975371,"divorced":0.19008525418377012},"obesity":0.37,"ll":[39.0147,-89.7985]},"62089":{"medHHIncome":46492,"eduShareBplus":0.08685968819599109,"eduShareGrad":0.028953229398663696,"eduShareAssoc":0.09799554565701558,"femIncome":{"zero":0.625531914893617,"u75":0.3659574468085106,"b7599":0.00851063829787234,"p100":0},"dist":{"p20":28333,"p40":32917,"p60":58750,"p80":96324,"p95":194063},"maleMedEarn":43750,"homeValue":69900,"grossRent":593,"ownerCostMortgage":1000,"pop":539,"women":{"a18_24":7,"a25_29":20,"a30_34":7,"a35_39":11,"a40_49":16,"a50_64":75},"race":{"total":539,"white":539,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":21},"marital":{"neverMarried":0.13191489361702127,"separated":0.00851063829787234,"divorced":0.1702127659574468},"obesity":0.391,"ll":[39.1178,-89.4867]},"62090":{"medHHIncome":38269,"eduShareBplus":0.10325318246110325,"eduShareGrad":0.01272984441301273,"eduShareAssoc":0.07779349363507779,"femIncome":{"zero":0.40555555555555556,"u75":0.5444444444444444,"b7599":0.03888888888888889,"p100":0.011111111111111112},"dist":{"p20":13342,"p40":34000,"p60":61722,"p80":82125,"p95":149047},"maleMedEarn":52625,"homeValue":49600,"grossRent":784,"ownerCostMortgage":1083,"pop":1015,"women":{"a18_24":98,"a25_29":57,"a30_34":39,"a35_39":9,"a40_49":65,"a50_64":142},"race":{"total":1015,"white":72,"black":822,"asian":0,"native":0,"pacific":4,"other":0,"multi":117,"hispanic":27},"marital":{"neverMarried":0.524074074074074,"separated":0.06111111111111111,"divorced":0.1425925925925926},"obesity":0.387,"ll":[38.6671,-90.1665]},"62091":{"medHHIncome":103063,"eduShareBplus":0.0759493670886076,"eduShareGrad":0.004219409282700422,"eduShareAssoc":0.16455696202531644,"femIncome":{"zero":0.42857142857142855,"u75":0.5714285714285714,"b7599":0,"p100":0},"dist":{"p20":29417,"p40":98300,"p60":104475,"p80":112091,"p95":193375},"maleMedEarn":68750,"homeValue":152000,"grossRent":null,"ownerCostMortgage":null,"pop":296,"women":{"a18_24":0,"a25_29":0,"a30_34":0,"a35_39":30,"a40_49":2,"a50_64":75},"race":{"total":296,"white":296,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.14285714285714285,"separated":0.008403361344537815,"divorced":0.01680672268907563},"obesity":0.391,"ll":[39.0562,-89.6106]},"62093":{"medHHIncome":48942,"eduShareBplus":0.06406685236768803,"eduShareGrad":0.013927576601671309,"eduShareAssoc":0.0584958217270195,"femIncome":{"zero":0.38461538461538464,"u75":0.5833333333333334,"b7599":0.03205128205128205,"p100":0},"dist":{"p20":21091,"p40":43250,"p60":64000,"p80":112796,"p95":135854},"maleMedEarn":38806,"homeValue":90000,"grossRent":883,"ownerCostMortgage":942,"pop":473,"women":{"a18_24":17,"a25_29":7,"a30_34":3,"a35_39":29,"a40_49":3,"a50_64":54},"race":{"total":473,"white":469,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":4,"hispanic":0},"marital":{"neverMarried":0.33974358974358976,"separated":0,"divorced":0.11538461538461539},"obesity":0.37,"ll":[39.0647,-89.842]},"62094":{"medHHIncome":60083,"eduShareBplus":0.20857988165680474,"eduShareGrad":0.03698224852071006,"eduShareAssoc":0.12130177514792899,"femIncome":{"zero":0.4770408163265306,"u75":0.4923469387755102,"b7599":0.00510204081632653,"p100":0.025510204081632654},"dist":{"p20":28214,"p40":42174,"p60":75132,"p80":109000,"p95":214167},"maleMedEarn":44018,"homeValue":62900,"grossRent":529,"ownerCostMortgage":942,"pop":1018,"women":{"a18_24":30,"a25_29":20,"a30_34":19,"a35_39":49,"a40_49":62,"a50_64":104},"race":{"total":1018,"white":971,"black":26,"asian":0,"native":0,"pacific":0,"other":8,"multi":13,"hispanic":14},"marital":{"neverMarried":0.21804511278195488,"separated":0.015037593984962405,"divorced":0.14786967418546365},"obesity":0.391,"ll":[39.2386,-89.3498]},"62095":{"medHHIncome":66641,"eduShareBplus":0.16359973136333109,"eduShareGrad":0.06151779717931498,"eduShareAssoc":0.11524513096037609,"femIncome":{"zero":0.33939107859334433,"u75":0.5555817795610102,"b7599":0.07458107151286288,"p100":0.03044607033278263},"dist":{"p20":29291,"p40":55619,"p60":83108,"p80":124176,"p95":176444},"maleMedEarn":44888,"homeValue":106700,"grossRent":919,"ownerCostMortgage":1150,"pop":10780,"women":{"a18_24":522,"a25_29":340,"a30_34":419,"a35_39":404,"a40_49":519,"a50_64":1039},"race":{"total":10780,"white":9418,"black":676,"asian":2,"native":11,"pacific":0,"other":39,"multi":634,"hispanic":353},"marital":{"neverMarried":0.31474654377880185,"separated":0.02142857142857143,"divorced":0.15552995391705068},"obesity":0.387,"ll":[38.8626,-90.0743]},"62097":{"medHHIncome":85234,"eduShareBplus":0.1977261492832427,"eduShareGrad":0.07513593672763223,"eduShareAssoc":0.13741967375185368,"femIncome":{"zero":0.3527239150507849,"u75":0.5530932594644506,"b7599":0.07386888273314866,"p100":0.020313942751615882},"dist":{"p20":39736,"p40":63840,"p60":101625,"p80":144795,"p95":204571},"maleMedEarn":37569,"homeValue":212600,"grossRent":null,"ownerCostMortgage":1493,"pop":2627,"women":{"a18_24":22,"a25_29":105,"a30_34":41,"a35_39":137,"a40_49":149,"a50_64":311},"race":{"total":2627,"white":2540,"black":10,"asian":63,"native":0,"pacific":0,"other":0,"multi":14,"hispanic":0},"marital":{"neverMarried":0.29898804047838085,"separated":0,"divorced":0.08003679852805888},"obesity":0.387,"ll":[38.9367,-89.8527]},"62098":{"medHHIncome":48333,"eduShareBplus":0,"eduShareGrad":0,"eduShareAssoc":0.10526315789473684,"femIncome":{"zero":0.8260869565217391,"u75":0.17391304347826086,"b7599":0,"p100":0},"dist":{"p20":36167,"p40":37333,"p60":49500,"p80":53600,"p95":54650},"maleMedEarn":null,"homeValue":null,"grossRent":null,"ownerCostMortgage":null,"pop":38,"women":{"a18_24":0,"a25_29":0,"a30_34":0,"a35_39":0,"a40_49":12,"a50_64":3},"race":{"total":38,"white":38,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.5217391304347826,"separated":0,"divorced":0},"obesity":0.402,"ll":[39.3838,-90.2994]},"62201":{"medHHIncome":21658,"eduShareBplus":0.10678466076696165,"eduShareGrad":0.027138643067846607,"eduShareAssoc":0.05693215339233038,"femIncome":{"zero":0.5079006772009029,"u75":0.4687735139202408,"b7599":0.005267118133935289,"p100":0.01805869074492099},"dist":{"p20":10796,"p40":16089,"p60":32071,"p80":70047,"p95":122858},"maleMedEarn":43337,"homeValue":56100,"grossRent":350,"ownerCostMortgage":1085,"pop":5017,"women":{"a18_24":551,"a25_29":173,"a30_34":118,"a35_39":84,"a40_49":601,"a50_64":557},"race":{"total":5017,"white":831,"black":2618,"asian":29,"native":202,"pacific":0,"other":914,"multi":423,"hispanic":1657},"marital":{"neverMarried":0.47395640930919836,"separated":0.023642408570373107,"divorced":0.189878093830809},"obesity":0.387,"ll":[38.6351,-90.1407]},"62203":{"medHHIncome":41134,"eduShareBplus":0.1639417693169093,"eduShareGrad":0.06987681970884659,"eduShareAssoc":0.05106382978723404,"femIncome":{"zero":0.4884233737596472,"u75":0.5034913634693128,"b7599":0.003675119441381845,"p100":0.004410143329658214},"dist":{"p20":18014,"p40":30395,"p60":51544,"p80":90733,"p95":147002},"maleMedEarn":30493,"homeValue":72700,"grossRent":970,"ownerCostMortgage":1047,"pop":5539,"women":{"a18_24":272,"a25_29":198,"a30_34":84,"a35_39":159,"a40_49":413,"a50_64":584},"race":{"total":5539,"white":225,"black":5166,"asian":36,"native":8,"pacific":0,"other":0,"multi":104,"hispanic":1},"marital":{"neverMarried":0.41381844909959575,"separated":0.02719588386622565,"divorced":0.17089305402425578},"obesity":0.38799999999999996,"ll":[38.6017,-90.076]},"62204":{"medHHIncome":36789,"eduShareBplus":0.07926023778071334,"eduShareGrad":0.06869220607661823,"eduShareAssoc":0.07397622192866579,"femIncome":{"zero":0.5093795093795094,"u75":0.48148148148148145,"b7599":0.00913900913900914,"p100":0},"dist":{"p20":16455,"p40":24963,"p60":44723,"p80":64495,"p95":92273},"maleMedEarn":34594,"homeValue":48200,"grossRent":783,"ownerCostMortgage":1103,"pop":4824,"women":{"a18_24":167,"a25_29":65,"a30_34":243,"a35_39":83,"a40_49":140,"a50_64":755},"race":{"total":4824,"white":138,"black":4197,"asian":52,"native":14,"pacific":0,"other":160,"multi":263,"hispanic":420},"marital":{"neverMarried":0.4990909090909091,"separated":0.14181818181818182,"divorced":0.12318181818181818},"obesity":0.38799999999999996,"ll":[38.6295,-90.0959]},"62205":{"medHHIncome":41059,"eduShareBplus":0.19076492537313433,"eduShareGrad":0.06809701492537314,"eduShareAssoc":0.05387126865671642,"femIncome":{"zero":0.5914319714399048,"u75":0.38000793335977784,"b7599":0.02380007933359778,"p100":0.004760015866719556},"dist":{"p20":14387,"p40":32000,"p60":54422,"p80":80114,"p95":136550},"maleMedEarn":34750,"homeValue":46200,"grossRent":1015,"ownerCostMortgage":1119,"pop":5760,"women":{"a18_24":347,"a25_29":108,"a30_34":49,"a35_39":151,"a40_49":191,"a50_64":689},"race":{"total":5760,"white":60,"black":5558,"asian":113,"native":0,"pacific":0,"other":0,"multi":29,"hispanic":0},"marital":{"neverMarried":0.45656485521618406,"separated":0.014676715589051963,"divorced":0.2030940103133677},"obesity":0.38799999999999996,"ll":[38.6028,-90.1186]},"62206":{"medHHIncome":39520,"eduShareBplus":0.11552982632771205,"eduShareGrad":0.04341807198590486,"eduShareAssoc":0.07878177699471432,"femIncome":{"zero":0.338452451269935,"u75":0.6463870840716677,"b7599":0.008072455207718056,"p100":0.0070880094506792675},"dist":{"p20":20290,"p40":29879,"p60":47916,"p80":87933,"p95":144852},"maleMedEarn":31400,"homeValue":57700,"grossRent":1021,"ownerCostMortgage":1108,"pop":13155,"women":{"a18_24":592,"a25_29":340,"a30_34":743,"a35_39":314,"a40_49":728,"a50_64":1205},"race":{"total":13155,"white":3929,"black":7850,"asian":259,"native":89,"pacific":0,"other":273,"multi":755,"hispanic":356},"marital":{"neverMarried":0.5191088918763204,"separated":0.04359516036105243,"divorced":0.124639907816401},"obesity":0.38799999999999996,"ll":[38.5679,-90.1693]},"62207":{"medHHIncome":29184,"eduShareBplus":0.1311398354876616,"eduShareGrad":0.06439482961222091,"eduShareAssoc":0.09283196239717979,"femIncome":{"zero":0.4287964713295526,"u75":0.5365469439193447,"b7599":0.02488972904851922,"p100":0.009766855702583491},"dist":{"p20":15217,"p40":24594,"p60":34805,"p80":57423,"p95":117168},"maleMedEarn":31033,"homeValue":54400,"grossRent":803,"ownerCostMortgage":879,"pop":6801,"women":{"a18_24":256,"a25_29":176,"a30_34":511,"a35_39":189,"a40_49":521,"a50_64":587},"race":{"total":6801,"white":91,"black":6599,"asian":19,"native":4,"pacific":8,"other":48,"multi":32,"hispanic":0},"marital":{"neverMarried":0.5986137366099559,"separated":0.011027095148078135,"divorced":0.16194076874606175},"obesity":0.38799999999999996,"ll":[38.5829,-90.1254]},"62208":{"medHHIncome":78423,"eduShareBplus":0.30781620888436756,"eduShareGrad":0.14123431671753137,"eduShareAssoc":0.14767717870464564,"femIncome":{"zero":0.3620450125034732,"u75":0.5222283967768825,"b7599":0.04973603778827452,"p100":0.06599055293136982},"dist":{"p20":35967,"p40":65886,"p60":89805,"p80":131041,"p95":232908},"maleMedEarn":50976,"homeValue":167900,"grossRent":1222,"ownerCostMortgage":1476,"pop":16653,"women":{"a18_24":576,"a25_29":673,"a30_34":449,"a35_39":552,"a40_49":1089,"a50_64":1920},"race":{"total":16653,"white":8551,"black":5564,"asian":435,"native":0,"pacific":9,"other":205,"multi":1889,"hispanic":420},"marital":{"neverMarried":0.360850358917725,"separated":0.023881833241303146,"divorced":0.12976256212037549},"obesity":0.38799999999999996,"ll":[38.5953,-90.0047]},"62214":{"medHHIncome":102222,"eduShareBplus":0.2396088019559902,"eduShareGrad":0.06845965770171149,"eduShareAssoc":0.14547677261613692,"femIncome":{"zero":0.2102803738317757,"u75":0.6121495327102804,"b7599":0.13317757009345793,"p100":0.04439252336448598},"dist":{"p20":49423,"p40":93409,"p60":132708,"p80":146563,"p95":207500},"maleMedEarn":48100,"homeValue":175300,"grossRent":663,"ownerCostMortgage":1233,"pop":1097,"women":{"a18_24":16,"a25_29":45,"a30_34":50,"a35_39":41,"a40_49":56,"a50_64":141},"race":{"total":1097,"white":1055,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":42,"hispanic":45},"marital":{"neverMarried":0.11187214611872145,"separated":0.0045662100456621,"divorced":0.06164383561643835},"obesity":0.368,"ll":[38.3764,-89.6037]},"62215":{"medHHIncome":115776,"eduShareBplus":0.28353022932592076,"eduShareGrad":0.08547602501737317,"eduShareAssoc":0.17790132036136205,"femIncome":{"zero":0.3246311010215664,"u75":0.4869466515323496,"b7599":0.10896708286038592,"p100":0.07945516458569807},"dist":{"p20":55538,"p40":96200,"p60":120545,"p80":181100,"p95":239417},"maleMedEarn":61346,"homeValue":205000,"grossRent":1097,"ownerCostMortgage":1691,"pop":2109,"women":{"a18_24":77,"a25_29":48,"a30_34":43,"a35_39":53,"a40_49":153,"a50_64":230},"race":{"total":2109,"white":2003,"black":0,"asian":14,"native":2,"pacific":0,"other":17,"multi":73,"hispanic":56},"marital":{"neverMarried":0.26763717805151177,"separated":0.0011198208286674132,"divorced":0.07950727883538634},"obesity":0.402,"ll":[38.5078,-89.6008]},"62216":{"medHHIncome":110938,"eduShareBplus":0.33949076385421867,"eduShareGrad":0.09236145781328008,"eduShareAssoc":0.18072890664003993,"femIncome":{"zero":0.3376399655469423,"u75":0.5202411714039621,"b7599":0.07579672695951765,"p100":0.06632213608957795},"dist":{"p20":57196,"p40":91300,"p60":124295,"p80":184333,"p95":250001},"maleMedEarn":68548,"homeValue":235200,"grossRent":958,"ownerCostMortgage":1670,"pop":3101,"women":{"a18_24":75,"a25_29":102,"a30_34":123,"a35_39":118,"a40_49":163,"a50_64":273},"race":{"total":3101,"white":2905,"black":5,"asian":6,"native":0,"pacific":0,"other":88,"multi":97,"hispanic":309},"marital":{"neverMarried":0.2045075125208681,"separated":0,"divorced":0.06093489148580968},"obesity":0.402,"ll":[38.6325,-89.6024]},"62217":{"medHHIncome":69583,"eduShareBplus":0.08118811881188119,"eduShareGrad":0.013861386138613862,"eduShareAssoc":0.08712871287128712,"femIncome":{"zero":0.49236641221374045,"u75":0.49236641221374045,"b7599":0.015267175572519083,"p100":0},"dist":{"p20":39850,"p40":48231,"p60":84800,"p80":98778,"p95":167250},"maleMedEarn":46250,"homeValue":137500,"grossRent":null,"ownerCostMortgage":1288,"pop":710,"women":{"a18_24":5,"a25_29":16,"a30_34":9,"a35_39":32,"a40_49":31,"a50_64":76},"race":{"total":710,"white":710,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":5},"marital":{"neverMarried":0.20921985815602837,"separated":0.03900709219858156,"divorced":0.1524822695035461},"obesity":0.38799999999999996,"ll":[38.1738,-89.8386]},"62218":{"medHHIncome":93636,"eduShareBplus":0.29249291784702547,"eduShareGrad":0.10835694050991501,"eduShareAssoc":0.18909348441926346,"femIncome":{"zero":0.3107769423558897,"u75":0.5451127819548872,"b7599":0.021303258145363407,"p100":0.12280701754385964},"dist":{"p20":47500,"p40":78750,"p60":104500,"p80":173000,"p95":250001},"maleMedEarn":52804,"homeValue":197300,"grossRent":545,"ownerCostMortgage":1695,"pop":1997,"women":{"a18_24":29,"a25_29":30,"a30_34":45,"a35_39":87,"a40_49":175,"a50_64":209},"race":{"total":1997,"white":1963,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":34,"hispanic":33},"marital":{"neverMarried":0.12907268170426064,"separated":0.017543859649122806,"divorced":0.017543859649122806},"obesity":0.402,"ll":[38.5222,-89.474]},"62219":{"medHHIncome":63846,"eduShareBplus":0.1088348271446863,"eduShareGrad":0.03201024327784891,"eduShareAssoc":0.10499359795134443,"femIncome":{"zero":0.3643835616438356,"u75":0.5561643835616439,"b7599":0.043835616438356165,"p100":0.03561643835616438},"dist":{"p20":19942,"p40":54944,"p60":74182,"p80":111543,"p95":163500},"maleMedEarn":51131,"homeValue":111100,"grossRent":942,"ownerCostMortgage":1250,"pop":1028,"women":{"a18_24":18,"a25_29":19,"a30_34":12,"a35_39":36,"a40_49":73,"a50_64":128},"race":{"total":1028,"white":808,"black":0,"asian":5,"native":0,"pacific":0,"other":47,"multi":168,"hispanic":201},"marital":{"neverMarried":0.18206521739130435,"separated":0,"divorced":0.10054347826086957},"obesity":0.402,"ll":[38.6036,-89.4372]},"62220":{"medHHIncome":65261,"eduShareBplus":0.28227043611659,"eduShareGrad":0.12148440353568558,"eduShareAssoc":0.1024179998538973,"femIncome":{"zero":0.35902255639097747,"u75":0.5586466165413534,"b7599":0.04473684210526316,"p100":0.03759398496240601},"dist":{"p20":25447,"p40":51343,"p60":77787,"p80":124507,"p95":222744},"maleMedEarn":41035,"homeValue":141300,"grossRent":976,"ownerCostMortgage":1403,"pop":19391,"women":{"a18_24":496,"a25_29":638,"a30_34":609,"a35_39":878,"a40_49":1157,"a50_64":2142},"race":{"total":19391,"white":13359,"black":4353,"asian":203,"native":14,"pacific":34,"other":202,"multi":1226,"hispanic":651},"marital":{"neverMarried":0.3458171206225681,"separated":0.013497081712062257,"divorced":0.1269455252918288},"obesity":0.38799999999999996,"ll":[38.4783,-89.998]},"62221":{"medHHIncome":78619,"eduShareBplus":0.365770423991727,"eduShareGrad":0.16396070320579112,"eduShareAssoc":0.11215098241985522,"femIncome":{"zero":0.32976827094474154,"u75":0.5502349700210662,"b7599":0.06319883325230918,"p100":0.056797925781883},"dist":{"p20":37227,"p40":67140,"p60":104012,"p80":155278,"p95":219049},"maleMedEarn":52837,"homeValue":207200,"grossRent":1078,"ownerCostMortgage":1677,"pop":29281,"women":{"a18_24":1156,"a25_29":873,"a30_34":1154,"a35_39":1091,"a40_49":2002,"a50_64":3036},"race":{"total":29281,"white":16777,"black":9214,"asian":587,"native":127,"pacific":12,"other":687,"multi":1877,"hispanic":943},"marital":{"neverMarried":0.2926324173636002,"separated":0.028833134209478296,"divorced":0.1599362803663879},"obesity":0.38799999999999996,"ll":[38.5117,-89.9024]},"62223":{"medHHIncome":69620,"eduShareBplus":0.3324727242441909,"eduShareGrad":0.14349962521862247,"eduShareAssoc":0.11276755226118097,"femIncome":{"zero":0.3911973360359056,"u75":0.5165773852613291,"b7599":0.03966990010134646,"p100":0.05255537860141885},"dist":{"p20":26268,"p40":54209,"p60":88410,"p80":133300,"p95":243490},"maleMedEarn":48786,"homeValue":149600,"grossRent":1026,"ownerCostMortgage":1477,"pop":16269,"women":{"a18_24":660,"a25_29":502,"a30_34":351,"a35_39":673,"a40_49":944,"a50_64":1831},"race":{"total":16269,"white":10255,"black":4317,"asian":87,"native":0,"pacific":0,"other":144,"multi":1466,"hispanic":730},"marital":{"neverMarried":0.34120324278196557,"separated":0.02247191011235955,"divorced":0.09187882235812829},"obesity":0.38799999999999996,"ll":[38.5359,-90.0595]},"62225":{"medHHIncome":91988,"eduShareBplus":0.39644351464435146,"eduShareGrad":0.18619246861924685,"eduShareAssoc":0.16527196652719664,"femIncome":{"zero":0.2772913018096906,"u75":0.645067133683596,"b7599":0.018680677174547577,"p100":0.05896088733216579},"dist":{"p20":59716,"p40":85459,"p60":112029,"p80":163869,"p95":206536},"maleMedEarn":59813,"homeValue":null,"grossRent":1669,"ownerCostMortgage":null,"pop":5606,"women":{"a18_24":239,"a25_29":251,"a30_34":359,"a35_39":230,"a40_49":338,"a50_64":168},"race":{"total":5606,"white":3661,"black":1065,"asian":101,"native":27,"pacific":0,"other":158,"multi":594,"hispanic":616},"marital":{"neverMarried":0.2958612975391499,"separated":0,"divorced":0.049217002237136466},"obesity":0.38799999999999996,"ll":[38.543,-89.8521]},"62226":{"medHHIncome":66018,"eduShareBplus":0.3310687736917245,"eduShareGrad":0.1363658740707921,"eduShareAssoc":0.09545611184955448,"femIncome":{"zero":0.3548249723192232,"u75":0.5337705476535218,"b7599":0.05493569542628396,"p100":0.056468784600970955},"dist":{"p20":29193,"p40":51490,"p60":82823,"p80":141051,"p95":229563},"maleMedEarn":46228,"homeValue":162500,"grossRent":946,"ownerCostMortgage":1634,"pop":28543,"women":{"a18_24":1035,"a25_29":1066,"a30_34":996,"a35_39":754,"a40_49":1792,"a50_64":3228},"race":{"total":28543,"white":18498,"black":6979,"asian":644,"native":52,"pacific":19,"other":361,"multi":1990,"hispanic":755},"marital":{"neverMarried":0.3133796845853824,"separated":0.019755808037985417,"divorced":0.13566220111921315},"obesity":0.38799999999999996,"ll":[38.5368,-90.0003]},"62230":{"medHHIncome":81824,"eduShareBplus":0.2874529763221952,"eduShareGrad":0.08696614295198053,"eduShareAssoc":0.20690418234122593,"femIncome":{"zero":0.33855559801299195,"u75":0.515475735575086,"b7599":0.0569354222392052,"p100":0.08903324417271685},"dist":{"p20":38029,"p40":65248,"p60":106171,"p80":159950,"p95":250001},"maleMedEarn":61845,"homeValue":209100,"grossRent":776,"ownerCostMortgage":1541,"pop":6406,"women":{"a18_24":248,"a25_29":177,"a30_34":286,"a35_39":158,"a40_49":365,"a50_64":632},"race":{"total":6406,"white":6124,"black":11,"asian":37,"native":32,"pacific":0,"other":144,"multi":58,"hispanic":231},"marital":{"neverMarried":0.15361331819901627,"separated":0.00681044267877412,"divorced":0.11804767309875142},"obesity":0.402,"ll":[38.635,-89.531]},"62231":{"medHHIncome":80660,"eduShareBplus":0.24930212583208075,"eduShareGrad":0.07408202705604466,"eduShareAssoc":0.1859566244363324,"femIncome":{"zero":0.2770909090909091,"u75":0.6105454545454545,"b7599":0.04,"p100":0.07236363636363637},"dist":{"p20":38322,"p40":61411,"p60":95017,"p80":137578,"p95":208257},"maleMedEarn":49971,"homeValue":158400,"grossRent":1043,"ownerCostMortgage":1345,"pop":6521,"women":{"a18_24":255,"a25_29":248,"a30_34":189,"a35_39":254,"a40_49":456,"a50_64":595},"race":{"total":6521,"white":6161,"black":89,"asian":0,"native":2,"pacific":0,"other":0,"multi":269,"hispanic":67},"marital":{"neverMarried":0.22327272727272726,"separated":0.002909090909090909,"divorced":0.09418181818181819},"obesity":0.402,"ll":[38.6531,-89.3269]},"62232":{"medHHIncome":64268,"eduShareBplus":0.21785523741774854,"eduShareGrad":0.0937222123421661,"eduShareAssoc":0.07967277254134804,"femIncome":{"zero":0.34845496383957925,"u75":0.5910585141354372,"b7599":0.018080210387902695,"p100":0.04240631163708087},"dist":{"p20":38158,"p40":58803,"p60":90533,"p80":190590,"p95":250001},"maleMedEarn":50158,"homeValue":114800,"grossRent":1077,"ownerCostMortgage":1261,"pop":7480,"women":{"a18_24":349,"a25_29":211,"a30_34":174,"a35_39":229,"a40_49":509,"a50_64":871},"race":{"total":7480,"white":5769,"black":689,"asian":0,"native":0,"pacific":0,"other":355,"multi":667,"hispanic":1322},"marital":{"neverMarried":0.2535027696318019,"separated":0,"divorced":0.12218963831867058},"obesity":0.38799999999999996,"ll":[38.6324,-90.0054]},"62233":{"medHHIncome":78333,"eduShareBplus":0.08595234614822395,"eduShareGrad":0.01812600497003362,"eduShareAssoc":0.048530916532670665,"femIncome":{"zero":0.4374731413837559,"u75":0.47571981091534166,"b7599":0.047271164589600345,"p100":0.03953588311130211},"dist":{"p20":26636,"p40":62217,"p60":100135,"p80":130207,"p95":171441},"maleMedEarn":61685,"homeValue":111500,"grossRent":645,"ownerCostMortgage":1139,"pop":8233,"women":{"a18_24":108,"a25_29":237,"a30_34":210,"a35_39":81,"a40_49":231,"a50_64":697},"race":{"total":8233,"white":6248,"black":1756,"asian":0,"native":24,"pacific":0,"other":69,"multi":136,"hispanic":382},"marital":{"neverMarried":0.19983136593591905,"separated":0.03372681281618887,"divorced":0.13659359190556492},"obesity":0.38799999999999996,"ll":[37.9423,-89.7886]},"62234":{"medHHIncome":66437,"eduShareBplus":0.2734723968949217,"eduShareGrad":0.09449672579036385,"eduShareAssoc":0.11249403703543086,"femIncome":{"zero":0.38268709228175624,"u75":0.548706296269149,"b7599":0.041926262552224584,"p100":0.02668034889687019},"dist":{"p20":30411,"p40":54989,"p60":79505,"p80":123476,"p95":218194},"maleMedEarn":49314,"homeValue":162000,"grossRent":995,"ownerCostMortgage":1452,"pop":31832,"women":{"a18_24":1242,"a25_29":1259,"a30_34":1039,"a35_39":1107,"a40_49":2224,"a50_64":3203},"race":{"total":31832,"white":24223,"black":4014,"asian":315,"native":143,"pacific":22,"other":674,"multi":2441,"hispanic":3095},"marital":{"neverMarried":0.2821828695337911,"separated":0.017419588001445607,"divorced":0.14007950849295267},"obesity":0.387,"ll":[38.6822,-89.9806]},"62236":{"medHHIncome":112070,"eduShareBplus":0.4808446455505279,"eduShareGrad":0.19356460532931122,"eduShareAssoc":0.09844142785319256,"femIncome":{"zero":0.2698610616316352,"u75":0.47684360527253294,"b7599":0.10224438902743142,"p100":0.15105094406840042},"dist":{"p20":50914,"p40":92034,"p60":132068,"p80":204795,"p95":250001},"maleMedEarn":72519,"homeValue":300300,"grossRent":1089,"ownerCostMortgage":2079,"pop":14175,"women":{"a18_24":320,"a25_29":422,"a30_34":490,"a35_39":585,"a40_49":1069,"a50_64":1357},"race":{"total":14175,"white":13464,"black":103,"asian":33,"native":2,"pacific":0,"other":223,"multi":350,"hispanic":344},"marital":{"neverMarried":0.2156656129258869,"separated":0.007024938531787847,"divorced":0.09079733052335792},"obesity":0.355,"ll":[38.4339,-90.2119]},"62237":{"medHHIncome":59087,"eduShareBplus":0.1691542288557214,"eduShareGrad":0.06025428413488115,"eduShareAssoc":0.10281923714759536,"femIncome":{"zero":0.4682203389830508,"u75":0.4915254237288136,"b7599":0.020127118644067795,"p100":0.020127118644067795},"dist":{"p20":21833,"p40":44207,"p60":73492,"p80":111633,"p95":185453},"maleMedEarn":52596,"homeValue":132600,"grossRent":870,"ownerCostMortgage":1423,"pop":2322,"women":{"a18_24":26,"a25_29":36,"a30_34":62,"a35_39":62,"a40_49":96,"a50_64":305},"race":{"total":2322,"white":2262,"black":10,"asian":15,"native":4,"pacific":0,"other":3,"multi":28,"hispanic":18},"marital":{"neverMarried":0.20904522613065327,"separated":0.018090452261306532,"divorced":0.11658291457286432},"obesity":0.40700000000000003,"ll":[38.1978,-89.5693]},"62238":{"medHHIncome":72188,"eduShareBplus":0.10875331564986737,"eduShareGrad":0.01856763925729443,"eduShareAssoc":0.129973474801061,"femIncome":{"zero":0.3771186440677966,"u75":0.614406779661017,"b7599":0.00847457627118644,"p100":0},"dist":{"p20":27263,"p40":61929,"p60":74950,"p80":121125,"p95":202925},"maleMedEarn":30972,"homeValue":88200,"grossRent":1042,"ownerCostMortgage":1211,"pop":618,"women":{"a18_24":32,"a25_29":37,"a30_34":9,"a35_39":15,"a40_49":41,"a50_64":60},"race":{"total":618,"white":573,"black":5,"asian":0,"native":0,"pacific":0,"other":35,"multi":5,"hispanic":62},"marital":{"neverMarried":0.2288135593220339,"separated":0.012711864406779662,"divorced":0.11864406779661017},"obesity":0.40700000000000003,"ll":[38.0526,-89.5438]},"62239":{"medHHIncome":57793,"eduShareBplus":0.18190693133745525,"eduShareGrad":0.04002603319232021,"eduShareAssoc":0.07809957696062479,"femIncome":{"zero":0.26096491228070173,"u75":0.6672149122807017,"b7599":0.05043859649122807,"p100":0.02138157894736842},"dist":{"p20":31270,"p40":49892,"p60":72549,"p80":101590,"p95":187137},"maleMedEarn":37473,"homeValue":111700,"grossRent":935,"ownerCostMortgage":1322,"pop":4381,"women":{"a18_24":273,"a25_29":225,"a30_34":128,"a35_39":104,"a40_49":265,"a50_64":551},"race":{"total":4381,"white":3867,"black":260,"asian":0,"native":0,"pacific":0,"other":0,"multi":254,"hispanic":57},"marital":{"neverMarried":0.34649122807017546,"separated":0,"divorced":0.1513157894736842},"obesity":0.38799999999999996,"ll":[38.5246,-90.1567]},"62240":{"medHHIncome":70298,"eduShareBplus":0.08050436469447139,"eduShareGrad":0.0009699321047526673,"eduShareAssoc":0.06983511154219205,"femIncome":{"zero":0.4377745241581259,"u75":0.5373352855051244,"b7599":0.01903367496339678,"p100":0.005856515373352855},"dist":{"p20":36109,"p40":44071,"p60":87000,"p80":111478,"p95":184099},"maleMedEarn":67697,"homeValue":84800,"grossRent":835,"ownerCostMortgage":1052,"pop":1994,"women":{"a18_24":28,"a25_29":50,"a30_34":169,"a35_39":13,"a40_49":81,"a50_64":171},"race":{"total":1994,"white":1928,"black":45,"asian":0,"native":0,"pacific":0,"other":0,"multi":21,"hispanic":13},"marital":{"neverMarried":0.30662983425414364,"separated":0,"divorced":0.08011049723756906},"obesity":0.38799999999999996,"ll":[38.5019,-90.1766]},"62241":{"medHHIncome":81429,"eduShareBplus":0.11812297734627832,"eduShareGrad":0.021035598705501618,"eduShareAssoc":0.042071197411003236,"femIncome":{"zero":0.45454545454545453,"u75":0.5190615835777126,"b7599":0,"p100":0.026392961876832845},"dist":{"p20":36685,"p40":67200,"p60":99417,"p80":134950,"p95":147328},"maleMedEarn":56023,"homeValue":135800,"grossRent":725,"ownerCostMortgage":1143,"pop":891,"women":{"a18_24":22,"a25_29":9,"a30_34":49,"a35_39":37,"a40_49":17,"a50_64":66},"race":{"total":891,"white":874,"black":0,"asian":0,"native":0,"pacific":0,"other":4,"multi":13,"hispanic":0},"marital":{"neverMarried":0.16761363636363635,"separated":0.005681818181818182,"divorced":0.07102272727272728},"obesity":0.38799999999999996,"ll":[38.0112,-89.8939]},"62242":{"medHHIncome":60313,"eduShareBplus":0.19491525423728814,"eduShareGrad":0.009322033898305085,"eduShareAssoc":0.1423728813559322,"femIncome":{"zero":0.2714285714285714,"u75":0.7015873015873015,"b7599":0.026984126984126985,"p100":0},"dist":{"p20":28673,"p40":46375,"p60":80704,"p80":118086,"p95":167070},"maleMedEarn":37125,"homeValue":110700,"grossRent":741,"ownerCostMortgage":1125,"pop":1764,"women":{"a18_24":45,"a25_29":23,"a30_34":9,"a35_39":93,"a40_49":175,"a50_64":153},"race":{"total":1764,"white":1747,"black":13,"asian":0,"native":0,"pacific":0,"other":0,"multi":4,"hispanic":15},"marital":{"neverMarried":0.11811023622047244,"separated":0.02047244094488189,"divorced":0.16062992125984252},"obesity":0.38799999999999996,"ll":[38.0989,-89.9377]},"62243":{"medHHIncome":93328,"eduShareBplus":0.33573195412637735,"eduShareGrad":0.14976388576568472,"eduShareAssoc":0.13154935911850685,"femIncome":{"zero":0.3745743473325766,"u75":0.47105561861521,"b7599":0.07907680665909951,"p100":0.07529322739311388},"dist":{"p20":40395,"p40":72733,"p60":117033,"p80":180567,"p95":248496},"maleMedEarn":59688,"homeValue":268200,"grossRent":1100,"ownerCostMortgage":1916,"pop":6522,"women":{"a18_24":206,"a25_29":87,"a30_34":162,"a35_39":295,"a40_49":631,"a50_64":610},"race":{"total":6522,"white":5957,"black":36,"asian":85,"native":0,"pacific":0,"other":0,"multi":444,"hispanic":49},"marital":{"neverMarried":0.24126637554585154,"separated":0.04002911208151383,"divorced":0.12117903930131005},"obesity":0.38799999999999996,"ll":[38.4191,-89.8894]},"62244":{"medHHIncome":115183,"eduShareBplus":0.181360201511335,"eduShareGrad":0.08564231738035265,"eduShareAssoc":0.06675062972292191,"femIncome":{"zero":0.21030042918454936,"u75":0.7145922746781116,"b7599":0.030042918454935622,"p100":0.045064377682403435},"dist":{"p20":58173,"p40":86818,"p60":130543,"p80":142756,"p95":214375},"maleMedEarn":60933,"homeValue":207000,"grossRent":1049,"ownerCostMortgage":1699,"pop":1155,"women":{"a18_24":82,"a25_29":18,"a30_34":35,"a35_39":38,"a40_49":93,"a50_64":117},"race":{"total":1155,"white":1131,"black":0,"asian":0,"native":19,"pacific":0,"other":0,"multi":5,"hispanic":19},"marital":{"neverMarried":0.18025751072961374,"separated":0,"divorced":0.03648068669527897},"obesity":0.355,"ll":[38.1957,-90.1988]},"62245":{"medHHIncome":89375,"eduShareBplus":0.23943661971830985,"eduShareGrad":0.06572769953051644,"eduShareAssoc":0.14475743348982786,"femIncome":{"zero":0.3704206241519674,"u75":0.4708276797829037,"b7599":0.1044776119402985,"p100":0.054274084124830396},"dist":{"p20":40214,"p40":77729,"p60":109786,"p80":160846,"p95":248859},"maleMedEarn":62500,"homeValue":197900,"grossRent":645,"ownerCostMortgage":1609,"pop":1760,"women":{"a18_24":38,"a25_29":50,"a30_34":30,"a35_39":57,"a40_49":113,"a50_64":222},"race":{"total":1760,"white":1732,"black":7,"asian":0,"native":0,"pacific":0,"other":4,"multi":17,"hispanic":4},"marital":{"neverMarried":0.20671140939597316,"separated":0,"divorced":0.1261744966442953},"obesity":0.402,"ll":[38.531,-89.5752]},"62246":{"medHHIncome":61740,"eduShareBplus":0.2654436004013186,"eduShareGrad":0.11193922889494051,"eduShareAssoc":0.07252400745306005,"femIncome":{"zero":0.38911189162067233,"u75":0.5556949322629202,"b7599":0.03612644254892122,"p100":0.019066733567486203},"dist":{"p20":32830,"p40":50376,"p60":83738,"p80":122915,"p95":215772},"maleMedEarn":35904,"homeValue":149200,"grossRent":726,"ownerCostMortgage":1235,"pop":9946,"women":{"a18_24":585,"a25_29":234,"a30_34":270,"a35_39":325,"a40_49":624,"a50_64":854},"race":{"total":9946,"white":8446,"black":1100,"asian":73,"native":59,"pacific":0,"other":0,"multi":268,"hispanic":576},"marital":{"neverMarried":0.3001732244493937,"separated":0.05617421430339025,"divorced":0.12818609255134866},"obesity":0.39,"ll":[38.8904,-89.4276]},"62248":{"medHHIncome":80260,"eduShareBplus":0.14626865671641792,"eduShareGrad":0.050746268656716415,"eduShareAssoc":0.13134328358208955,"femIncome":{"zero":0.18571428571428572,"u75":0.7285714285714285,"b7599":0.06666666666666667,"p100":0.01904761904761905},"dist":{"p20":55875,"p40":69917,"p60":86000,"p80":117833,"p95":157375},"maleMedEarn":51944,"homeValue":153700,"grossRent":736,"ownerCostMortgage":1201,"pop":556,"women":{"a18_24":47,"a25_29":13,"a30_34":23,"a35_39":38,"a40_49":23,"a50_64":33},"race":{"total":556,"white":494,"black":9,"asian":0,"native":0,"pacific":0,"other":0,"multi":53,"hispanic":38},"marital":{"neverMarried":0.44933920704845814,"separated":0,"divorced":0.09251101321585903},"obesity":0.355,"ll":[38.3059,-89.9929]},"62249":{"medHHIncome":88986,"eduShareBplus":0.35788311247026844,"eduShareGrad":0.12827047230716956,"eduShareAssoc":0.1216445803601767,"femIncome":{"zero":0.34147058823529414,"u75":0.5136764705882353,"b7599":0.07205882352941176,"p100":0.07279411764705883},"dist":{"p20":40057,"p40":71730,"p60":110067,"p80":169750,"p95":250001},"maleMedEarn":69038,"homeValue":220000,"grossRent":779,"ownerCostMortgage":1668,"pop":16550,"women":{"a18_24":537,"a25_29":344,"a30_34":628,"a35_39":624,"a40_49":1012,"a50_64":1724},"race":{"total":16550,"white":15121,"black":18,"asian":463,"native":11,"pacific":0,"other":70,"multi":867,"hispanic":545},"marital":{"neverMarried":0.24218636429713622,"separated":0.013519406890536415,"divorced":0.10452100596016863},"obesity":0.39,"ll":[38.7553,-89.6673]},"62250":{"medHHIncome":70292,"eduShareBplus":0.0875,"eduShareGrad":0.025,"eduShareAssoc":0.1875,"femIncome":{"zero":0.43523316062176165,"u75":0.5492227979274611,"b7599":0,"p100":0.015544041450777202},"dist":{"p20":35292,"p40":54676,"p60":72017,"p80":100722,"p95":209563},"maleMedEarn":47344,"homeValue":109600,"grossRent":920,"ownerCostMortgage":1301,"pop":627,"women":{"a18_24":1,"a25_29":24,"a30_34":13,"a35_39":18,"a40_49":13,"a50_64":76},"race":{"total":627,"white":608,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":19,"hispanic":0},"marital":{"neverMarried":0.07653061224489796,"separated":0,"divorced":0.07142857142857142},"obesity":0.402,"ll":[38.5405,-89.2643]},"62253":{"medHHIncome":50000,"eduShareBplus":0.0564373897707231,"eduShareGrad":0.015873015873015872,"eduShareAssoc":0.13932980599647266,"femIncome":{"zero":0.45014245014245013,"u75":0.5413105413105413,"b7599":0.005698005698005698,"p100":0.002849002849002849},"dist":{"p20":23091,"p40":39227,"p60":68900,"p80":130111,"p95":132389},"maleMedEarn":49167,"homeValue":100500,"grossRent":630,"ownerCostMortgage":865,"pop":923,"women":{"a18_24":29,"a25_29":35,"a30_34":50,"a35_39":8,"a40_49":61,"a50_64":89},"race":{"total":923,"white":891,"black":0,"asian":9,"native":0,"pacific":0,"other":0,"multi":23,"hispanic":2},"marital":{"neverMarried":0.22598870056497175,"separated":0,"divorced":0.2401129943502825},"obesity":0.39,"ll":[38.7777,-89.3001]},"62254":{"medHHIncome":89500,"eduShareBplus":0.37436146922889807,"eduShareGrad":0.15105813670639748,"eduShareAssoc":0.12867915349063488,"femIncome":{"zero":0.36393659180977544,"u75":0.5290620871862616,"b7599":0.07826948480845443,"p100":0.028731836195508585},"dist":{"p20":40163,"p40":80213,"p60":96548,"p80":140267,"p95":250001},"maleMedEarn":36682,"homeValue":196600,"grossRent":1100,"ownerCostMortgage":1524,"pop":6339,"women":{"a18_24":705,"a25_29":313,"a30_34":282,"a35_39":183,"a40_49":261,"a50_64":609},"race":{"total":6339,"white":5026,"black":632,"asian":32,"native":17,"pacific":0,"other":20,"multi":612,"hispanic":383},"marital":{"neverMarried":0.41332470892626133,"separated":0.008085381630012937,"divorced":0.11416558861578266},"obesity":0.387,"ll":[38.6094,-89.8229]},"62255":{"medHHIncome":78250,"eduShareBplus":0.09746835443037975,"eduShareGrad":0.06455696202531645,"eduShareAssoc":0.10253164556962026,"femIncome":{"zero":0.6301115241635687,"u75":0.3252788104089219,"b7599":0.03903345724907063,"p100":0.0055762081784386614},"dist":{"p20":27577,"p40":65800,"p60":95041,"p80":109848,"p95":170813},"maleMedEarn":80602,"homeValue":153400,"grossRent":645,"ownerCostMortgage":1342,"pop":1231,"women":{"a18_24":46,"a25_29":27,"a30_34":12,"a35_39":21,"a40_49":53,"a50_64":196},"race":{"total":1231,"white":1213,"black":1,"asian":0,"native":0,"pacific":0,"other":0,"multi":17,"hispanic":10},"marital":{"neverMarried":0.29739776951672864,"separated":0.0055762081784386614,"divorced":0.0762081784386617},"obesity":0.38799999999999996,"ll":[38.3132,-89.7831]},"62256":{"medHHIncome":87500,"eduShareBplus":0.09090909090909091,"eduShareGrad":0.09090909090909091,"eduShareAssoc":0.4090909090909091,"femIncome":{"zero":0.375,"u75":0.625,"b7599":0,"p100":0},"dist":{"p20":68667,"p40":78500,"p60":96500,"p80":166500,"p95":194250},"maleMedEarn":70000,"homeValue":154200,"grossRent":null,"ownerCostMortgage":1563,"pop":38,"women":{"a18_24":2,"a25_29":0,"a30_34":0,"a35_39":0,"a40_49":3,"a50_64":8},"race":{"total":38,"white":38,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.3125,"separated":0,"divorced":0.0625},"obesity":0.355,"ll":[38.2264,-90.2315]},"62257":{"medHHIncome":66848,"eduShareBplus":0.14954577218728163,"eduShareGrad":0.06359189378057302,"eduShareAssoc":0.15234102026554858,"femIncome":{"zero":0.34296482412060303,"u75":0.6105527638190955,"b7599":0.005025125628140704,"p100":0.0414572864321608},"dist":{"p20":22269,"p40":51415,"p60":85357,"p80":122431,"p95":148594},"maleMedEarn":35278,"homeValue":119200,"grossRent":621,"ownerCostMortgage":1311,"pop":1960,"women":{"a18_24":98,"a25_29":57,"a30_34":54,"a35_39":95,"a40_49":113,"a50_64":149},"race":{"total":1960,"white":1782,"black":0,"asian":0,"native":5,"pacific":0,"other":0,"multi":173,"hispanic":42},"marital":{"neverMarried":0.2721598002496879,"separated":0,"divorced":0.0599250936329588},"obesity":0.38799999999999996,"ll":[38.2849,-89.7287]},"62258":{"medHHIncome":90417,"eduShareBplus":0.2714510815069474,"eduShareGrad":0.10829394069617533,"eduShareAssoc":0.175906030654634,"femIncome":{"zero":0.3334152938283747,"u75":0.578067371526924,"b7599":0.03393164494713548,"p100":0.054585689697565776},"dist":{"p20":42736,"p40":77214,"p60":113562,"p80":165889,"p95":241051},"maleMedEarn":58109,"homeValue":229500,"grossRent":1231,"ownerCostMortgage":1781,"pop":10292,"women":{"a18_24":411,"a25_29":393,"a30_34":243,"a35_39":342,"a40_49":685,"a50_64":1017},"race":{"total":10292,"white":8519,"black":357,"asian":223,"native":110,"pacific":0,"other":216,"multi":867,"hispanic":710},"marital":{"neverMarried":0.2383132530120482,"separated":0.02216867469879518,"divorced":0.15132530120481927},"obesity":0.38799999999999996,"ll":[38.4609,-89.7821]},"62260":{"medHHIncome":93929,"eduShareBplus":0.3056273613044343,"eduShareGrad":0.12885265460330086,"eduShareAssoc":0.13660767548220323,"femIncome":{"zero":0.4632768361581921,"u75":0.394774011299435,"b7599":0.07944915254237288,"p100":0.0625},"dist":{"p20":40053,"p40":78348,"p60":114885,"p80":169789,"p95":250001},"maleMedEarn":71005,"homeValue":229600,"grossRent":1000,"ownerCostMortgage":1694,"pop":6518,"women":{"a18_24":117,"a25_29":142,"a30_34":249,"a35_39":102,"a40_49":524,"a50_64":786},"race":{"total":6518,"white":6287,"black":0,"asian":0,"native":55,"pacific":0,"other":30,"multi":146,"hispanic":85},"marital":{"neverMarried":0.17561482507793558,"separated":0,"divorced":0.12054035330793211},"obesity":0.38799999999999996,"ll":[38.4609,-90.0986]},"62262":{"medHHIncome":58722,"eduShareBplus":0.1297340854149879,"eduShareGrad":0.04754230459307011,"eduShareAssoc":0.10394842868654311,"femIncome":{"zero":0.41459627329192544,"u75":0.5434782608695652,"b7599":0.018633540372670808,"p100":0.023291925465838508},"dist":{"p20":28875,"p40":50159,"p60":74360,"p80":113900,"p95":183063},"maleMedEarn":40865,"homeValue":121600,"grossRent":1008,"ownerCostMortgage":1248,"pop":1887,"women":{"a18_24":60,"a25_29":41,"a30_34":33,"a35_39":46,"a40_49":130,"a50_64":103},"race":{"total":1887,"white":1655,"black":71,"asian":0,"native":6,"pacific":0,"other":0,"multi":155,"hispanic":15},"marital":{"neverMarried":0.2302936630602782,"separated":0,"divorced":0.10664605873261206},"obesity":0.39,"ll":[38.9394,-89.2638]},"62263":{"medHHIncome":68931,"eduShareBplus":0.25760135135135137,"eduShareGrad":0.08811936936936937,"eduShareAssoc":0.17229729729729729,"femIncome":{"zero":0.3699167074963253,"u75":0.5629593336599706,"b7599":0.04262616364527193,"p100":0.02449779519843214},"dist":{"p20":38181,"p40":60349,"p60":80567,"p80":114674,"p95":196296},"maleMedEarn":47794,"homeValue":149900,"grossRent":798,"ownerCostMortgage":1530,"pop":4834,"women":{"a18_24":140,"a25_29":134,"a30_34":106,"a35_39":198,"a40_49":280,"a50_64":537},"race":{"total":4834,"white":4642,"black":33,"asian":19,"native":0,"pacific":0,"other":0,"multi":140,"hispanic":37},"marital":{"neverMarried":0.20912178554099953,"separated":0.012615235322658904,"divorced":0.1596312469674915},"obesity":0.40700000000000003,"ll":[38.319,-89.4012]},"62264":{"medHHIncome":61174,"eduShareBplus":0.15029967727063162,"eduShareGrad":0.030889810972798526,"eduShareAssoc":0.13739050253573076,"femIncome":{"zero":0.3252569750367107,"u75":0.604258443465492,"b7599":0.0631424375917768,"p100":0.007342143906020558},"dist":{"p20":30414,"p40":47190,"p60":81500,"p80":123212,"p95":193014},"maleMedEarn":40119,"homeValue":137100,"grossRent":829,"ownerCostMortgage":1445,"pop":3152,"women":{"a18_24":126,"a25_29":106,"a30_34":88,"a35_39":78,"a40_49":206,"a50_64":341},"race":{"total":3152,"white":3007,"black":4,"asian":0,"native":0,"pacific":0,"other":0,"multi":141,"hispanic":145},"marital":{"neverMarried":0.2583212735166425,"separated":0.053545586107091175,"divorced":0.09696092619392185},"obesity":0.355,"ll":[38.3159,-89.8999]},"62265":{"medHHIncome":88097,"eduShareBplus":0.2545931758530184,"eduShareGrad":0.06332020997375327,"eduShareAssoc":0.10793963254593175,"femIncome":{"zero":0.34865671641791046,"u75":0.4405970149253731,"b7599":0.15880597014925374,"p100":0.051940298507462686},"dist":{"p20":40144,"p40":71635,"p60":97360,"p80":148554,"p95":250001},"maleMedEarn":47118,"homeValue":173600,"grossRent":1158,"ownerCostMortgage":1479,"pop":4396,"women":{"a18_24":184,"a25_29":62,"a30_34":157,"a35_39":114,"a40_49":266,"a50_64":547},"race":{"total":4396,"white":3850,"black":138,"asian":26,"native":2,"pacific":0,"other":90,"multi":290,"hispanic":378},"marital":{"neverMarried":0.23569405099150142,"separated":0,"divorced":0.1688385269121813},"obesity":0.402,"ll":[38.5062,-89.6807]},"62268":{"medHHIncome":86389,"eduShareBplus":0.23958333333333334,"eduShareGrad":0.0818452380952381,"eduShareAssoc":0.14285714285714285,"femIncome":{"zero":0.39452054794520547,"u75":0.5013698630136987,"b7599":0.024657534246575342,"p100":0.07945205479452055},"dist":{"p20":34364,"p40":80333,"p60":105022,"p80":135214,"p95":250001},"maleMedEarn":47500,"homeValue":130000,"grossRent":null,"ownerCostMortgage":1321,"pop":922,"women":{"a18_24":42,"a25_29":11,"a30_34":25,"a35_39":15,"a40_49":48,"a50_64":125},"race":{"total":922,"white":887,"black":0,"asian":2,"native":2,"pacific":0,"other":0,"multi":31,"hispanic":6},"marital":{"neverMarried":0.30179028132992325,"separated":0.005115089514066497,"divorced":0.03580562659846547},"obesity":0.40700000000000003,"ll":[38.2763,-89.5396]},"62269":{"medHHIncome":100167,"eduShareBplus":0.5142347999490856,"eduShareGrad":0.23339980482837624,"eduShareAssoc":0.11947897662183377,"femIncome":{"zero":0.36460176991150445,"u75":0.47190265486725663,"b7599":0.08230088495575222,"p100":0.08119469026548673},"dist":{"p20":45291,"p40":77319,"p60":121742,"p80":188338,"p95":250001},"maleMedEarn":73948,"homeValue":274200,"grossRent":1258,"ownerCostMortgage":2049,"pop":35536,"women":{"a18_24":916,"a25_29":943,"a30_34":1140,"a35_39":1625,"a40_49":2451,"a50_64":2936},"race":{"total":35536,"white":25849,"black":4737,"asian":930,"native":23,"pacific":0,"other":550,"multi":3447,"hispanic":2193},"marital":{"neverMarried":0.22055643649992793,"separated":0.017658930373360242,"divorced":0.08598817932823988},"obesity":0.38799999999999996,"ll":[38.6,-89.9154]},"62271":{"medHHIncome":82500,"eduShareBplus":0.28711379050489827,"eduShareGrad":0.12132629992464206,"eduShareAssoc":0.11906556141672947,"femIncome":{"zero":0.3902759526938239,"u75":0.507227332457293,"b7599":0.04993429697766097,"p100":0.052562417871222074},"dist":{"p20":26980,"p40":64143,"p60":105140,"p80":152700,"p95":212325},"maleMedEarn":49432,"homeValue":167200,"grossRent":713,"ownerCostMortgage":1615,"pop":1819,"women":{"a18_24":45,"a25_29":44,"a30_34":61,"a35_39":74,"a40_49":91,"a50_64":195},"race":{"total":1819,"white":1746,"black":2,"asian":11,"native":9,"pacific":0,"other":11,"multi":40,"hispanic":21},"marital":{"neverMarried":0.17447916666666666,"separated":0,"divorced":0.07942708333333333},"obesity":0.368,"ll":[38.4401,-89.5205]},"62272":{"medHHIncome":49954,"eduShareBplus":0.06535362578334826,"eduShareGrad":0.018800358102059087,"eduShareAssoc":0.09310653536257833,"femIncome":{"zero":0.4813753581661891,"u75":0.5085959885386819,"b7599":0.008595988538681949,"p100":0.0014326647564469914},"dist":{"p20":25455,"p40":42500,"p60":61417,"p80":92619,"p95":139125},"maleMedEarn":34107,"homeValue":104200,"grossRent":716,"ownerCostMortgage":950,"pop":1713,"women":{"a18_24":73,"a25_29":25,"a30_34":18,"a35_39":56,"a40_49":89,"a50_64":212},"race":{"total":1713,"white":1443,"black":0,"asian":12,"native":6,"pacific":0,"other":198,"multi":54,"hispanic":248},"marital":{"neverMarried":0.17482517482517482,"separated":0.0013986013986013986,"divorced":0.23076923076923078},"obesity":0.39799999999999996,"ll":[37.9962,-89.6164]},"62273":{"medHHIncome":47986,"eduShareBplus":0.09569377990430622,"eduShareGrad":0.0430622009569378,"eduShareAssoc":0.023923444976076555,"femIncome":{"zero":0.36752136752136755,"u75":0.6239316239316239,"b7599":0.008547008547008548,"p100":0},"dist":{"p20":23143,"p40":42357,"p60":49778,"p80":91065,"p95":94438},"maleMedEarn":37250,"homeValue":105000,"grossRent":994,"ownerCostMortgage":872,"pop":302,"women":{"a18_24":5,"a25_29":36,"a30_34":0,"a35_39":2,"a40_49":13,"a50_64":13},"race":{"total":302,"white":284,"black":0,"asian":0,"native":1,"pacific":0,"other":14,"multi":3,"hispanic":8},"marital":{"neverMarried":0.23931623931623933,"separated":0.1623931623931624,"divorced":0.05982905982905983},"obesity":0.39,"ll":[38.7868,-89.5838]},"62274":{"medHHIncome":64338,"eduShareBplus":0.12079681274900399,"eduShareGrad":0.044302788844621514,"eduShareAssoc":0.11282868525896414,"femIncome":{"zero":0.4026717557251908,"u75":0.5431297709923664,"b7599":0.0366412213740458,"p100":0.017557251908396947},"dist":{"p20":25781,"p40":51169,"p60":77470,"p80":117434,"p95":195875},"maleMedEarn":39688,"homeValue":118700,"grossRent":611,"ownerCostMortgage":1031,"pop":8147,"women":{"a18_24":241,"a25_29":117,"a30_34":205,"a35_39":221,"a40_49":287,"a50_64":600},"race":{"total":8147,"white":6467,"black":1155,"asian":99,"native":0,"pacific":0,"other":65,"multi":361,"hispanic":462},"marital":{"neverMarried":0.17848970251716248,"separated":0.036231884057971016,"divorced":0.17467581998474446},"obesity":0.39799999999999996,"ll":[38.0912,-89.4003]},"62275":{"medHHIncome":89375,"eduShareBplus":0.18149284253578732,"eduShareGrad":0.06850715746421268,"eduShareAssoc":0.11503067484662577,"femIncome":{"zero":0.4156171284634761,"u75":0.5197313182199832,"b7599":0.04030226700251889,"p100":0.02434928631402183},"dist":{"p20":40429,"p40":66235,"p60":105746,"p80":135700,"p95":202394},"maleMedEarn":54267,"homeValue":175000,"grossRent":759,"ownerCostMortgage":1557,"pop":2942,"women":{"a18_24":183,"a25_29":61,"a30_34":22,"a35_39":73,"a40_49":183,"a50_64":327},"race":{"total":2942,"white":2823,"black":32,"asian":0,"native":19,"pacific":0,"other":17,"multi":51,"hispanic":13},"marital":{"neverMarried":0.28248113998323554,"separated":0.022632020117351215,"divorced":0.04694048616932104},"obesity":0.39,"ll":[38.8146,-89.5471]},"62277":{"medHHIncome":71458,"eduShareBplus":0.09687034277198212,"eduShareGrad":0.041728763040238454,"eduShareAssoc":0.09836065573770492,"femIncome":{"zero":0.21957671957671956,"u75":0.7380952380952381,"b7599":0.021164021164021163,"p100":0.021164021164021163},"dist":{"p20":37000,"p40":57583,"p60":81714,"p80":108500,"p95":182625},"maleMedEarn":49423,"homeValue":125700,"grossRent":732,"ownerCostMortgage":1138,"pop":994,"women":{"a18_24":47,"a25_29":30,"a30_34":17,"a35_39":35,"a40_49":40,"a50_64":100},"race":{"total":994,"white":952,"black":4,"asian":0,"native":1,"pacific":2,"other":4,"multi":31,"hispanic":25},"marital":{"neverMarried":0.26052631578947366,"separated":0,"divorced":0.060526315789473685},"obesity":0.355,"ll":[38.097,-90.1122]},"62278":{"medHHIncome":85017,"eduShareBplus":0.21829240820004506,"eduShareGrad":0.09776976796575805,"eduShareAssoc":0.1457535480964181,"femIncome":{"zero":0.38375673595073134,"u75":0.5200153964588144,"b7599":0.03348729792147806,"p100":0.06274056966897613},"dist":{"p20":34417,"p40":65193,"p60":98780,"p80":156160,"p95":237767},"maleMedEarn":61503,"homeValue":181500,"grossRent":831,"ownerCostMortgage":1782,"pop":6425,"women":{"a18_24":116,"a25_29":134,"a30_34":195,"a35_39":229,"a40_49":374,"a50_64":624},"race":{"total":6425,"white":6035,"black":21,"asian":150,"native":0,"pacific":12,"other":5,"multi":202,"hispanic":85},"marital":{"neverMarried":0.14055299539170507,"separated":0.014976958525345621,"divorced":0.12327188940092165},"obesity":0.355,"ll":[38.2038,-89.9913]},"62279":{"medHHIncome":245179,"eduShareBplus":0.10416666666666667,"eduShareGrad":0.10416666666666667,"eduShareAssoc":0.3333333333333333,"femIncome":{"zero":0.2,"u75":0.8,"b7599":0,"p100":0},"dist":{"p20":79357,"p40":181700,"p60":245643,"p80":246571,"p95":247268},"maleMedEarn":null,"homeValue":271400,"grossRent":null,"ownerCostMortgage":null,"pop":69,"women":{"a18_24":0,"a25_29":0,"a30_34":14,"a35_39":0,"a40_49":0,"a50_64":6},"race":{"total":69,"white":69,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0,"separated":0,"divorced":0},"obesity":0.355,"ll":[38.1338,-90.1358]},"62280":{"medHHIncome":65568,"eduShareBplus":0.17455621301775148,"eduShareGrad":0.09171597633136094,"eduShareAssoc":0.0621301775147929,"femIncome":{"zero":0.47468354430379744,"u75":0.4430379746835443,"b7599":0,"p100":0.08227848101265822},"dist":{"p20":57512,"p40":59500,"p60":88167,"p80":164577,"p95":250001},"maleMedEarn":null,"homeValue":233600,"grossRent":null,"ownerCostMortgage":1721,"pop":394,"women":{"a18_24":9,"a25_29":10,"a30_34":0,"a35_39":0,"a40_49":14,"a50_64":86},"race":{"total":394,"white":374,"black":0,"asian":0,"native":0,"pacific":0,"other":14,"multi":6,"hispanic":0},"marital":{"neverMarried":0.11392405063291139,"separated":0,"divorced":0.056962025316455694},"obesity":0.39799999999999996,"ll":[37.8466,-89.648]},"62281":{"medHHIncome":122679,"eduShareBplus":0.37227414330218067,"eduShareGrad":0.17393561786085152,"eduShareAssoc":0.17653167185877466,"femIncome":{"zero":0.2770758122743682,"u75":0.5505415162454874,"b7599":0.04783393501805054,"p100":0.12454873646209386},"dist":{"p20":54750,"p40":98706,"p60":148013,"p80":169317,"p95":250001},"maleMedEarn":74167,"homeValue":287800,"grossRent":1328,"ownerCostMortgage":2059,"pop":3018,"women":{"a18_24":75,"a25_29":50,"a30_34":138,"a35_39":188,"a40_49":157,"a50_64":297},"race":{"total":3018,"white":2948,"black":0,"asian":6,"native":0,"pacific":0,"other":1,"multi":63,"hispanic":27},"marital":{"neverMarried":0.19101123595505617,"separated":0,"divorced":0.08902333621434745},"obesity":0.387,"ll":[38.7069,-89.7794]},"62282":{"medHHIncome":113167,"eduShareBplus":0.22268041237113403,"eduShareGrad":0.07628865979381444,"eduShareAssoc":0.1422680412371134,"femIncome":{"zero":0.1728395061728395,"u75":0.6625514403292181,"b7599":0.05761316872427984,"p100":0.10699588477366255},"dist":{"p20":53444,"p40":100583,"p60":127545,"p80":158762,"p95":202667},"maleMedEarn":63125,"homeValue":168800,"grossRent":788,"ownerCostMortgage":1345,"pop":620,"women":{"a18_24":2,"a25_29":15,"a30_34":29,"a35_39":18,"a40_49":55,"a50_64":76},"race":{"total":620,"white":600,"black":0,"asian":0,"native":0,"pacific":0,"other":8,"multi":12,"hispanic":14},"marital":{"neverMarried":0.1440329218106996,"separated":0,"divorced":0.11934156378600823},"obesity":0.38799999999999996,"ll":[38.3564,-89.7129]},"62284":{"medHHIncome":50208,"eduShareBplus":0.07971014492753623,"eduShareGrad":0.03140096618357488,"eduShareAssoc":0.21739130434782608,"femIncome":{"zero":0.38495575221238937,"u75":0.5663716814159292,"b7599":0.048672566371681415,"p100":0},"dist":{"p20":23677,"p40":36625,"p60":56854,"p80":95579,"p95":170770},"maleMedEarn":null,"homeValue":131000,"grossRent":null,"ownerCostMortgage":1121,"pop":629,"women":{"a18_24":15,"a25_29":4,"a30_34":41,"a35_39":2,"a40_49":19,"a50_64":99},"race":{"total":629,"white":615,"black":4,"asian":0,"native":0,"pacific":0,"other":0,"multi":10,"hispanic":0},"marital":{"neverMarried":0.10572687224669604,"separated":0.022026431718061675,"divorced":0.1894273127753304},"obesity":0.39,"ll":[38.8641,-89.3104]},"62285":{"medHHIncome":118413,"eduShareBplus":0.41961675868788567,"eduShareGrad":0.14517700552127313,"eduShareAssoc":0.14063007469957778,"femIncome":{"zero":0.34866123399301513,"u75":0.4871944121071013,"b7599":0.03667054714784633,"p100":0.12747380675203726},"dist":{"p20":40870,"p40":98966,"p60":153583,"p80":207829,"p95":250001},"maleMedEarn":88301,"homeValue":265300,"grossRent":859,"ownerCostMortgage":2208,"pop":4187,"women":{"a18_24":109,"a25_29":57,"a30_34":103,"a35_39":62,"a40_49":379,"a50_64":431},"race":{"total":4187,"white":3974,"black":69,"asian":0,"native":0,"pacific":0,"other":8,"multi":136,"hispanic":57},"marital":{"neverMarried":0.12327188940092165,"separated":0,"divorced":0.11923963133640553},"obesity":0.38799999999999996,"ll":[38.3923,-90.0084]},"62286":{"medHHIncome":64118,"eduShareBplus":0.18961687951138256,"eduShareGrad":0.06662965019433648,"eduShareAssoc":0.13103831204886174,"femIncome":{"zero":0.43718361711919007,"u75":0.4809019788311091,"b7599":0.034974689369535204,"p100":0.04693971468016567},"dist":{"p20":26295,"p40":49957,"p60":73329,"p80":124250,"p95":190678},"maleMedEarn":47202,"homeValue":148800,"grossRent":723,"ownerCostMortgage":1281,"pop":5482,"women":{"a18_24":282,"a25_29":127,"a30_34":130,"a35_39":85,"a40_49":368,"a50_64":438},"race":{"total":5482,"white":4527,"black":548,"asian":5,"native":2,"pacific":0,"other":15,"multi":385,"hispanic":157},"marital":{"neverMarried":0.2189647274393037,"separated":0.06550618415025194,"divorced":0.1571232249198351},"obesity":0.38799999999999996,"ll":[38.117,-89.7177]},"62288":{"medHHIncome":69500,"eduShareBplus":0.18122977346278318,"eduShareGrad":0.08683926645091694,"eduShareAssoc":0.15911542610571736,"femIncome":{"zero":0.3835732430143946,"u75":0.5563082133784928,"b7599":0.027095681625740897,"p100":0.03302286198137172},"dist":{"p20":28673,"p40":60348,"p60":79239,"p80":127500,"p95":180500},"maleMedEarn":41198,"homeValue":166600,"grossRent":775,"ownerCostMortgage":1252,"pop":2592,"women":{"a18_24":135,"a25_29":32,"a30_34":31,"a35_39":88,"a40_49":171,"a50_64":269},"race":{"total":2592,"white":2473,"black":29,"asian":0,"native":0,"pacific":0,"other":59,"multi":31,"hispanic":75},"marital":{"neverMarried":0.2556016597510373,"separated":0,"divorced":0.14273858921161825},"obesity":0.38799999999999996,"ll":[37.9934,-89.6896]},"62289":{"medHHIncome":48472,"eduShareBplus":0.1407185628742515,"eduShareGrad":0.023952095808383235,"eduShareAssoc":0.10179640718562874,"femIncome":{"zero":0.5988372093023255,"u75":0.37790697674418605,"b7599":0.01744186046511628,"p100":0.005813953488372093},"dist":{"p20":28750,"p40":43646,"p60":59821,"p80":121667,"p95":192969},"maleMedEarn":41667,"homeValue":73900,"grossRent":815,"ownerCostMortgage":1104,"pop":385,"women":{"a18_24":4,"a25_29":1,"a30_34":10,"a35_39":33,"a40_49":30,"a50_64":41},"race":{"total":385,"white":373,"black":0,"asian":0,"native":0,"pacific":0,"other":2,"multi":10,"hispanic":8},"marital":{"neverMarried":0.11627906976744186,"separated":0,"divorced":0.20930232558139536},"obesity":0.38799999999999996,"ll":[38.5976,-89.7513]},"62292":{"medHHIncome":45625,"eduShareBplus":0.05084745762711865,"eduShareGrad":0.030131826741996232,"eduShareAssoc":0.0847457627118644,"femIncome":{"zero":0.6047297297297297,"u75":0.34797297297297297,"b7599":0.0472972972972973,"p100":0},"dist":{"p20":18632,"p40":30038,"p60":64727,"p80":98900,"p95":223792},"maleMedEarn":41618,"homeValue":72300,"grossRent":821,"ownerCostMortgage":769,"pop":722,"women":{"a18_24":24,"a25_29":32,"a30_34":21,"a35_39":17,"a40_49":19,"a50_64":83},"race":{"total":722,"white":618,"black":23,"asian":8,"native":0,"pacific":0,"other":53,"multi":20,"hispanic":59},"marital":{"neverMarried":0.19063545150501673,"separated":0.046822742474916385,"divorced":0.11036789297658862},"obesity":0.38799999999999996,"ll":[38.2131,-89.682]},"62293":{"medHHIncome":90059,"eduShareBplus":0.3406113537117904,"eduShareGrad":0.15283842794759825,"eduShareAssoc":0.16063630692451653,"femIncome":{"zero":0.4565811032222829,"u75":0.4423812124522119,"b7599":0.05406881485527035,"p100":0.04696886947023485},"dist":{"p20":38731,"p40":71517,"p60":104188,"p80":156041,"p95":249732},"maleMedEarn":54406,"homeValue":214500,"grossRent":912,"ownerCostMortgage":1672,"pop":4572,"women":{"a18_24":120,"a25_29":197,"a30_34":69,"a35_39":197,"a40_49":270,"a50_64":453},"race":{"total":4572,"white":4319,"black":8,"asian":18,"native":4,"pacific":0,"other":0,"multi":223,"hispanic":61},"marital":{"neverMarried":0.22450080949811116,"separated":0.004317323259579061,"divorced":0.05612520237452779},"obesity":0.402,"ll":[38.616,-89.6955]},"62294":{"medHHIncome":108418,"eduShareBplus":0.4742586689848353,"eduShareGrad":0.17511832319134552,"eduShareAssoc":0.11919250458804212,"femIncome":{"zero":0.3171504838171505,"u75":0.5126793460126794,"b7599":0.056890223556890225,"p100":0.11327994661327995},"dist":{"p20":53843,"p40":88176,"p60":127590,"p80":188417,"p95":250001},"maleMedEarn":75220,"homeValue":255700,"grossRent":1069,"ownerCostMortgage":1967,"pop":15246,"women":{"a18_24":347,"a25_29":518,"a30_34":558,"a35_39":696,"a40_49":786,"a50_64":1659},"race":{"total":15246,"white":14298,"black":185,"asian":90,"native":0,"pacific":0,"other":187,"multi":486,"hispanic":418},"marital":{"neverMarried":0.22872079725535044,"separated":0.004574415945107008,"divorced":0.12171213853945434},"obesity":0.387,"ll":[38.7026,-89.8675]},"62295":{"medHHIncome":76563,"eduShareBplus":0.19507186858316222,"eduShareGrad":0.033880903490759756,"eduShareAssoc":0.13141683778234087,"femIncome":{"zero":0.33167495854063017,"u75":0.5621890547263682,"b7599":0.028192371475953566,"p100":0.0779436152570481},"dist":{"p20":45556,"p40":68261,"p60":109250,"p80":163409,"p95":223563},"maleMedEarn":61875,"homeValue":196500,"grossRent":1242,"ownerCostMortgage":1746,"pop":1310,"women":{"a18_24":43,"a25_29":35,"a30_34":23,"a35_39":42,"a40_49":106,"a50_64":150},"race":{"total":1310,"white":1267,"black":6,"asian":0,"native":0,"pacific":0,"other":5,"multi":32,"hispanic":63},"marital":{"neverMarried":0.18780889621087316,"separated":0.004942339373970346,"divorced":0.1416803953871499},"obesity":0.355,"ll":[38.2719,-90.3108]},"62297":{"medHHIncome":78487,"eduShareBplus":0.02734375,"eduShareGrad":0,"eduShareAssoc":0.0390625,"femIncome":{"zero":0.7983193277310925,"u75":0.20168067226890757,"b7599":0,"p100":0},"dist":{"p20":38646,"p40":73333,"p60":89167,"p80":94196,"p95":204375},"maleMedEarn":73542,"homeValue":301700,"grossRent":1079,"ownerCostMortgage":2188,"pop":293,"women":{"a18_24":0,"a25_29":0,"a30_34":0,"a35_39":13,"a40_49":0,"a50_64":24},"race":{"total":293,"white":293,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.13445378151260504,"separated":0,"divorced":0.058823529411764705},"obesity":0.38799999999999996,"ll":[38.0521,-89.8063]},"62298":{"medHHIncome":94073,"eduShareBplus":0.3515903801396431,"eduShareGrad":0.11900698215671063,"eduShareAssoc":0.11140418929402637,"femIncome":{"zero":0.3485015122353588,"u75":0.49037668408028595,"b7599":0.0949958757217487,"p100":0.06612592796260654},"dist":{"p20":43739,"p40":79486,"p60":118450,"p80":172938,"p95":250001},"maleMedEarn":62131,"homeValue":263200,"grossRent":884,"ownerCostMortgage":1935,"pop":17907,"women":{"a18_24":643,"a25_29":332,"a30_34":435,"a35_39":575,"a40_49":858,"a50_64":2313},"race":{"total":17907,"white":17396,"black":90,"asian":133,"native":30,"pacific":0,"other":41,"multi":217,"hispanic":192},"marital":{"neverMarried":0.20005370569280342,"separated":0.014232008592910848,"divorced":0.11385606874328678},"obesity":0.355,"ll":[38.3088,-90.1494]},"62418":{"medHHIncome":57969,"eduShareBplus":0.0975609756097561,"eduShareGrad":0.026829268292682926,"eduShareAssoc":0.16585365853658537,"femIncome":{"zero":0.41143654114365413,"u75":0.5760111576011158,"b7599":0.0041841004184100415,"p100":0.008368200836820083},"dist":{"p20":28750,"p40":50313,"p60":76250,"p80":110921,"p95":165313},"maleMedEarn":51852,"homeValue":133400,"grossRent":785,"ownerCostMortgage":1167,"pop":1720,"women":{"a18_24":125,"a25_29":59,"a30_34":53,"a35_39":46,"a40_49":105,"a50_64":140},"race":{"total":1720,"white":1631,"black":0,"asian":19,"native":5,"pacific":32,"other":0,"multi":33,"hispanic":5},"marital":{"neverMarried":0.2768595041322314,"separated":0,"divorced":0.12258953168044077},"obesity":0.39799999999999996,"ll":[39.0223,-88.9738]},"62471":{"medHHIncome":58810,"eduShareBplus":0.20447030816029627,"eduShareGrad":0.06480624256050788,"eduShareAssoc":0.11228673455892078,"femIncome":{"zero":0.4064157615559485,"u75":0.5231118969436727,"b7599":0.039151300833543824,"p100":0.03132104066683506},"dist":{"p20":24236,"p40":43875,"p60":68599,"p80":115979,"p95":202511},"maleMedEarn":38824,"homeValue":119800,"grossRent":739,"ownerCostMortgage":1185,"pop":10309,"women":{"a18_24":317,"a25_29":321,"a30_34":321,"a35_39":322,"a40_49":583,"a50_64":1003},"race":{"total":10309,"white":8964,"black":688,"asian":4,"native":93,"pacific":10,"other":55,"multi":495,"hispanic":390},"marital":{"neverMarried":0.26531620553359686,"separated":0.003458498023715415,"divorced":0.15489130434782608},"obesity":0.39799999999999996,"ll":[38.9589,-89.1302]},"62538":{"medHHIncome":71875,"eduShareBplus":0.1270358306188925,"eduShareGrad":0.013029315960912053,"eduShareAssoc":0.10749185667752444,"femIncome":{"zero":0.5240963855421686,"u75":0.4759036144578313,"b7599":0,"p100":0},"dist":{"p20":26583,"p40":46875,"p60":84333,"p80":102500,"p95":129261},"maleMedEarn":55313,"homeValue":83900,"grossRent":730,"ownerCostMortgage":900,"pop":444,"women":{"a18_24":8,"a25_29":33,"a30_34":15,"a35_39":3,"a40_49":18,"a50_64":19},"race":{"total":444,"white":442,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":2,"hispanic":59},"marital":{"neverMarried":0.0783132530120482,"separated":0,"divorced":0.28313253012048195},"obesity":0.381,"ll":[39.3563,-89.5205]},"62560":{"medHHIncome":71875,"eduShareBplus":0.2848167539267016,"eduShareGrad":0.10052356020942409,"eduShareAssoc":0.10157068062827225,"femIncome":{"zero":0.3016157989228007,"u75":0.6014362657091562,"b7599":0.05565529622980251,"p100":0.04129263913824058},"dist":{"p20":31125,"p40":50400,"p60":86000,"p80":144050,"p95":230125},"maleMedEarn":47697,"homeValue":97900,"grossRent":911,"ownerCostMortgage":1224,"pop":1489,"women":{"a18_24":39,"a25_29":34,"a30_34":42,"a35_39":52,"a40_49":73,"a50_64":182},"race":{"total":1489,"white":1400,"black":36,"asian":0,"native":9,"pacific":0,"other":0,"multi":44,"hispanic":4},"marital":{"neverMarried":0.18149466192170818,"separated":0.033807829181494664,"divorced":0.12277580071174377},"obesity":0.37,"ll":[39.2986,-89.6028]},"62572":{"medHHIncome":90714,"eduShareBplus":0.056074766355140186,"eduShareGrad":0,"eduShareAssoc":0.21495327102803738,"femIncome":{"zero":0.26666666666666666,"u75":0.6606060606060606,"b7599":0.01818181818181818,"p100":0.05454545454545454},"dist":{"p20":36938,"p40":68923,"p60":104000,"p80":119984,"p95":167350},"maleMedEarn":58047,"homeValue":201900,"grossRent":675,"ownerCostMortgage":2008,"pop":486,"women":{"a18_24":9,"a25_29":3,"a30_34":4,"a35_39":11,"a40_49":70,"a50_64":39},"race":{"total":486,"white":481,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":5,"hispanic":0},"marital":{"neverMarried":0.09580838323353294,"separated":0.017964071856287425,"divorced":0.12574850299401197},"obesity":0.37,"ll":[39.3591,-89.6978]},"62626":{"medHHIncome":64440,"eduShareBplus":0.25764348292508493,"eduShareGrad":0.08456999821205077,"eduShareAssoc":0.13499016627927768,"femIncome":{"zero":0.4397793441618143,"u75":0.49586270303401775,"b7599":0.0330983757278578,"p100":0.03125957707631014},"dist":{"p20":24909,"p40":53263,"p60":84972,"p80":143210,"p95":217254},"maleMedEarn":50966,"homeValue":132700,"grossRent":749,"ownerCostMortgage":1272,"pop":7911,"women":{"a18_24":350,"a25_29":341,"a30_34":148,"a35_39":147,"a40_49":528,"a50_64":716},"race":{"total":7911,"white":7235,"black":178,"asian":14,"native":4,"pacific":0,"other":110,"multi":370,"hispanic":224},"marital":{"neverMarried":0.31791221826809013,"separated":0.009193357058125741,"divorced":0.12870699881376038},"obesity":0.37,"ll":[39.2846,-89.8836]},"62630":{"medHHIncome":82292,"eduShareBplus":0.29044117647058826,"eduShareGrad":0.10477941176470588,"eduShareAssoc":0.1323529411764706,"femIncome":{"zero":0.4674329501915709,"u75":0.5210727969348659,"b7599":0,"p100":0.011494252873563218},"dist":{"p20":51333,"p40":76118,"p60":105182,"p80":204417,"p95":234823},"maleMedEarn":70064,"homeValue":123300,"grossRent":null,"ownerCostMortgage":1357,"pop":783,"women":{"a18_24":11,"a25_29":6,"a30_34":16,"a35_39":26,"a40_49":56,"a50_64":36},"race":{"total":783,"white":781,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":2,"hispanic":0},"marital":{"neverMarried":0.02681992337164751,"separated":0,"divorced":0.022988505747126436},"obesity":0.402,"ll":[39.2711,-90.0863]},"62640":{"medHHIncome":64438,"eduShareBplus":0.15147783251231528,"eduShareGrad":0.04926108374384237,"eduShareAssoc":0.10098522167487685,"femIncome":{"zero":0.46465339739190115,"u75":0.456417295813315,"b7599":0.06588881262868909,"p100":0.013040494166094716},"dist":{"p20":27712,"p40":49776,"p60":83045,"p80":118650,"p95":191418},"maleMedEarn":36979,"homeValue":165500,"grossRent":786,"ownerCostMortgage":1441,"pop":3342,"women":{"a18_24":75,"a25_29":83,"a30_34":107,"a35_39":104,"a40_49":246,"a50_64":339},"race":{"total":3342,"white":3167,"black":0,"asian":0,"native":0,"pacific":6,"other":5,"multi":164,"hispanic":47},"marital":{"neverMarried":0.2926829268292683,"separated":0.017615176151761516,"divorced":0.17344173441734417},"obesity":0.37,"ll":[39.4283,-89.805]},"62649":{"medHHIncome":58173,"eduShareBplus":0.16352201257861634,"eduShareGrad":0.018867924528301886,"eduShareAssoc":0.040880503144654086,"femIncome":{"zero":0.4295774647887324,"u75":0.5070422535211268,"b7599":0.04929577464788732,"p100":0.014084507042253521},"dist":{"p20":35625,"p40":48889,"p60":74286,"p80":106667,"p95":250001},"maleMedEarn":27321,"homeValue":138600,"grossRent":718,"ownerCostMortgage":1219,"pop":416,"women":{"a18_24":9,"a25_29":1,"a30_34":1,"a35_39":19,"a40_49":19,"a50_64":56},"race":{"total":416,"white":409,"black":0,"asian":0,"native":0,"pacific":0,"other":1,"multi":6,"hispanic":0},"marital":{"neverMarried":0.1564625850340136,"separated":0.07482993197278912,"divorced":0.07482993197278912},"obesity":0.37,"ll":[39.3575,-90.06]},"62672":{"medHHIncome":46563,"eduShareBplus":0.09523809523809523,"eduShareGrad":0,"eduShareAssoc":0.1523809523809524,"femIncome":{"zero":0.5,"u75":0.4305555555555556,"b7599":0.06944444444444445,"p100":0},"dist":{"p20":26500,"p40":45333,"p60":52833,"p80":95071,"p95":125656},"maleMedEarn":37188,"homeValue":44400,"grossRent":null,"ownerCostMortgage":1313,"pop":140,"women":{"a18_24":11,"a25_29":0,"a30_34":3,"a35_39":0,"a40_49":11,"a50_64":17},"race":{"total":140,"white":137,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":3,"hispanic":0},"marital":{"neverMarried":0.19444444444444445,"separated":0,"divorced":0.1527777777777778},"obesity":0.37,"ll":[39.398,-89.8045]},"62674":{"medHHIncome":54196,"eduShareBplus":0.13566289825282632,"eduShareGrad":0.044193216855087356,"eduShareAssoc":0.07297019527235354,"femIncome":{"zero":0.5150976909413855,"u75":0.40319715808170514,"b7599":0.07460035523978685,"p100":0.007104795737122558},"dist":{"p20":22318,"p40":38625,"p60":76000,"p80":131231,"p95":188078},"maleMedEarn":49167,"homeValue":102600,"grossRent":695,"ownerCostMortgage":1165,"pop":1319,"women":{"a18_24":20,"a25_29":14,"a30_34":60,"a35_39":52,"a40_49":94,"a50_64":157},"race":{"total":1319,"white":1305,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":14,"hispanic":3},"marital":{"neverMarried":0.2553191489361702,"separated":0.028368794326241134,"divorced":0.13652482269503546},"obesity":0.37,"ll":[39.4411,-90.0233]},"62685":{"medHHIncome":63750,"eduShareBplus":0.20891364902506965,"eduShareGrad":0.05385329619312906,"eduShareAssoc":0.1522748375116063,"femIncome":{"zero":0.5529061102831595,"u75":0.34575260804769004,"b7599":0.013412816691505217,"p100":0.08792846497764531},"dist":{"p20":25531,"p40":47667,"p60":78389,"p80":132182,"p95":155188},"maleMedEarn":50043,"homeValue":116900,"grossRent":null,"ownerCostMortgage":1202,"pop":1648,"women":{"a18_24":122,"a25_29":2,"a30_34":36,"a35_39":5,"a40_49":99,"a50_64":244},"race":{"total":1648,"white":1389,"black":250,"asian":3,"native":0,"pacific":0,"other":1,"multi":5,"hispanic":1},"marital":{"neverMarried":0.18628912071535023,"separated":0.005961251862891207,"divorced":0.14754098360655737},"obesity":0.37,"ll":[39.1399,-89.9918]},"62801":{"medHHIncome":53740,"eduShareBplus":0.16097663355253952,"eduShareGrad":0.05365887785084651,"eduShareAssoc":0.10962641667832657,"femIncome":{"zero":0.4656894538850694,"u75":0.49150343754053705,"b7599":0.01971721364638734,"p100":0.023089894928006227},"dist":{"p20":22673,"p40":42605,"p60":68323,"p80":108489,"p95":166727},"maleMedEarn":41628,"homeValue":91100,"grossRent":785,"ownerCostMortgage":1200,"pop":19941,"women":{"a18_24":791,"a25_29":440,"a30_34":599,"a35_39":503,"a40_49":971,"a50_64":2088},"race":{"total":19941,"white":16485,"black":2141,"asian":234,"native":5,"pacific":0,"other":276,"multi":800,"hispanic":711},"marital":{"neverMarried":0.2759370602532941,"separated":0.019316873480875015,"divorced":0.1459639247793271},"obesity":0.402,"ll":[38.511,-89.1405]},"62803":{"medHHIncome":87500,"eduShareBplus":0.24561403508771928,"eduShareGrad":0.05263157894736842,"eduShareAssoc":0.32456140350877194,"femIncome":{"zero":0.2579185520361991,"u75":0.6832579185520362,"b7599":0.05656108597285068,"p100":0.0022624434389140274},"dist":{"p20":43143,"p40":74400,"p60":107737,"p80":109677,"p95":227781},"maleMedEarn":63750,"homeValue":132900,"grossRent":785,"ownerCostMortgage":1246,"pop":1138,"women":{"a18_24":75,"a25_29":26,"a30_34":23,"a35_39":67,"a40_49":29,"a50_64":132},"race":{"total":1138,"white":1085,"black":27,"asian":1,"native":2,"pacific":0,"other":20,"multi":3,"hispanic":30},"marital":{"neverMarried":0.28,"separated":0.035555555555555556,"divorced":0.10666666666666667},"obesity":0.368,"ll":[38.4533,-89.295]},"62807":{"medHHIncome":83750,"eduShareBplus":0.3090909090909091,"eduShareGrad":0.023140495867768594,"eduShareAssoc":0.1256198347107438,"femIncome":{"zero":0.32335329341317365,"u75":0.5239520958083832,"b7599":0.15269461077844312,"p100":0},"dist":{"p20":31889,"p40":72824,"p60":97875,"p80":131614,"p95":238864},"maleMedEarn":58429,"homeValue":150000,"grossRent":483,"ownerCostMortgage":1212,"pop":816,"women":{"a18_24":11,"a25_29":49,"a30_34":34,"a35_39":28,"a40_49":57,"a50_64":66},"race":{"total":816,"white":806,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":10,"hispanic":1},"marital":{"neverMarried":0.0658682634730539,"separated":0.029940119760479042,"divorced":0.19760479041916168},"obesity":0.395,"ll":[38.7516,-88.9292]},"62808":{"medHHIncome":67071,"eduShareBplus":0.24835526315789475,"eduShareGrad":0.06332236842105263,"eduShareAssoc":0.07483552631578948,"femIncome":{"zero":0.3929663608562691,"u75":0.45871559633027525,"b7599":0.12996941896024464,"p100":0.01834862385321101},"dist":{"p20":38888,"p40":57200,"p60":87375,"p80":132375,"p95":187375},"maleMedEarn":52885,"homeValue":140500,"grossRent":649,"ownerCostMortgage":1232,"pop":1819,"women":{"a18_24":46,"a25_29":27,"a30_34":47,"a35_39":96,"a40_49":132,"a50_64":135},"race":{"total":1819,"white":1735,"black":3,"asian":0,"native":0,"pacific":0,"other":5,"multi":76,"hispanic":15},"marital":{"neverMarried":0.19418960244648317,"separated":0,"divorced":0.21100917431192662},"obesity":0.39799999999999996,"ll":[38.3062,-89.1887]},"62830":{"medHHIncome":61296,"eduShareBplus":0.15210355987055016,"eduShareGrad":0.07874865156418555,"eduShareAssoc":0.22114347357065803,"femIncome":{"zero":0.4403846153846154,"u75":0.5096153846153846,"b7599":0.03076923076923077,"p100":0.019230769230769232},"dist":{"p20":19587,"p40":46382,"p60":77875,"p80":116583,"p95":166500},"maleMedEarn":48309,"homeValue":137300,"grossRent":475,"ownerCostMortgage":1177,"pop":1369,"women":{"a18_24":35,"a25_29":19,"a30_34":30,"a35_39":34,"a40_49":94,"a50_64":118},"race":{"total":1369,"white":1257,"black":10,"asian":11,"native":0,"pacific":0,"other":0,"multi":91,"hispanic":14},"marital":{"neverMarried":0.20373831775700935,"separated":0.022429906542056073,"divorced":0.21121495327102804},"obesity":0.39799999999999996,"ll":[38.4434,-88.9676]},"62831":{"medHHIncome":76250,"eduShareBplus":0.2265625,"eduShareGrad":0.078125,"eduShareAssoc":0.16796875,"femIncome":{"zero":0.3924050632911392,"u75":0.5316455696202531,"b7599":0.0759493670886076,"p100":0},"dist":{"p20":43292,"p40":71700,"p60":81469,"p80":117100,"p95":152444},"maleMedEarn":47500,"homeValue":131900,"grossRent":null,"ownerCostMortgage":1375,"pop":345,"women":{"a18_24":24,"a25_29":11,"a30_34":2,"a35_39":5,"a40_49":30,"a50_64":36},"race":{"total":345,"white":338,"black":1,"asian":0,"native":0,"pacific":0,"other":4,"multi":2,"hispanic":7},"marital":{"neverMarried":0.23493975903614459,"separated":0,"divorced":0.08433734939759036},"obesity":0.40700000000000003,"ll":[38.235,-89.2227]},"62832":{"medHHIncome":57324,"eduShareBplus":0.13063788659793815,"eduShareGrad":0.04461984536082474,"eduShareAssoc":0.12274484536082474,"femIncome":{"zero":0.49396297290045615,"u75":0.4848403541722565,"b7599":0.017708612825328682,"p100":0.00348806010195868},"dist":{"p20":22284,"p40":47009,"p60":69170,"p80":112420,"p95":169106},"maleMedEarn":41161,"homeValue":94600,"grossRent":716,"ownerCostMortgage":1105,"pop":8903,"women":{"a18_24":275,"a25_29":241,"a30_34":331,"a35_39":194,"a40_49":690,"a50_64":816},"race":{"total":8903,"white":7954,"black":497,"asian":35,"native":13,"pacific":0,"other":101,"multi":303,"hispanic":143},"marital":{"neverMarried":0.2207552152099287,"separated":0.01241087932400317,"divorced":0.1550039609189332},"obesity":0.39799999999999996,"ll":[38.0086,-89.2528]},"62848":{"medHHIncome":70556,"eduShareBplus":0.09718670076726342,"eduShareGrad":0.02557544757033248,"eduShareAssoc":0.1329923273657289,"femIncome":{"zero":0.45652173913043476,"u75":0.5173913043478261,"b7599":0.017391304347826087,"p100":0.008695652173913044},"dist":{"p20":27900,"p40":56286,"p60":83500,"p80":125889,"p95":147354},"maleMedEarn":58625,"homeValue":89500,"grossRent":811,"ownerCostMortgage":1089,"pop":587,"women":{"a18_24":32,"a25_29":34,"a30_34":14,"a35_39":16,"a40_49":13,"a50_64":65},"race":{"total":587,"white":480,"black":43,"asian":0,"native":0,"pacific":0,"other":2,"multi":62,"hispanic":53},"marital":{"neverMarried":0.16956521739130434,"separated":0,"divorced":0.1391304347826087},"obesity":0.368,"ll":[38.434,-89.1664]},"62853":{"medHHIncome":64750,"eduShareBplus":0.16211878009630817,"eduShareGrad":0.0738362760834671,"eduShareAssoc":0.18138041733547353,"femIncome":{"zero":0.4152542372881356,"u75":0.5677966101694916,"b7599":0,"p100":0.01694915254237288},"dist":{"p20":35979,"p40":51650,"p60":78722,"p80":105167,"p95":180063},"maleMedEarn":46680,"homeValue":79700,"grossRent":982,"ownerCostMortgage":1125,"pop":962,"women":{"a18_24":20,"a25_29":22,"a30_34":32,"a35_39":10,"a40_49":51,"a50_64":112},"race":{"total":962,"white":941,"black":1,"asian":5,"native":0,"pacific":0,"other":0,"multi":15,"hispanic":0},"marital":{"neverMarried":0.18232044198895028,"separated":0.03038674033149171,"divorced":0.06077348066298342},"obesity":0.395,"ll":[38.5161,-88.9122]},"62854":{"medHHIncome":60114,"eduShareBplus":0.11588785046728972,"eduShareGrad":0.026168224299065422,"eduShareAssoc":0.1233644859813084,"femIncome":{"zero":0.42454394693200664,"u75":0.538971807628524,"b7599":0.003316749585406302,"p100":0.03316749585406302},"dist":{"p20":18970,"p40":49467,"p60":62136,"p80":98250,"p95":151958},"maleMedEarn":29815,"homeValue":88900,"grossRent":615,"ownerCostMortgage":1114,"pop":1561,"women":{"a18_24":41,"a25_29":23,"a30_34":32,"a35_39":35,"a40_49":156,"a50_64":92},"race":{"total":1561,"white":1523,"black":0,"asian":1,"native":0,"pacific":0,"other":5,"multi":32,"hispanic":60},"marital":{"neverMarried":0.20094936708860758,"separated":0.03322784810126582,"divorced":0.15664556962025317},"obesity":0.415,"ll":[38.7645,-88.824]},"62864":{"medHHIncome":58082,"eduShareBplus":0.21081650353116094,"eduShareGrad":0.08065915004336513,"eduShareAssoc":0.1305290546400694,"femIncome":{"zero":0.4011148033015329,"u75":0.5487190481294887,"b7599":0.026155000535963126,"p100":0.02401114803301533},"dist":{"p20":25060,"p40":48343,"p60":72099,"p80":110787,"p95":194986},"maleMedEarn":44372,"homeValue":117600,"grossRent":882,"ownerCostMortgage":1283,"pop":23061,"women":{"a18_24":688,"a25_29":683,"a30_34":637,"a35_39":677,"a40_49":1456,"a50_64":2271},"race":{"total":23061,"white":19184,"black":1902,"asian":319,"native":16,"pacific":8,"other":155,"multi":1477,"hispanic":706},"marital":{"neverMarried":0.2400380509459888,"separated":0.02008244371630906,"divorced":0.15590318148187296},"obesity":0.39799999999999996,"ll":[38.3305,-88.9024]},"62870":{"medHHIncome":59188,"eduShareBplus":0.1332920024798512,"eduShareGrad":0.0365778053316801,"eduShareAssoc":0.10477371357718537,"femIncome":{"zero":0.40904311251314407,"u75":0.5425867507886435,"b7599":0.025236593059936908,"p100":0.023133543638275498},"dist":{"p20":31859,"p40":49119,"p60":72833,"p80":106342,"p95":173375},"maleMedEarn":45000,"homeValue":126600,"grossRent":857,"ownerCostMortgage":1240,"pop":2260,"women":{"a18_24":96,"a25_29":78,"a30_34":48,"a35_39":38,"a40_49":117,"a50_64":268},"race":{"total":2260,"white":2164,"black":6,"asian":3,"native":0,"pacific":0,"other":13,"multi":74,"hispanic":17},"marital":{"neverMarried":0.20545073375262055,"separated":0.04507337526205451,"divorced":0.09958071278825996},"obesity":0.395,"ll":[38.6352,-89.0531]},"62875":{"medHHIncome":70625,"eduShareBplus":0.15172413793103448,"eduShareGrad":0.06206896551724138,"eduShareAssoc":0.11724137931034483,"femIncome":{"zero":0.4195804195804196,"u75":0.5221445221445221,"b7599":0.04428904428904429,"p100":0.013986013986013986},"dist":{"p20":34214,"p40":59000,"p60":90740,"p80":121000,"p95":204083},"maleMedEarn":41776,"homeValue":103300,"grossRent":872,"ownerCostMortgage":1143,"pop":1091,"women":{"a18_24":33,"a25_29":25,"a30_34":33,"a35_39":25,"a40_49":73,"a50_64":94},"race":{"total":1091,"white":1044,"black":0,"asian":1,"native":5,"pacific":0,"other":4,"multi":37,"hispanic":34},"marital":{"neverMarried":0.19495412844036697,"separated":0.027522935779816515,"divorced":0.12614678899082568},"obesity":0.402,"ll":[38.7555,-89.1212]},"62876":{"medHHIncome":52708,"eduShareBplus":0.1111111111111111,"eduShareGrad":0.018518518518518517,"eduShareAssoc":0.19444444444444445,"femIncome":{"zero":0.32653061224489793,"u75":0.5714285714285714,"b7599":0.02040816326530612,"p100":0.08163265306122448},"dist":{"p20":20250,"p40":46750,"p60":64500,"p80":108500,"p95":142875},"maleMedEarn":33333,"homeValue":76700,"grossRent":900,"ownerCostMortgage":1000,"pop":135,"women":{"a18_24":5,"a25_29":1,"a30_34":3,"a35_39":3,"a40_49":7,"a50_64":18},"race":{"total":135,"white":134,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":1,"hispanic":2},"marital":{"neverMarried":0.22448979591836735,"separated":0,"divorced":0.10204081632653061},"obesity":0.368,"ll":[38.2771,-89.1948]},"62877":{"medHHIncome":74643,"eduShareBplus":0.27102803738317754,"eduShareGrad":0.04361370716510903,"eduShareAssoc":0.2367601246105919,"femIncome":{"zero":0.49710982658959535,"u75":0.48554913294797686,"b7599":0.017341040462427744,"p100":0},"dist":{"p20":37625,"p40":53700,"p60":92000,"p80":132417,"p95":157319},"maleMedEarn":39583,"homeValue":116100,"grossRent":738,"ownerCostMortgage":1225,"pop":446,"women":{"a18_24":3,"a25_29":5,"a30_34":21,"a35_39":6,"a40_49":28,"a50_64":36},"race":{"total":446,"white":437,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":9,"hispanic":0},"marital":{"neverMarried":0.10982658959537572,"separated":0,"divorced":0.09248554913294797},"obesity":0.39799999999999996,"ll":[38.3925,-89.1996]},"62880":{"medHHIncome":61250,"eduShareBplus":0.22958057395143489,"eduShareGrad":0.11920529801324503,"eduShareAssoc":0.09713024282560706,"femIncome":{"zero":0.3836734693877551,"u75":0.5265306122448979,"b7599":0.00816326530612245,"p100":0.08163265306122448},"dist":{"p20":28875,"p40":45200,"p60":72986,"p80":110750,"p95":250001},"maleMedEarn":32688,"homeValue":128400,"grossRent":800,"ownerCostMortgage":null,"pop":613,"women":{"a18_24":12,"a25_29":5,"a30_34":18,"a35_39":14,"a40_49":11,"a50_64":94},"race":{"total":613,"white":567,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":46,"hispanic":0},"marital":{"neverMarried":0.07723577235772358,"separated":0.12601626016260162,"divorced":0.08130081300813008},"obesity":0.39799999999999996,"ll":[38.8675,-88.8859]},"62881":{"medHHIncome":69025,"eduShareBplus":0.18064024390243902,"eduShareGrad":0.051321138211382115,"eduShareAssoc":0.1286839430894309,"femIncome":{"zero":0.36930455635491605,"u75":0.5857859167211685,"b7599":0.019838674514933506,"p100":0.025070852408981905},"dist":{"p20":25182,"p40":54013,"p60":79710,"p80":126143,"p95":236748},"maleMedEarn":47837,"homeValue":111500,"grossRent":750,"ownerCostMortgage":1196,"pop":11218,"women":{"a18_24":325,"a25_29":378,"a30_34":305,"a35_39":293,"a40_49":657,"a50_64":1154},"race":{"total":11218,"white":10415,"black":317,"asian":89,"native":1,"pacific":0,"other":148,"multi":248,"hispanic":20},"marital":{"neverMarried":0.212697041675664,"separated":0.0332541567695962,"divorced":0.12783416108831785},"obesity":0.395,"ll":[38.6386,-88.9273]},"62882":{"medHHIncome":53067,"eduShareBplus":0.08236057068741894,"eduShareGrad":0.035667963683527884,"eduShareAssoc":0.07133592736705577,"femIncome":{"zero":0.458006718924972,"u75":0.5184770436730123,"b7599":0.013437849944008958,"p100":0.010078387458006719},"dist":{"p20":22922,"p40":39981,"p60":57000,"p80":88757,"p95":152963},"maleMedEarn":43833,"homeValue":85800,"grossRent":652,"ownerCostMortgage":1105,"pop":2101,"women":{"a18_24":54,"a25_29":78,"a30_34":56,"a35_39":123,"a40_49":85,"a50_64":260},"race":{"total":2101,"white":1934,"black":19,"asian":18,"native":0,"pacific":0,"other":5,"multi":125,"hispanic":69},"marital":{"neverMarried":0.2671009771986971,"separated":0.03257328990228013,"divorced":0.18349619978284473},"obesity":0.402,"ll":[38.6363,-89.1186]},"62883":{"medHHIncome":112625,"eduShareBplus":0.2175,"eduShareGrad":0.12,"eduShareAssoc":0.245,"femIncome":{"zero":0.38961038961038963,"u75":0.43722943722943725,"b7599":0.11688311688311688,"p100":0.05627705627705628},"dist":{"p20":60750,"p40":88400,"p60":128425,"p80":186750,"p95":250001},"maleMedEarn":65208,"homeValue":143800,"grossRent":null,"ownerCostMortgage":1307,"pop":599,"women":{"a18_24":23,"a25_29":0,"a30_34":8,"a35_39":57,"a40_49":31,"a50_64":41},"race":{"total":599,"white":585,"black":14,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.22077922077922077,"separated":0,"divorced":0.03463203463203463},"obesity":0.41600000000000004,"ll":[38.168,-89.1047]},"62884":{"medHHIncome":57386,"eduShareBplus":0.161834475487612,"eduShareGrad":0.04428044280442804,"eduShareAssoc":0.11808118081180811,"femIncome":{"zero":0.3718723037100949,"u75":0.5823986194995686,"b7599":0.014667817083692839,"p100":0.031061259706643658},"dist":{"p20":27917,"p40":50482,"p60":79722,"p80":122014,"p95":198646},"maleMedEarn":46146,"homeValue":93800,"grossRent":702,"ownerCostMortgage":1136,"pop":2764,"women":{"a18_24":112,"a25_29":108,"a30_34":86,"a35_39":84,"a40_49":150,"a50_64":326},"race":{"total":2764,"white":2657,"black":0,"asian":62,"native":0,"pacific":0,"other":0,"multi":45,"hispanic":57},"marital":{"neverMarried":0.16924398625429554,"separated":0,"divorced":0.20532646048109965},"obesity":0.41600000000000004,"ll":[38.0853,-89.0423]},"62885":{"medHHIncome":58239,"eduShareBplus":0.052941176470588235,"eduShareGrad":0,"eduShareAssoc":0.17647058823529413,"femIncome":{"zero":0.43670886075949367,"u75":0.5379746835443038,"b7599":0.02531645569620253,"p100":0},"dist":{"p20":24750,"p40":50975,"p60":62625,"p80":100971,"p95":131375},"maleMedEarn":72875,"homeValue":89200,"grossRent":null,"ownerCostMortgage":1113,"pop":458,"women":{"a18_24":0,"a25_29":20,"a30_34":38,"a35_39":6,"a40_49":6,"a50_64":41},"race":{"total":458,"white":397,"black":22,"asian":0,"native":0,"pacific":0,"other":0,"multi":39,"hispanic":0},"marital":{"neverMarried":0.16455696202531644,"separated":0,"divorced":0},"obesity":0.39799999999999996,"ll":[38.8605,-89.0646]},"62888":{"medHHIncome":69231,"eduShareBplus":0.10403726708074534,"eduShareGrad":0.02406832298136646,"eduShareAssoc":0.18400621118012422,"femIncome":{"zero":0.34358288770053474,"u75":0.6082887700534759,"b7599":0.03208556149732621,"p100":0.016042780748663103},"dist":{"p20":37553,"p40":54944,"p60":85167,"p80":116893,"p95":204000},"maleMedEarn":41500,"homeValue":116400,"grossRent":792,"ownerCostMortgage":1353,"pop":1881,"women":{"a18_24":80,"a25_29":35,"a30_34":36,"a35_39":52,"a40_49":127,"a50_64":204},"race":{"total":1881,"white":1828,"black":0,"asian":0,"native":2,"pacific":0,"other":0,"multi":51,"hispanic":1},"marital":{"neverMarried":0.20053120849933598,"separated":0,"divorced":0.17397078353253653},"obesity":0.40700000000000003,"ll":[38.1275,-89.229]},"62889":{"medHHIncome":68077,"eduShareBplus":0.13157894736842105,"eduShareGrad":0.04986149584487535,"eduShareAssoc":0.22160664819944598,"femIncome":{"zero":0.5882352941176471,"u75":0.38588235294117645,"b7599":0.021176470588235293,"p100":0.004705882352941176},"dist":{"p20":19632,"p40":49314,"p60":72000,"p80":99938,"p95":141375},"maleMedEarn":26576,"homeValue":147500,"grossRent":null,"ownerCostMortgage":1552,"pop":1053,"women":{"a18_24":33,"a25_29":25,"a30_34":12,"a35_39":9,"a40_49":48,"a50_64":123},"race":{"total":1053,"white":865,"black":57,"asian":7,"native":0,"pacific":0,"other":23,"multi":101,"hispanic":0},"marital":{"neverMarried":0.21212121212121213,"separated":0,"divorced":0.046620046620046623},"obesity":0.39799999999999996,"ll":[38.4565,-88.8236]},"62892":{"medHHIncome":55625,"eduShareBplus":0.10204081632653061,"eduShareGrad":0.027210884353741496,"eduShareAssoc":0.08163265306122448,"femIncome":{"zero":0.3888888888888889,"u75":0.6111111111111112,"b7599":0,"p100":0},"dist":{"p20":10000,"p40":43750,"p60":75000,"p80":99375,"p95":144375},"maleMedEarn":61563,"homeValue":95000,"grossRent":625,"ownerCostMortgage":1354,"pop":189,"women":{"a18_24":5,"a25_29":3,"a30_34":3,"a35_39":2,"a40_49":10,"a50_64":19},"race":{"total":189,"white":186,"black":0,"asian":2,"native":0,"pacific":0,"other":0,"multi":1,"hispanic":0},"marital":{"neverMarried":0.2222222222222222,"separated":0,"divorced":0.1527777777777778},"obesity":0.39799999999999996,"ll":[38.8086,-89.0757]},"62893":{"medHHIncome":72115,"eduShareBplus":0.22953216374269006,"eduShareGrad":0.04239766081871345,"eduShareAssoc":0.1111111111111111,"femIncome":{"zero":0.3958333333333333,"u75":0.5755208333333334,"b7599":0.005208333333333333,"p100":0.0234375},"dist":{"p20":44786,"p40":52490,"p60":88500,"p80":136619,"p95":170583},"maleMedEarn":44318,"homeValue":138100,"grossRent":890,"ownerCostMortgage":1183,"pop":922,"women":{"a18_24":3,"a25_29":49,"a30_34":25,"a35_39":20,"a40_49":36,"a50_64":104},"race":{"total":922,"white":864,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":58,"hispanic":13},"marital":{"neverMarried":0.28940568475452194,"separated":0.012919896640826873,"divorced":0.025839793281653745},"obesity":0.39799999999999996,"ll":[38.4658,-89.0302]},"62894":{"medHHIncome":80284,"eduShareBplus":0.2292358803986711,"eduShareGrad":0.09800664451827243,"eduShareAssoc":0.1644518272425249,"femIncome":{"zero":0.37388724035608306,"u75":0.543026706231454,"b7599":0.01483679525222552,"p100":0.06824925816023739},"dist":{"p20":28750,"p40":63125,"p60":89000,"p80":118750,"p95":215559},"maleMedEarn":49875,"homeValue":106900,"grossRent":656,"ownerCostMortgage":1322,"pop":814,"women":{"a18_24":35,"a25_29":9,"a30_34":27,"a35_39":18,"a40_49":59,"a50_64":109},"race":{"total":814,"white":781,"black":17,"asian":0,"native":1,"pacific":0,"other":2,"multi":13,"hispanic":4},"marital":{"neverMarried":0.1783625730994152,"separated":0,"divorced":0.13157894736842105},"obesity":0.39799999999999996,"ll":[38.2095,-89.0396]},"62898":{"medHHIncome":74297,"eduShareBplus":0.24981357196122297,"eduShareGrad":0.07755406413124534,"eduShareAssoc":0.1401938851603281,"femIncome":{"zero":0.3486005089058524,"u75":0.5139949109414759,"b7599":0.06361323155216285,"p100":0.0737913486005089},"dist":{"p20":41946,"p40":63800,"p60":91356,"p80":132179,"p95":185723},"maleMedEarn":50469,"homeValue":150000,"grossRent":906,"ownerCostMortgage":1536,"pop":2018,"women":{"a18_24":89,"a25_29":50,"a30_34":94,"a35_39":59,"a40_49":90,"a50_64":171},"race":{"total":2018,"white":1806,"black":17,"asian":7,"native":3,"pacific":0,"other":9,"multi":176,"hispanic":49},"marital":{"neverMarried":0.2644110275689223,"separated":0.007518796992481203,"divorced":0.12907268170426064},"obesity":0.39799999999999996,"ll":[38.3504,-89.0602]},"62907":{"medHHIncome":73300,"eduShareBplus":0.18568994889267462,"eduShareGrad":0.05110732538330494,"eduShareAssoc":0.08517887563884156,"femIncome":{"zero":0.5856950067476383,"u75":0.3562753036437247,"b7599":0.03643724696356275,"p100":0.021592442645074223},"dist":{"p20":35530,"p40":62750,"p60":87433,"p80":141300,"p95":181523},"maleMedEarn":55769,"homeValue":179400,"grossRent":703,"ownerCostMortgage":1619,"pop":1912,"women":{"a18_24":84,"a25_29":33,"a30_34":68,"a35_39":10,"a40_49":154,"a50_64":111},"race":{"total":1912,"white":1889,"black":3,"asian":0,"native":3,"pacific":0,"other":2,"multi":15,"hispanic":13},"marital":{"neverMarried":0.23859191655801826,"separated":0.002607561929595828,"divorced":0.06910039113428944},"obesity":0.39799999999999996,"ll":[37.8632,-89.4957]},"62916":{"medHHIncome":67969,"eduShareBplus":0.25,"eduShareGrad":0.08928571428571429,"eduShareAssoc":0.1130952380952381,"femIncome":{"zero":0.5283582089552239,"u75":0.43283582089552236,"b7599":0.01791044776119403,"p100":0.020895522388059702},"dist":{"p20":36688,"p40":55450,"p60":88111,"p80":168222,"p95":250001},"maleMedEarn":54861,"homeValue":116800,"grossRent":675,"ownerCostMortgage":1370,"pop":790,"women":{"a18_24":65,"a25_29":9,"a30_34":15,"a35_39":16,"a40_49":34,"a50_64":86},"race":{"total":790,"white":770,"black":1,"asian":0,"native":1,"pacific":0,"other":0,"multi":18,"hispanic":4},"marital":{"neverMarried":0.2746268656716418,"separated":0,"divorced":0.04477611940298507},"obesity":0.39799999999999996,"ll":[37.9433,-89.5788]},"62927":{"medHHIncome":51125,"eduShareBplus":0.06787330316742081,"eduShareGrad":0.03167420814479638,"eduShareAssoc":0.08144796380090498,"femIncome":{"zero":0.4864864864864865,"u75":0.4774774774774775,"b7599":0.036036036036036036,"p100":0},"dist":{"p20":21200,"p40":41500,"p60":62000,"p80":81300,"p95":124646},"maleMedEarn":45536,"homeValue":43600,"grossRent":null,"ownerCostMortgage":936,"pop":313,"women":{"a18_24":8,"a25_29":8,"a30_34":12,"a35_39":2,"a40_49":13,"a50_64":40},"race":{"total":313,"white":305,"black":2,"asian":0,"native":0,"pacific":0,"other":3,"multi":3,"hispanic":3},"marital":{"neverMarried":0.10619469026548672,"separated":0.04424778761061947,"divorced":0.07964601769911504},"obesity":0.39799999999999996,"ll":[37.9435,-89.252]},"62994":{"medHHIncome":62500,"eduShareBplus":0.08704453441295547,"eduShareGrad":0.06275303643724696,"eduShareAssoc":0.12955465587044535,"femIncome":{"zero":0.4470198675496689,"u75":0.4867549668874172,"b7599":0.019867549668874173,"p100":0.046357615894039736},"dist":{"p20":29725,"p40":55190,"p60":69810,"p80":111100,"p95":143650},"maleMedEarn":41923,"homeValue":111600,"grossRent":950,"ownerCostMortgage":1235,"pop":752,"women":{"a18_24":27,"a25_29":33,"a30_34":26,"a35_39":0,"a40_49":56,"a50_64":96},"race":{"total":752,"white":692,"black":0,"asian":2,"native":0,"pacific":0,"other":13,"multi":45,"hispanic":22},"marital":{"neverMarried":0.1357615894039735,"separated":0,"divorced":0.18543046357615894},"obesity":0.39799999999999996,"ll":[37.9063,-89.3474]},"62997":{"medHHIncome":59792,"eduShareBplus":0.055401662049861494,"eduShareGrad":0.008310249307479225,"eduShareAssoc":0.12188365650969529,"femIncome":{"zero":0.29333333333333333,"u75":0.7066666666666667,"b7599":0,"p100":0},"dist":{"p20":29353,"p40":51107,"p60":64800,"p80":111679,"p95":178025},"maleMedEarn":47500,"homeValue":66500,"grossRent":815,"ownerCostMortgage":1000,"pop":562,"women":{"a18_24":26,"a25_29":32,"a30_34":25,"a35_39":6,"a40_49":45,"a50_64":36},"race":{"total":562,"white":484,"black":4,"asian":1,"native":0,"pacific":0,"other":50,"multi":23,"hispanic":60},"marital":{"neverMarried":0.24786324786324787,"separated":0.004273504273504274,"divorced":0.1794871794871795},"obesity":0.40700000000000003,"ll":[37.9836,-89.5905]},"63005":{"medHHIncome":202232,"eduShareBplus":0.81012005597702,"eduShareGrad":0.38403181851660895,"eduShareAssoc":0.030934668925388525,"femIncome":{"zero":0.395698367452708,"u75":0.3154962425498834,"b7599":0.07786991448561803,"p100":0.21093547551179062},"dist":{"p20":103200,"p40":169167,"p60":249051,"p80":250001,"p95":250001},"maleMedEarn":135625,"homeValue":671300,"grossRent":1570,"ownerCostMortgage":3234,"pop":19679,"women":{"a18_24":621,"a25_29":157,"a30_34":358,"a35_39":560,"a40_49":1516,"a50_64":2478},"race":{"total":19679,"white":14739,"black":311,"asian":2440,"native":29,"pacific":0,"other":251,"multi":1909,"hispanic":807},"marital":{"neverMarried":0.1687539531941809,"separated":0.0030360531309297912,"divorced":0.035800126502213786},"obesity":0.396,"ll":[38.6442,-90.6514]},"63010":{"medHHIncome":76839,"eduShareBplus":0.23410116172302287,"eduShareGrad":0.07317657391512636,"eduShareAssoc":0.1231186873727494,"femIncome":{"zero":0.3524001950811677,"u75":0.574583710722497,"b7599":0.038876889848812095,"p100":0.03413920434752317},"dist":{"p20":35784,"p40":62694,"p60":93550,"p80":130082,"p95":201590},"maleMedEarn":53314,"homeValue":214100,"grossRent":1074,"ownerCostMortgage":1458,"pop":34405,"women":{"a18_24":986,"a25_29":1466,"a30_34":1231,"a35_39":1116,"a40_49":1946,"a50_64":3643},"race":{"total":34405,"white":31452,"black":261,"asian":395,"native":22,"pacific":8,"other":105,"multi":2162,"hispanic":754},"marital":{"neverMarried":0.2611955699250189,"separated":0.014858636582513586,"divorced":0.1306321799545986},"obesity":0.40299999999999997,"ll":[38.4304,-90.3921]},"63011":{"medHHIncome":121941,"eduShareBplus":0.6640181611804767,"eduShareGrad":0.2571529218364711,"eduShareAssoc":0.05737993659243023,"femIncome":{"zero":0.3366283370318069,"u75":0.43850447179073365,"b7599":0.07793692421491494,"p100":0.14693026696254455},"dist":{"p20":50308,"p40":97824,"p60":149409,"p80":220891,"p95":250001},"maleMedEarn":80503,"homeValue":373600,"grossRent":1624,"ownerCostMortgage":2129,"pop":36274,"women":{"a18_24":994,"a25_29":556,"a30_34":1200,"a35_39":1084,"a40_49":2141,"a50_64":3966},"race":{"total":36274,"white":29172,"black":866,"asian":2734,"native":20,"pacific":0,"other":545,"multi":2937,"hispanic":1738},"marital":{"neverMarried":0.18535377200615838,"separated":0.006426132940625209,"divorced":0.09284423321507464},"obesity":0.313,"ll":[38.6052,-90.5577]},"63012":{"medHHIncome":99860,"eduShareBplus":0.2540827436037017,"eduShareGrad":0.0783886771910724,"eduShareAssoc":0.19923788786064237,"femIncome":{"zero":0.24875621890547264,"u75":0.6078697421981004,"b7599":0.09203980099502487,"p100":0.05133423790140208},"dist":{"p20":56076,"p40":88601,"p60":113469,"p80":161152,"p95":250001},"maleMedEarn":59611,"homeValue":228500,"grossRent":1332,"ownerCostMortgage":1510,"pop":10977,"women":{"a18_24":592,"a25_29":367,"a30_34":442,"a35_39":416,"a40_49":761,"a50_64":1069},"race":{"total":10977,"white":10010,"black":21,"asian":35,"native":4,"pacific":19,"other":0,"multi":888,"hispanic":307},"marital":{"neverMarried":0.2989759572573464,"separated":0.007346393588601959,"divorced":0.09817453250222619},"obesity":0.40299999999999997,"ll":[38.3474,-90.4535]},"63015":{"medHHIncome":73807,"eduShareBplus":0.22172808132147395,"eduShareGrad":0.0698856416772554,"eduShareAssoc":0.06925031766200762,"femIncome":{"zero":0.2612330198537095,"u75":0.7126436781609196,"b7599":0.01044932079414838,"p100":0.01567398119122257},"dist":{"p20":53237,"p40":58993,"p60":94889,"p80":120500,"p95":194932},"maleMedEarn":38563,"homeValue":211000,"grossRent":778,"ownerCostMortgage":1435,"pop":1959,"women":{"a18_24":108,"a25_29":108,"a30_34":0,"a35_39":54,"a40_49":10,"a50_64":452},"race":{"total":1959,"white":1748,"black":7,"asian":10,"native":0,"pacific":0,"other":28,"multi":166,"hispanic":0},"marital":{"neverMarried":0.21525600835945663,"separated":0,"divorced":0.15151515151515152},"obesity":0.396,"ll":[38.3959,-90.752]},"63016":{"medHHIncome":79444,"eduShareBplus":0.18879798615481436,"eduShareGrad":0.0631424375917768,"eduShareAssoc":0.09439899307740718,"femIncome":{"zero":0.3803863298662704,"u75":0.513001485884101,"b7599":0.0713224368499257,"p100":0.03528974739970282},"dist":{"p20":42620,"p40":65230,"p60":95962,"p80":146282,"p95":202788},"maleMedEarn":64609,"homeValue":206800,"grossRent":1260,"ownerCostMortgage":1514,"pop":6291,"women":{"a18_24":317,"a25_29":152,"a30_34":219,"a35_39":95,"a40_49":476,"a50_64":818},"race":{"total":6291,"white":5885,"black":0,"asian":23,"native":15,"pacific":0,"other":0,"multi":368,"hispanic":38},"marital":{"neverMarried":0.24658545588778147,"separated":0.009228497600590625,"divorced":0.10335917312661498},"obesity":0.40299999999999997,"ll":[38.3566,-90.651]},"63017":{"medHHIncome":128750,"eduShareBplus":0.7006295247088449,"eduShareGrad":0.35775889203651245,"eduShareAssoc":0.050173119294932324,"femIncome":{"zero":0.4633674018289403,"u75":0.32996234534696073,"b7599":0.0729424421732114,"p100":0.13372781065088757},"dist":{"p20":58625,"p40":107388,"p60":157807,"p80":250001,"p95":250001},"maleMedEarn":102632,"homeValue":452000,"grossRent":1632,"ownerCostMortgage":2458,"pop":43074,"women":{"a18_24":1013,"a25_29":927,"a30_34":993,"a35_39":1242,"a40_49":2608,"a50_64":4383},"race":{"total":43074,"white":32509,"black":1564,"asian":5717,"native":25,"pacific":0,"other":237,"multi":3022,"hispanic":1139},"marital":{"neverMarried":0.18342029602811202,"separated":0.0026088808433606643,"divorced":0.09727398573101906},"obesity":0.313,"ll":[38.6563,-90.5419]},"63019":{"medHHIncome":64700,"eduShareBplus":0.15615615615615616,"eduShareGrad":0.052719386052719384,"eduShareAssoc":0.19285952619285954,"femIncome":{"zero":0.3323442136498516,"u75":0.592482690405539,"b7599":0.027200791295746787,"p100":0.04797230464886251},"dist":{"p20":32234,"p40":49872,"p60":80763,"p80":127000,"p95":200170},"maleMedEarn":51250,"homeValue":170000,"grossRent":887,"ownerCostMortgage":1318,"pop":4490,"women":{"a18_24":339,"a25_29":67,"a30_34":138,"a35_39":130,"a40_49":291,"a50_64":584},"race":{"total":4490,"white":3846,"black":197,"asian":35,"native":14,"pacific":0,"other":0,"multi":398,"hispanic":0},"marital":{"neverMarried":0.3293153326904532,"separated":0.03857280617164899,"divorced":0.1133076181292189},"obesity":0.40299999999999997,"ll":[38.2313,-90.375]},"63020":{"medHHIncome":65908,"eduShareBplus":0.1395885810243493,"eduShareGrad":0.04904841869577386,"eduShareAssoc":0.10026588301147495,"femIncome":{"zero":0.379281537176274,"u75":0.5597326649958229,"b7599":0.03795202291442893,"p100":0.02303377491347416},"dist":{"p20":31938,"p40":52664,"p60":79772,"p80":118701,"p95":167456},"maleMedEarn":55233,"homeValue":172600,"grossRent":872,"ownerCostMortgage":1329,"pop":20357,"women":{"a18_24":650,"a25_29":450,"a30_34":440,"a35_39":933,"a40_49":975,"a50_64":2524},"race":{"total":20357,"white":18208,"black":16,"asian":45,"native":12,"pacific":0,"other":74,"multi":2002,"hispanic":285},"marital":{"neverMarried":0.22833450128474655,"separated":0.009577201588413922,"divorced":0.1584910067741182},"obesity":0.40299999999999997,"ll":[38.1072,-90.5716]},"63021":{"medHHIncome":113822,"eduShareBplus":0.6208236010967807,"eduShareGrad":0.24164720219356148,"eduShareAssoc":0.06913273078094852,"femIncome":{"zero":0.335586838389457,"u75":0.48166531171109495,"b7599":0.0722690513884729,"p100":0.11047879851097514},"dist":{"p20":51771,"p40":89157,"p60":133181,"p80":194849,"p95":250001},"maleMedEarn":72488,"homeValue":324300,"grossRent":1362,"ownerCostMortgage":1909,"pop":56297,"women":{"a18_24":1992,"a25_29":1606,"a30_34":1921,"a35_39":1920,"a40_49":4010,"a50_64":5502},"race":{"total":56297,"white":43633,"black":1428,"asian":5577,"native":77,"pacific":14,"other":482,"multi":5086,"hispanic":2917},"marital":{"neverMarried":0.23813109131216798,"separated":0.00999707198728406,"divorced":0.11289580457606559},"obesity":0.313,"ll":[38.5698,-90.5457]},"63023":{"medHHIncome":73988,"eduShareBplus":0.18072289156626506,"eduShareGrad":0.06705081194342588,"eduShareAssoc":0.18334206390780514,"femIncome":{"zero":0.5138236828377674,"u75":0.4647887323943662,"b7599":0.015127803860198226,"p100":0.006259780907668232},"dist":{"p20":39564,"p40":63538,"p60":82054,"p80":125438,"p95":211758},"maleMedEarn":50829,"homeValue":220200,"grossRent":1054,"ownerCostMortgage":1439,"pop":5442,"women":{"a18_24":60,"a25_29":260,"a30_34":106,"a35_39":150,"a40_49":338,"a50_64":545},"race":{"total":5442,"white":5176,"black":0,"asian":15,"native":0,"pacific":0,"other":9,"multi":242,"hispanic":35},"marital":{"neverMarried":0.24031777557100298,"separated":0.009433962264150943,"divorced":0.10079443892750745},"obesity":0.40299999999999997,"ll":[38.2686,-90.6988]},"63025":{"medHHIncome":134266,"eduShareBplus":0.5033578768508779,"eduShareGrad":0.1878792782587588,"eduShareAssoc":0.09272594870135124,"femIncome":{"zero":0.3557876158258567,"u75":0.40300044124135903,"b7599":0.12384174143256362,"p100":0.11737020150022062},"dist":{"p20":60173,"p40":105392,"p60":144036,"p80":205261,"p95":250001},"maleMedEarn":79034,"homeValue":363900,"grossRent":1195,"ownerCostMortgage":2166,"pop":18483,"women":{"a18_24":321,"a25_29":440,"a30_34":633,"a35_39":805,"a40_49":1250,"a50_64":1690},"race":{"total":18483,"white":16147,"black":49,"asian":466,"native":1,"pacific":0,"other":395,"multi":1425,"hispanic":790},"marital":{"neverMarried":0.1718839747271683,"separated":0,"divorced":0.10927627800114877},"obesity":0.40299999999999997,"ll":[38.4909,-90.6157]},"63026":{"medHHIncome":96145,"eduShareBplus":0.4035956646190461,"eduShareGrad":0.13974206413019008,"eduShareAssoc":0.09243238027851929,"femIncome":{"zero":0.3210415655830503,"u75":0.5252574262763491,"b7599":0.07552967814976548,"p100":0.07817132999083509},"dist":{"p20":45576,"p40":78041,"p60":115390,"p80":166649,"p95":250001},"maleMedEarn":60788,"homeValue":281900,"grossRent":1091,"ownerCostMortgage":1835,"pop":45267,"women":{"a18_24":1793,"a25_29":1123,"a30_34":1386,"a35_39":1531,"a40_49":2722,"a50_64":4946},"race":{"total":45267,"white":39893,"black":666,"asian":849,"native":35,"pacific":8,"other":273,"multi":3543,"hispanic":1403},"marital":{"neverMarried":0.25332058229731164,"separated":0.026670917012007224,"divorced":0.1058867282966741},"obesity":0.40299999999999997,"ll":[38.5027,-90.4589]},"63028":{"medHHIncome":76468,"eduShareBplus":0.24424605222417173,"eduShareGrad":0.08065847868717102,"eduShareAssoc":0.12968314583548354,"femIncome":{"zero":0.3719602063375092,"u75":0.5069086219602064,"b7599":0.06567796610169492,"p100":0.055453205600589535},"dist":{"p20":35159,"p40":61525,"p60":90853,"p80":138671,"p95":230590},"maleMedEarn":58049,"homeValue":221600,"grossRent":937,"ownerCostMortgage":1489,"pop":27913,"women":{"a18_24":781,"a25_29":735,"a30_34":1078,"a35_39":1083,"a40_49":1747,"a50_64":2898},"race":{"total":27913,"white":25103,"black":549,"asian":375,"native":21,"pacific":0,"other":189,"multi":1676,"hispanic":622},"marital":{"neverMarried":0.20895791945096623,"separated":0.020859671302149177,"divorced":0.14114141231713925},"obesity":0.40299999999999997,"ll":[38.1429,-90.3921]},"63030":{"medHHIncome":58917,"eduShareBplus":0.13,"eduShareGrad":0.065,"eduShareAssoc":0.025,"femIncome":{"zero":0.42452830188679247,"u75":0.5283018867924528,"b7599":0,"p100":0.04716981132075472},"dist":{"p20":34975,"p40":57167,"p60":71571,"p80":160100,"p95":238638},"maleMedEarn":42663,"homeValue":191900,"grossRent":null,"ownerCostMortgage":2100,"pop":364,"women":{"a18_24":17,"a25_29":0,"a30_34":18,"a35_39":10,"a40_49":40,"a50_64":19},"race":{"total":364,"white":363,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":1,"hispanic":0},"marital":{"neverMarried":0.330188679245283,"separated":0,"divorced":0},"obesity":0.40299999999999997,"ll":[38.1432,-90.7522]},"63031":{"medHHIncome":71783,"eduShareBplus":0.27963981990995496,"eduShareGrad":0.08292381484860077,"eduShareAssoc":0.10881911544007297,"femIncome":{"zero":0.33539785352938395,"u75":0.5484847052148835,"b7599":0.07271523805021039,"p100":0.0434022032055222},"dist":{"p20":35990,"p40":59855,"p60":87075,"p80":127982,"p95":193316},"maleMedEarn":47574,"homeValue":144500,"grossRent":1351,"ownerCostMortgage":1261,"pop":50258,"women":{"a18_24":1948,"a25_29":1619,"a30_34":1823,"a35_39":1807,"a40_49":3562,"a50_64":5288},"race":{"total":50258,"white":24964,"black":20895,"asian":314,"native":11,"pacific":8,"other":557,"multi":3509,"hispanic":1245},"marital":{"neverMarried":0.34505402384500744,"separated":0.02836251862891207,"divorced":0.1631892697466468},"obesity":0.313,"ll":[38.812,-90.3536]},"63033":{"medHHIncome":63979,"eduShareBplus":0.2816971242385607,"eduShareGrad":0.1209803088256127,"eduShareAssoc":0.1174387306983992,"femIncome":{"zero":0.3169831795984807,"u75":0.5702658708627238,"b7599":0.06961475854584916,"p100":0.043136190992946286},"dist":{"p20":31333,"p40":53303,"p60":79337,"p80":111184,"p95":171486},"maleMedEarn":40307,"homeValue":157400,"grossRent":1150,"ownerCostMortgage":1380,"pop":42258,"women":{"a18_24":1693,"a25_29":1921,"a30_34":1778,"a35_39":1408,"a40_49":2731,"a50_64":4047},"race":{"total":42258,"white":9585,"black":29990,"asian":245,"native":9,"pacific":0,"other":541,"multi":1888,"hispanic":475},"marital":{"neverMarried":0.39185340426675264,"separated":0.036863883067333014,"divorced":0.1473480573915847},"obesity":0.313,"ll":[38.7984,-90.2742]},"63034":{"medHHIncome":110491,"eduShareBplus":0.39874523506988563,"eduShareGrad":0.2107687420584498,"eduShareAssoc":0.10800508259212198,"femIncome":{"zero":0.31352057478772044,"u75":0.48491182233834096,"b7599":0.08922273024167211,"p100":0.11234487263226649},"dist":{"p20":61810,"p40":92432,"p60":119087,"p80":164274,"p95":250001},"maleMedEarn":55938,"homeValue":234200,"grossRent":1728,"ownerCostMortgage":1870,"pop":19557,"women":{"a18_24":546,"a25_29":421,"a30_34":340,"a35_39":515,"a40_49":1333,"a50_64":2349},"race":{"total":19557,"white":4217,"black":12762,"asian":276,"native":0,"pacific":5,"other":120,"multi":2177,"hispanic":879},"marital":{"neverMarried":0.2601355672080829,"separated":0.036193886686277016,"divorced":0.10653536257833482},"obesity":0.313,"ll":[38.8454,-90.2885]},"63036":{"medHHIncome":65901,"eduShareBplus":0.16100872938894278,"eduShareGrad":0.058195926285160036,"eduShareAssoc":0.08147429679922405,"femIncome":{"zero":0.648014440433213,"u75":0.30685920577617326,"b7599":0,"p100":0.04512635379061372},"dist":{"p20":28639,"p40":56426,"p60":84050,"p80":136682,"p95":250001},"maleMedEarn":41528,"homeValue":211300,"grossRent":null,"ownerCostMortgage":1600,"pop":1121,"women":{"a18_24":6,"a25_29":96,"a30_34":0,"a35_39":26,"a40_49":31,"a50_64":195},"race":{"total":1121,"white":1051,"black":0,"asian":0,"native":0,"pacific":0,"other":33,"multi":37,"hispanic":0},"marital":{"neverMarried":0.06498194945848375,"separated":0.03429602888086643,"divorced":0.0776173285198556},"obesity":0.37200000000000005,"ll":[37.9763,-90.3721]},"63038":{"medHHIncome":187906,"eduShareBplus":0.638648363252376,"eduShareGrad":0.2768743400211193,"eduShareAssoc":0.048996832101372755,"femIncome":{"zero":0.42017781213761113,"u75":0.39157325086973327,"b7599":0.0467723231542327,"p100":0.1414766138384229},"dist":{"p20":86680,"p40":137654,"p60":207200,"p80":250001,"p95":250001},"maleMedEarn":101905,"homeValue":537800,"grossRent":2153,"ownerCostMortgage":2898,"pop":7132,"women":{"a18_24":176,"a25_29":92,"a30_34":41,"a35_39":222,"a40_49":424,"a50_64":773},"race":{"total":7132,"white":6464,"black":70,"asian":263,"native":0,"pacific":0,"other":80,"multi":255,"hispanic":155},"marital":{"neverMarried":0.19932810750279956,"separated":0,"divorced":0.05711086226203808},"obesity":0.313,"ll":[38.5771,-90.6678]},"63039":{"medHHIncome":71094,"eduShareBplus":0.12937062937062938,"eduShareGrad":0.06818181818181818,"eduShareAssoc":0.10664335664335664,"femIncome":{"zero":0.35611510791366907,"u75":0.6330935251798561,"b7599":0,"p100":0.01079136690647482},"dist":{"p20":42235,"p40":55733,"p60":73330,"p80":99350,"p95":151238},"maleMedEarn":41971,"homeValue":138200,"grossRent":null,"ownerCostMortgage":1184,"pop":977,"women":{"a18_24":21,"a25_29":21,"a30_34":82,"a35_39":6,"a40_49":73,"a50_64":1},"race":{"total":977,"white":699,"black":42,"asian":0,"native":0,"pacific":0,"other":0,"multi":236,"hispanic":0},"marital":{"neverMarried":0.21951219512195122,"separated":0,"divorced":0.17770034843205576},"obesity":0.396,"ll":[38.4917,-90.8437]},"63040":{"medHHIncome":130139,"eduShareBplus":0.6374200067362749,"eduShareGrad":0.2547995958235096,"eduShareAssoc":0.07780397440215561,"femIncome":{"zero":0.3555869872701556,"u75":0.4243281471004243,"b7599":0.10551626591230552,"p100":0.11456859971711457},"dist":{"p20":62593,"p40":110804,"p60":160435,"p80":224375,"p95":250001},"maleMedEarn":83702,"homeValue":408800,"grossRent":1504,"ownerCostMortgage":2236,"pop":8826,"women":{"a18_24":374,"a25_29":148,"a30_34":77,"a35_39":354,"a40_49":596,"a50_64":1074},"race":{"total":8826,"white":7065,"black":30,"asian":469,"native":19,"pacific":0,"other":100,"multi":1143,"hispanic":647},"marital":{"neverMarried":0.23834339001645638,"separated":0.007405375754251234,"divorced":0.09709270433351619},"obesity":0.313,"ll":[38.5737,-90.6344]},"63041":{"medHHIncome":69545,"eduShareBplus":0.17869415807560138,"eduShareGrad":0.07560137457044673,"eduShareAssoc":0.044673539518900345,"femIncome":{"zero":0.16541353383458646,"u75":0.8345864661654135,"b7599":0,"p100":0},"dist":{"p20":60700,"p40":67636,"p60":85538,"p80":118114,"p95":139036},"maleMedEarn":60778,"homeValue":null,"grossRent":null,"ownerCostMortgage":1455,"pop":306,"women":{"a18_24":0,"a25_29":0,"a30_34":0,"a35_39":9,"a40_49":19,"a50_64":87},"race":{"total":306,"white":306,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.015037593984962405,"separated":0,"divorced":0.14285714285714285},"obesity":0.396,"ll":[38.286,-90.7736]},"63042":{"medHHIncome":49384,"eduShareBplus":0.23171258312462217,"eduShareGrad":0.0674496934104845,"eduShareAssoc":0.09284048708869505,"femIncome":{"zero":0.25773441218467397,"u75":0.7015706806282722,"b7599":0.03355544978581628,"p100":0.007139457401237506},"dist":{"p20":27282,"p40":41188,"p60":60373,"p80":87722,"p95":137133},"maleMedEarn":36567,"homeValue":138800,"grossRent":939,"ownerCostMortgage":1272,"pop":17953,"women":{"a18_24":1867,"a25_29":731,"a30_34":436,"a35_39":303,"a40_49":1243,"a50_64":2073},"race":{"total":17953,"white":8609,"black":6911,"asian":333,"native":0,"pacific":0,"other":289,"multi":1811,"hispanic":668},"marital":{"neverMarried":0.44540464790377204,"separated":0.02919537545252832,"divorced":0.17890926077309355},"obesity":0.313,"ll":[38.7813,-90.3791]},"63043":{"medHHIncome":91050,"eduShareBplus":0.4500127518490181,"eduShareGrad":0.1809487375669472,"eduShareAssoc":0.08199438918643204,"femIncome":{"zero":0.37715685183123676,"u75":0.48380273850606703,"b7599":0.08961371479461204,"p100":0.04942669486808416},"dist":{"p20":44333,"p40":76583,"p60":107863,"p80":144634,"p95":208549},"maleMedEarn":67296,"homeValue":215900,"grossRent":1175,"ownerCostMortgage":1491,"pop":21651,"women":{"a18_24":685,"a25_29":938,"a30_34":1150,"a35_39":966,"a40_49":1230,"a50_64":1797},"race":{"total":21651,"white":13530,"black":3080,"asian":2947,"native":5,"pacific":65,"other":666,"multi":1358,"hispanic":1041},"marital":{"neverMarried":0.2911504424778761,"separated":0.004314159292035398,"divorced":0.14303097345132743},"obesity":0.313,"ll":[38.7292,-90.455]},"63044":{"medHHIncome":76094,"eduShareBplus":0.36773945377612516,"eduShareGrad":0.13155532760610333,"eduShareAssoc":0.057443261956661114,"femIncome":{"zero":0.3512753999135322,"u75":0.4976221357544315,"b7599":0.06722870730652832,"p100":0.08387375702550799},"dist":{"p20":37545,"p40":52226,"p60":96086,"p80":158213,"p95":250001},"maleMedEarn":44387,"homeValue":232200,"grossRent":1093,"ownerCostMortgage":1777,"pop":10510,"women":{"a18_24":252,"a25_29":424,"a30_34":250,"a35_39":315,"a40_49":755,"a50_64":1233},"race":{"total":10510,"white":6914,"black":2051,"asian":190,"native":118,"pacific":0,"other":702,"multi":535,"hispanic":1151},"marital":{"neverMarried":0.40081058020477817,"separated":0.010878839590443687,"divorced":0.09001706484641639},"obesity":0.313,"ll":[38.7729,-90.4298]},"63048":{"medHHIncome":89611,"eduShareBplus":0.241669589617678,"eduShareGrad":0.08874079270431427,"eduShareAssoc":0.15994387934058224,"femIncome":{"zero":0.38039673278879815,"u75":0.5513418903150525,"b7599":0.040256709451575265,"p100":0.028004667444574097},"dist":{"p20":45469,"p40":72273,"p60":96888,"p80":129474,"p95":200598},"maleMedEarn":57099,"homeValue":216300,"grossRent":2158,"ownerCostMortgage":1456,"pop":4143,"women":{"a18_24":159,"a25_29":58,"a30_34":149,"a35_39":68,"a40_49":376,"a50_64":459},"race":{"total":4143,"white":3409,"black":135,"asian":12,"native":7,"pacific":0,"other":17,"multi":563,"hispanic":25},"marital":{"neverMarried":0.20245040840140024,"separated":0.029171528588098017,"divorced":0.06301050175029171},"obesity":0.40299999999999997,"ll":[38.2604,-90.3924]},"63049":{"medHHIncome":90234,"eduShareBplus":0.2754072308303536,"eduShareGrad":0.09161700437028208,"eduShareAssoc":0.12069924513309495,"femIncome":{"zero":0.31399730820995964,"u75":0.5374158815612382,"b7599":0.06056527590847914,"p100":0.08802153432032302},"dist":{"p20":40391,"p40":72327,"p60":113193,"p80":163783,"p95":250001},"maleMedEarn":55035,"homeValue":209200,"grossRent":926,"ownerCostMortgage":1478,"pop":17480,"women":{"a18_24":646,"a25_29":391,"a30_34":459,"a35_39":536,"a40_49":1148,"a50_64":2222},"race":{"total":17480,"white":15237,"black":57,"asian":433,"native":119,"pacific":33,"other":420,"multi":1181,"hispanic":905},"marital":{"neverMarried":0.2785096473719228,"separated":0.0011976047904191617,"divorced":0.09807052561543579},"obesity":0.40299999999999997,"ll":[38.478,-90.5286]},"63050":{"medHHIncome":79462,"eduShareBplus":0.20171179326804378,"eduShareGrad":0.06633198913669656,"eduShareAssoc":0.14673689408279153,"femIncome":{"zero":0.42406369802418165,"u75":0.49306989088764375,"b7599":0.05514597463874963,"p100":0.02772043644942495},"dist":{"p20":38449,"p40":65203,"p60":94072,"p80":135859,"p95":205929},"maleMedEarn":59966,"homeValue":255500,"grossRent":1000,"ownerCostMortgage":1604,"pop":17681,"women":{"a18_24":665,"a25_29":271,"a30_34":491,"a35_39":553,"a40_49":1192,"a50_64":1730},"race":{"total":17681,"white":16070,"black":69,"asian":80,"native":32,"pacific":0,"other":153,"multi":1277,"hispanic":441},"marital":{"neverMarried":0.22927314026121523,"separated":0.012634866553094832,"divorced":0.11470755252697332},"obesity":0.40299999999999997,"ll":[38.2581,-90.5798]},"63051":{"medHHIncome":71513,"eduShareBplus":0.21059268600252207,"eduShareGrad":0.08334288662157514,"eduShareAssoc":0.13389888799724867,"femIncome":{"zero":0.33254948069762885,"u75":0.5794630609445425,"b7599":0.03527336860670194,"p100":0.05271408975112679},"dist":{"p20":31435,"p40":54852,"p60":91212,"p80":139310,"p95":230740},"maleMedEarn":55158,"homeValue":186300,"grossRent":1010,"ownerCostMortgage":1467,"pop":12589,"women":{"a18_24":554,"a25_29":333,"a30_34":494,"a35_39":388,"a40_49":593,"a50_64":1618},"race":{"total":12589,"white":11152,"black":50,"asian":57,"native":9,"pacific":0,"other":93,"multi":1228,"hispanic":316},"marital":{"neverMarried":0.26022661801421165,"separated":0.018244670635682733,"divorced":0.15844056078356059},"obesity":0.40299999999999997,"ll":[38.3778,-90.5766]},"63052":{"medHHIncome":95891,"eduShareBplus":0.27114877784093844,"eduShareGrad":0.08020257351041289,"eduShareAssoc":0.16061185468451242,"femIncome":{"zero":0.26989267209474466,"u75":0.5896558105107328,"b7599":0.07549962990377498,"p100":0.0649518874907476},"dist":{"p20":45231,"p40":72844,"p60":114000,"p80":160967,"p95":232125},"maleMedEarn":59174,"homeValue":259400,"grossRent":965,"ownerCostMortgage":1581,"pop":28741,"women":{"a18_24":1188,"a25_29":590,"a30_34":836,"a35_39":1310,"a40_49":1825,"a50_64":2763},"race":{"total":28741,"white":26594,"black":383,"asian":160,"native":7,"pacific":0,"other":347,"multi":1250,"hispanic":983},"marital":{"neverMarried":0.2555037909929661,"separated":0.01068785968758564,"divorced":0.12048963186261076},"obesity":0.40299999999999997,"ll":[38.393,-90.4326]},"63053":{"medHHIncome":68750,"eduShareBplus":0.17543859649122806,"eduShareGrad":0.03508771929824561,"eduShareAssoc":0.03508771929824561,"femIncome":{"zero":0.3023255813953488,"u75":0.46511627906976744,"b7599":0.23255813953488372,"p100":0},"dist":{"p20":24227,"p40":67800,"p60":69700,"p80":87750,"p95":100125},"maleMedEarn":67917,"homeValue":217100,"grossRent":1109,"ownerCostMortgage":null,"pop":60,"women":{"a18_24":0,"a25_29":0,"a30_34":12,"a35_39":0,"a40_49":0,"a50_64":19},"race":{"total":60,"white":60,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.3953488372093023,"separated":0.046511627906976744,"divorced":0.18604651162790697},"obesity":0.40299999999999997,"ll":[38.3665,-90.364]},"63055":{"medHHIncome":76359,"eduShareBplus":0.23820943245403678,"eduShareGrad":0.0759392486011191,"eduShareAssoc":0.0991207034372502,"femIncome":{"zero":0.3662420382165605,"u75":0.5238853503184714,"b7599":0.030254777070063694,"p100":0.07961783439490445},"dist":{"p20":38250,"p40":65135,"p60":95833,"p80":130250,"p95":250001},"maleMedEarn":53125,"homeValue":254300,"grossRent":902,"ownerCostMortgage":1865,"pop":1628,"women":{"a18_24":47,"a25_29":41,"a30_34":48,"a35_39":40,"a40_49":94,"a50_64":180},"race":{"total":1628,"white":1524,"black":31,"asian":0,"native":0,"pacific":0,"other":11,"multi":62,"hispanic":58},"marital":{"neverMarried":0.16560509554140126,"separated":0.009554140127388535,"divorced":0.054140127388535034},"obesity":0.396,"ll":[38.5296,-90.835]},"63060":{"medHHIncome":53586,"eduShareBplus":0.13806206459784673,"eduShareGrad":0.07156428119062698,"eduShareAssoc":0.034198860037998734,"femIncome":{"zero":0.40586245772266066,"u75":0.5580608793686584,"b7599":0.02480270574971815,"p100":0.011273957158962795},"dist":{"p20":36519,"p40":50539,"p60":61150,"p80":95886,"p95":148295},"maleMedEarn":36968,"homeValue":163600,"grossRent":1109,"ownerCostMortgage":1119,"pop":2183,"women":{"a18_24":61,"a25_29":13,"a30_34":71,"a35_39":56,"a40_49":132,"a50_64":148},"race":{"total":2183,"white":1842,"black":3,"asian":0,"native":0,"pacific":0,"other":24,"multi":314,"hispanic":44},"marital":{"neverMarried":0.18376550169109357,"separated":0,"divorced":0.09695603156708005},"obesity":0.396,"ll":[38.2606,-90.876]},"63061":{"medHHIncome":94167,"eduShareBplus":0.10784313725490197,"eduShareGrad":0.10784313725490197,"eduShareAssoc":0,"femIncome":{"zero":0.4523809523809524,"u75":0.2857142857142857,"b7599":0.2619047619047619,"p100":0},"dist":{"p20":38556,"p40":93042,"p60":105292,"p80":160045,"p95":161886},"maleMedEarn":null,"homeValue":266700,"grossRent":null,"ownerCostMortgage":null,"pop":154,"women":{"a18_24":0,"a25_29":12,"a30_34":0,"a35_39":11,"a40_49":0,"a50_64":0},"race":{"total":154,"white":151,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":3,"hispanic":0},"marital":{"neverMarried":0.2619047619047619,"separated":0,"divorced":0},"obesity":0.396,"ll":[38.2734,-90.8105]},"63069":{"medHHIncome":74063,"eduShareBplus":0.3008005756948817,"eduShareGrad":0.1002068903481155,"eduShareAssoc":0.10344517405774939,"femIncome":{"zero":0.3284576629286527,"u75":0.5418495043068422,"b7599":0.047619047619047616,"p100":0.0820737851454575},"dist":{"p20":33798,"p40":61267,"p60":95835,"p80":151857,"p95":250001},"maleMedEarn":48539,"homeValue":271200,"grossRent":913,"ownerCostMortgage":1684,"pop":14760,"women":{"a18_24":733,"a25_29":409,"a30_34":443,"a35_39":530,"a40_49":748,"a50_64":1653},"race":{"total":14760,"white":12474,"black":558,"asian":150,"native":43,"pacific":0,"other":106,"multi":1429,"hispanic":220},"marital":{"neverMarried":0.23079411289018276,"separated":0.013100436681222707,"divorced":0.13795891961830825},"obesity":0.396,"ll":[38.4635,-90.71]},"63070":{"medHHIncome":65330,"eduShareBplus":0.16443774722169902,"eduShareGrad":0.051610472782068186,"eduShareAssoc":0.13938594838952723,"femIncome":{"zero":0.3494525547445255,"u75":0.6195255474452555,"b7599":0.024939172749391728,"p100":0.006082725060827251},"dist":{"p20":24385,"p40":50000,"p60":80816,"p80":117088,"p95":175000},"maleMedEarn":41011,"homeValue":209200,"grossRent":846,"ownerCostMortgage":1376,"pop":8365,"women":{"a18_24":450,"a25_29":241,"a30_34":368,"a35_39":226,"a40_49":369,"a50_64":764},"race":{"total":8365,"white":7427,"black":238,"asian":169,"native":11,"pacific":0,"other":84,"multi":436,"hispanic":49},"marital":{"neverMarried":0.2857142857142857,"separated":0.0237593984962406,"divorced":0.14345864661654134},"obesity":0.40299999999999997,"ll":[38.2876,-90.4212]},"63071":{"medHHIncome":44539,"eduShareBplus":0.04821802935010482,"eduShareGrad":0.02620545073375262,"eduShareAssoc":0.10062893081761007,"femIncome":{"zero":0.44840525328330205,"u75":0.5178236397748592,"b7599":0.001876172607879925,"p100":0.03189493433395872},"dist":{"p20":21575,"p40":37923,"p60":56318,"p80":77356,"p95":131461},"maleMedEarn":31500,"homeValue":122900,"grossRent":829,"ownerCostMortgage":1030,"pop":1315,"women":{"a18_24":80,"a25_29":0,"a30_34":21,"a35_39":90,"a40_49":118,"a50_64":137},"race":{"total":1315,"white":1199,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":116,"hispanic":16},"marital":{"neverMarried":0.32592592592592595,"separated":0.027777777777777776,"divorced":0.11481481481481481},"obesity":0.419,"ll":[38.15,-90.8211]},"63072":{"medHHIncome":88686,"eduShareBplus":0.10042818217205138,"eduShareGrad":0.018684312962242117,"eduShareAssoc":0.1401323472168159,"femIncome":{"zero":0.3583208395802099,"u75":0.4490254872563718,"b7599":0.10944527736131934,"p100":0.08320839580209895},"dist":{"p20":51343,"p40":79125,"p60":98830,"p80":159132,"p95":241590},"maleMedEarn":62184,"homeValue":198700,"grossRent":1141,"ownerCostMortgage":1339,"pop":3692,"women":{"a18_24":89,"a25_29":52,"a30_34":61,"a35_39":115,"a40_49":230,"a50_64":343},"race":{"total":3692,"white":3571,"black":39,"asian":0,"native":0,"pacific":0,"other":0,"multi":82,"hispanic":32},"marital":{"neverMarried":0.1454272863568216,"separated":0,"divorced":0.10794602698650675},"obesity":0.396,"ll":[38.3695,-90.8178]},"63073":{"medHHIncome":250001,"eduShareBplus":0.7061728395061728,"eduShareGrad":0.31851851851851853,"eduShareAssoc":0.030864197530864196,"femIncome":{"zero":0.5083932853717026,"u75":0.33573141486810554,"b7599":0,"p100":0.15587529976019185},"dist":{"p20":36548,"p40":141591,"p60":250001,"p80":250001,"p95":250001},"maleMedEarn":198628,"homeValue":803300,"grossRent":null,"ownerCostMortgage":4001,"pop":1027,"women":{"a18_24":0,"a25_29":0,"a30_34":21,"a35_39":0,"a40_49":117,"a50_64":112},"race":{"total":1027,"white":1007,"black":0,"asian":0,"native":0,"pacific":0,"other":11,"multi":9,"hispanic":11},"marital":{"neverMarried":0.023980815347721823,"separated":0,"divorced":0},"obesity":0.396,"ll":[38.5847,-90.7695]},"63074":{"medHHIncome":51351,"eduShareBplus":0.18252922049389225,"eduShareGrad":0.04429211705773794,"eduShareAssoc":0.08480534317602602,"femIncome":{"zero":0.3248518143703918,"u75":0.6418967760589851,"b7599":0.0332514095706231,"p100":0},"dist":{"p20":26842,"p40":42514,"p60":69396,"p80":92083,"p95":131595},"maleMedEarn":37632,"homeValue":119500,"grossRent":1005,"ownerCostMortgage":1149,"pop":16237,"women":{"a18_24":638,"a25_29":711,"a30_34":891,"a35_39":476,"a40_49":1181,"a50_64":1585},"race":{"total":16237,"white":8648,"black":4353,"asian":247,"native":22,"pacific":0,"other":2225,"multi":742,"hispanic":3067},"marital":{"neverMarried":0.4267836593785961,"separated":0.03423475258918297,"divorced":0.12859608745684695},"obesity":0.313,"ll":[38.7264,-90.3889]},"63087":{"medHHIncome":75917,"eduShareBplus":0.17865429234338748,"eduShareGrad":0.04640371229698376,"eduShareAssoc":0.1334106728538283,"femIncome":{"zero":0.5700934579439252,"u75":0.3060747663551402,"b7599":0.06775700934579439,"p100":0.056074766355140186},"dist":{"p20":30674,"p40":42360,"p60":93667,"p80":141714,"p95":227724},"maleMedEarn":45729,"homeValue":226500,"grossRent":null,"ownerCostMortgage":1688,"pop":1173,"women":{"a18_24":0,"a25_29":0,"a30_34":47,"a35_39":12,"a40_49":94,"a50_64":110},"race":{"total":1173,"white":1107,"black":0,"asian":0,"native":15,"pacific":0,"other":0,"multi":51,"hispanic":35},"marital":{"neverMarried":0.05442176870748299,"separated":0,"divorced":0.06575963718820861},"obesity":0.40299999999999997,"ll":[38.0051,-90.4636]},"63088":{"medHHIncome":62023,"eduShareBplus":0.4843420412136946,"eduShareGrad":0.1327275677429823,"eduShareAssoc":0.06441668018822003,"femIncome":{"zero":0.32581382067390063,"u75":0.5633923472301542,"b7599":0.06482010279840092,"p100":0.04597372929754426},"dist":{"p20":33656,"p40":51638,"p60":75292,"p80":127362,"p95":234625},"maleMedEarn":51414,"homeValue":231700,"grossRent":1319,"ownerCostMortgage":1580,"pop":8423,"women":{"a18_24":409,"a25_29":326,"a30_34":340,"a35_39":218,"a40_49":580,"a50_64":805},"race":{"total":8423,"white":7094,"black":568,"asian":200,"native":2,"pacific":0,"other":22,"multi":537,"hispanic":359},"marital":{"neverMarried":0.3398360192253322,"separated":0.006219960418433701,"divorced":0.16878710771840544},"obesity":0.313,"ll":[38.5486,-90.5017]},"63089":{"medHHIncome":70981,"eduShareBplus":0.1716473203260064,"eduShareGrad":0.06816497900716226,"eduShareAssoc":0.1148431711533712,"femIncome":{"zero":0.4315514993481095,"u75":0.4602346805736636,"b7599":0.07344632768361582,"p100":0.034767492394611035},"dist":{"p20":32157,"p40":58659,"p60":88426,"p80":139964,"p95":182111},"maleMedEarn":53621,"homeValue":211400,"grossRent":1060,"ownerCostMortgage":1314,"pop":5930,"women":{"a18_24":146,"a25_29":93,"a30_34":253,"a35_39":391,"a40_49":196,"a50_64":596},"race":{"total":5930,"white":5310,"black":82,"asian":29,"native":5,"pacific":0,"other":92,"multi":412,"hispanic":376},"marital":{"neverMarried":0.3206172310330047,"separated":0.008144020574367767,"divorced":0.14273467638234033},"obesity":0.396,"ll":[38.4605,-90.8789]},"63101":{"medHHIncome":92708,"eduShareBplus":0.6050559469539992,"eduShareGrad":0.24202237878159966,"eduShareAssoc":0.08537090758392044,"femIncome":{"zero":0.28637627432808155,"u75":0.5134383688600556,"b7599":0.10009267840593142,"p100":0.10009267840593142},"dist":{"p20":24280,"p40":77698,"p60":105255,"p80":156821,"p95":248244},"maleMedEarn":80699,"homeValue":228300,"grossRent":1295,"ownerCostMortgage":2290,"pop":2953,"women":{"a18_24":73,"a25_29":419,"a30_34":143,"a35_39":98,"a40_49":16,"a50_64":295},"race":{"total":2953,"white":1274,"black":1501,"asian":93,"native":0,"pacific":0,"other":63,"multi":22,"hispanic":86},"marital":{"neverMarried":0.5727525486561631,"separated":0,"divorced":0.21223354958294718},"obesity":0.37,"ll":[38.6314,-90.1928]},"63102":{"medHHIncome":60313,"eduShareBplus":0.4830781627719581,"eduShareGrad":0.17123287671232876,"eduShareAssoc":0.0249798549556809,"femIncome":{"zero":0.1284722222222222,"u75":0.8020833333333334,"b7599":0.052083333333333336,"p100":0.017361111111111112},"dist":{"p20":27418,"p40":42385,"p60":87267,"p80":145599,"p95":166490},"maleMedEarn":53750,"homeValue":179100,"grossRent":1253,"ownerCostMortgage":null,"pop":3004,"women":{"a18_24":323,"a25_29":183,"a30_34":110,"a35_39":52,"a40_49":77,"a50_64":77},"race":{"total":3004,"white":1254,"black":1138,"asian":116,"native":26,"pacific":0,"other":77,"multi":393,"hispanic":393},"marital":{"neverMarried":0.6759259259259259,"separated":0.047453703703703706,"divorced":0.11342592592592593},"obesity":0.37,"ll":[38.6345,-90.1863]},"63103":{"medHHIncome":37500,"eduShareBplus":0.5101187489546747,"eduShareGrad":0.2694430506773708,"eduShareAssoc":0.05218263923733066,"femIncome":{"zero":0.38755873797270085,"u75":0.5021257552025061,"b7599":0.07272320429626315,"p100":0.037592302528529874},"dist":{"p20":12144,"p40":29199,"p60":53476,"p80":99357,"p95":178013},"maleMedEarn":40518,"homeValue":205400,"grossRent":978,"ownerCostMortgage":1718,"pop":8927,"women":{"a18_24":1435,"a25_29":519,"a30_34":522,"a35_39":188,"a40_49":312,"a50_64":627},"race":{"total":8927,"white":3922,"black":3622,"asian":708,"native":15,"pacific":0,"other":99,"multi":561,"hispanic":274},"marital":{"neverMarried":0.662357922888344,"separated":0.007131713839982171,"divorced":0.10340985067974147},"obesity":0.37,"ll":[38.6298,-90.2171]},"63104":{"medHHIncome":70127,"eduShareBplus":0.5397267722422348,"eduShareGrad":0.2393121729083124,"eduShareAssoc":0.05185890029225855,"femIncome":{"zero":0.2614928909952607,"u75":0.5479857819905213,"b7599":0.08222748815165877,"p100":0.10829383886255924},"dist":{"p20":20816,"p40":55223,"p60":94762,"p80":146172,"p95":250001},"maleMedEarn":61977,"homeValue":249500,"grossRent":1054,"ownerCostMortgage":1876,"pop":18701,"women":{"a18_24":944,"a25_29":1181,"a30_34":806,"a35_39":1148,"a40_49":1269,"a50_64":1836},"race":{"total":18701,"white":9765,"black":7090,"asian":326,"native":105,"pacific":0,"other":206,"multi":1209,"hispanic":677},"marital":{"neverMarried":0.4894170509636987,"separated":0.02625044341965236,"divorced":0.11505261913207994},"obesity":0.37,"ll":[38.6111,-90.2141]},"63105":{"medHHIncome":119446,"eduShareBplus":0.8461979913916786,"eduShareGrad":0.5182209469153515,"eduShareAssoc":0.00784313725490196,"femIncome":{"zero":0.3605660601736235,"u75":0.4469021286716613,"b7599":0.051730288976097036,"p100":0.14080152217861816},"dist":{"p20":44542,"p40":92500,"p60":157800,"p80":250001,"p95":250001},"maleMedEarn":72344,"homeValue":735500,"grossRent":1520,"ownerCostMortgage":3709,"pop":18860,"women":{"a18_24":2604,"a25_29":461,"a30_34":524,"a35_39":581,"a40_49":838,"a50_64":1496},"race":{"total":18860,"white":13416,"black":1599,"asian":2277,"native":22,"pacific":0,"other":258,"multi":1288,"hispanic":720},"marital":{"neverMarried":0.4873477038425492,"separated":0.0033973758200562323,"divorced":0.07931115276476101},"obesity":0.313,"ll":[38.6443,-90.3281]},"63106":{"medHHIncome":21475,"eduShareBplus":0.199376253063043,"eduShareGrad":0.059478725774114505,"eduShareAssoc":0.058587658721318776,"femIncome":{"zero":0.42382008235666774,"u75":0.5657269559708584,"b7599":0.004751346214760849,"p100":0.005701615457713019},"dist":{"p20":11401,"p40":17269,"p60":27440,"p80":66228,"p95":133092},"maleMedEarn":29167,"homeValue":186700,"grossRent":739,"ownerCostMortgage":1153,"pop":7742,"women":{"a18_24":407,"a25_29":384,"a30_34":230,"a35_39":206,"a40_49":450,"a50_64":706},"race":{"total":7742,"white":663,"black":6900,"asian":17,"native":0,"pacific":0,"other":0,"multi":162,"hispanic":143},"marital":{"neverMarried":0.590726429675425,"separated":0.04451313755795981,"divorced":0.16383307573415765},"obesity":0.37,"ll":[38.6444,-90.208]},"63107":{"medHHIncome":40522,"eduShareBplus":0.13217443428742695,"eduShareGrad":0.04900344672561067,"eduShareAssoc":0.06998351566012288,"femIncome":{"zero":0.5048908954100828,"u75":0.46400802608477554,"b7599":0.022322548281916228,"p100":0.008778530223225483},"dist":{"p20":13528,"p40":27679,"p60":50445,"p80":71280,"p95":125692},"maleMedEarn":32154,"homeValue":57100,"grossRent":839,"ownerCostMortgage":967,"pop":9082,"women":{"a18_24":177,"a25_29":313,"a30_34":355,"a35_39":251,"a40_49":531,"a50_64":1017},"race":{"total":9082,"white":725,"black":8073,"asian":0,"native":10,"pacific":0,"other":121,"multi":153,"hispanic":190},"marital":{"neverMarried":0.49494201825808043,"separated":0.03651616086849247,"divorced":0.15198618307426598},"obesity":0.37,"ll":[38.6637,-90.212]},"63108":{"medHHIncome":56933,"eduShareBplus":0.6368695891163941,"eduShareGrad":0.38072007695478904,"eduShareAssoc":0.04046997389033943,"femIncome":{"zero":0.3471800774301559,"u75":0.5273621429318824,"b7599":0.058909699696557495,"p100":0.0665480799414042},"dist":{"p20":14397,"p40":44397,"p60":71757,"p80":132667,"p95":250001},"maleMedEarn":57926,"homeValue":337300,"grossRent":1140,"ownerCostMortgage":2170,"pop":20692,"women":{"a18_24":2468,"a25_29":1334,"a30_34":935,"a35_39":875,"a40_49":928,"a50_64":1286},"race":{"total":20692,"white":11565,"black":5348,"asian":2638,"native":13,"pacific":0,"other":335,"multi":793,"hispanic":865},"marital":{"neverMarried":0.5772689251359264,"separated":0.031472187369301546,"divorced":0.08971141781681305},"obesity":0.37,"ll":[38.6449,-90.2534]},"63109":{"medHHIncome":71563,"eduShareBplus":0.5151764535024447,"eduShareGrad":0.23101127946942926,"eduShareAssoc":0.07789127172387084,"femIncome":{"zero":0.28334922423506975,"u75":0.5388749241570598,"b7599":0.1087804455230996,"p100":0.06899540608477074},"dist":{"p20":32777,"p40":58590,"p60":83716,"p80":138993,"p95":231563},"maleMedEarn":55712,"homeValue":244900,"grossRent":929,"ownerCostMortgage":1604,"pop":25743,"women":{"a18_24":481,"a25_29":1175,"a30_34":1373,"a35_39":1253,"a40_49":1630,"a50_64":2692},"race":{"total":25743,"white":22958,"black":1522,"asian":259,"native":20,"pacific":8,"other":92,"multi":884,"hispanic":733},"marital":{"neverMarried":0.3372143165157395,"separated":0.025614489003880983,"divorced":0.151875808538163},"obesity":0.37,"ll":[38.5846,-90.2944]},"63110":{"medHHIncome":73809,"eduShareBplus":0.6403162055335968,"eduShareGrad":0.3209784473115072,"eduShareAssoc":0.05265120441494519,"femIncome":{"zero":0.24185574851058436,"u75":0.5881607301305616,"b7599":0.0735200912663202,"p100":0.09646343009253391},"dist":{"p20":34735,"p40":59371,"p60":91923,"p80":161648,"p95":250001},"maleMedEarn":68847,"homeValue":314600,"grossRent":1183,"ownerCostMortgage":1932,"pop":17725,"women":{"a18_24":735,"a25_29":1445,"a30_34":1116,"a35_39":890,"a40_49":946,"a50_64":1683},"race":{"total":17725,"white":11779,"black":3427,"asian":651,"native":29,"pacific":17,"other":169,"multi":1653,"hispanic":1343},"marital":{"neverMarried":0.4714285714285714,"separated":0.008723135271807838,"divorced":0.09469026548672567},"obesity":0.37,"ll":[38.6254,-90.2665]},"63111":{"medHHIncome":43295,"eduShareBplus":0.1946656050955414,"eduShareGrad":0.06457006369426752,"eduShareAssoc":0.06138535031847134,"femIncome":{"zero":0.37659690133188367,"u75":0.5769230769230769,"b7599":0.03302527860831748,"p100":0.013454743136721936},"dist":{"p20":17352,"p40":32180,"p60":51921,"p80":74613,"p95":132247},"maleMedEarn":33911,"homeValue":115500,"grossRent":846,"ownerCostMortgage":1172,"pop":19093,"women":{"a18_24":886,"a25_29":398,"a30_34":953,"a35_39":951,"a40_49":1030,"a50_64":1601},"race":{"total":19093,"white":7831,"black":8055,"asian":254,"native":48,"pacific":5,"other":843,"multi":2057,"hispanic":1695},"marital":{"neverMarried":0.5375213562886056,"separated":0.030884478906558023,"divorced":0.14509133920357473},"obesity":0.37,"ll":[38.5581,-90.25]},"63112":{"medHHIncome":43262,"eduShareBplus":0.4407484407484408,"eduShareGrad":0.23562023562023562,"eduShareAssoc":0.06306306306306306,"femIncome":{"zero":0.3317307692307692,"u75":0.5714285714285714,"b7599":0.03972069597069597,"p100":0.05711996336996337},"dist":{"p20":12039,"p40":30077,"p60":63891,"p80":103723,"p95":227419},"maleMedEarn":39351,"homeValue":216400,"grossRent":911,"ownerCostMortgage":1631,"pop":18353,"women":{"a18_24":1411,"a25_29":978,"a30_34":1157,"a35_39":334,"a40_49":1423,"a50_64":1580},"race":{"total":18353,"white":4505,"black":11611,"asian":1057,"native":22,"pacific":0,"other":233,"multi":925,"hispanic":660},"marital":{"neverMarried":0.5006262097233292,"separated":0.03142434247979051,"divorced":0.1279744961858135},"obesity":0.37,"ll":[38.6599,-90.2833]},"63113":{"medHHIncome":38647,"eduShareBplus":0.16893667861409797,"eduShareGrad":0.06714456391875746,"eduShareAssoc":0.06738351254480286,"femIncome":{"zero":0.49596464258262873,"u75":0.4650269023827825,"b7599":0.012874711760184473,"p100":0.026133743274404306},"dist":{"p20":13723,"p40":27282,"p60":50210,"p80":82838,"p95":166350},"maleMedEarn":30601,"homeValue":75600,"grossRent":914,"ownerCostMortgage":1127,"pop":11610,"women":{"a18_24":357,"a25_29":428,"a30_34":322,"a35_39":313,"a40_49":603,"a50_64":1493},"race":{"total":11610,"white":699,"black":10677,"asian":10,"native":0,"pacific":12,"other":29,"multi":183,"hispanic":131},"marital":{"neverMarried":0.39850467289719627,"separated":0.03271028037383177,"divorced":0.20953271028037382},"obesity":0.37,"ll":[38.658,-90.2476]},"63114":{"medHHIncome":52048,"eduShareBplus":0.20921224369500233,"eduShareGrad":0.0713654161930024,"eduShareAssoc":0.10121679087196328,"femIncome":{"zero":0.3672109540894779,"u75":0.5713553489053232,"b7599":0.03851504722852749,"p100":0.022918649776671303},"dist":{"p20":27889,"p40":42383,"p60":63752,"p80":97634,"p95":153683},"maleMedEarn":39118,"homeValue":109700,"grossRent":1082,"ownerCostMortgage":1167,"pop":33703,"women":{"a18_24":914,"a25_29":1641,"a30_34":1308,"a35_39":1257,"a40_49":2144,"a50_64":3343},"race":{"total":33703,"white":17586,"black":10190,"asian":725,"native":27,"pacific":6,"other":3017,"multi":2152,"hispanic":3828},"marital":{"neverMarried":0.37142026457333915,"separated":0.035688326791684835,"divorced":0.1420264573339148},"obesity":0.313,"ll":[38.7023,-90.3637]},"63115":{"medHHIncome":31898,"eduShareBplus":0.1423487544483986,"eduShareGrad":0.04222371838030201,"eduShareAssoc":0.07011637972492064,"femIncome":{"zero":0.41596702793466644,"u75":0.529690123645245,"b7599":0.04930544954968707,"p100":0.0050373988704014655},"dist":{"p20":13436,"p40":25155,"p60":41768,"p80":73990,"p95":157426},"maleMedEarn":30619,"homeValue":61600,"grossRent":928,"ownerCostMortgage":986,"pop":14252,"women":{"a18_24":368,"a25_29":786,"a30_34":491,"a35_39":408,"a40_49":1003,"a50_64":1625},"race":{"total":14252,"white":320,"black":13551,"asian":0,"native":30,"pacific":52,"other":33,"multi":266,"hispanic":92},"marital":{"neverMarried":0.4954365682993611,"separated":0.056434438697900824,"divorced":0.14587770003042289},"obesity":0.37,"ll":[38.6819,-90.2402]},"63116":{"medHHIncome":60193,"eduShareBplus":0.3702110895899675,"eduShareGrad":0.15160368996421653,"eduShareAssoc":0.0780342076753882,"femIncome":{"zero":0.26946806736701684,"u75":0.5878494802957034,"b7599":0.07753876938469234,"p100":0.0651436829525874},"dist":{"p20":26296,"p40":47831,"p60":72905,"p80":120298,"p95":211791},"maleMedEarn":46132,"homeValue":161100,"grossRent":946,"ownerCostMortgage":1271,"pop":42470,"women":{"a18_24":1200,"a25_29":2035,"a30_34":2550,"a35_39":2013,"a40_49":2497,"a50_64":4227},"race":{"total":42470,"white":23892,"black":11398,"asian":2220,"native":245,"pacific":3,"other":1429,"multi":3283,"hispanic":4124},"marital":{"neverMarried":0.39860411012020164,"separated":0.01894421979726361,"divorced":0.13837035395779096},"obesity":0.37,"ll":[38.58,-90.2651]},"63117":{"medHHIncome":86667,"eduShareBplus":0.7371987951807228,"eduShareGrad":0.3450301204819277,"eduShareAssoc":0.048644578313253015,"femIncome":{"zero":0.26988265971316816,"u75":0.48083441981747066,"b7599":0.11108213820078226,"p100":0.13820078226857888},"dist":{"p20":38276,"p40":66163,"p60":108611,"p80":179184,"p95":250001},"maleMedEarn":60841,"homeValue":330100,"grossRent":1216,"ownerCostMortgage":1938,"pop":9188,"women":{"a18_24":376,"a25_29":428,"a30_34":334,"a35_39":536,"a40_49":503,"a50_64":859},"race":{"total":9188,"white":7672,"black":532,"asian":421,"native":0,"pacific":0,"other":137,"multi":426,"hispanic":304},"marital":{"neverMarried":0.3706652966863601,"separated":0.02440277421012073,"divorced":0.17184690470074493},"obesity":0.313,"ll":[38.6308,-90.3304]},"63118":{"medHHIncome":57268,"eduShareBplus":0.37703671518574844,"eduShareGrad":0.17450575711492505,"eduShareAssoc":0.04176623940908104,"femIncome":{"zero":0.2548158498852181,"u75":0.6103403533286755,"b7599":0.079449046811059,"p100":0.05539474997504741},"dist":{"p20":23140,"p40":45765,"p60":71408,"p80":118799,"p95":207788},"maleMedEarn":47533,"homeValue":210900,"grossRent":952,"ownerCostMortgage":1504,"pop":25645,"women":{"a18_24":717,"a25_29":1368,"a30_34":1360,"a35_39":1116,"a40_49":1590,"a50_64":2080},"race":{"total":25645,"white":11553,"black":10756,"asian":647,"native":46,"pacific":0,"other":701,"multi":1942,"hispanic":1939},"marital":{"neverMarried":0.5296547654175273,"separated":0.03462181567817449,"divorced":0.09107898101701584},"obesity":0.37,"ll":[38.5923,-90.225]},"63119":{"medHHIncome":103287,"eduShareBplus":0.6441317635476064,"eduShareGrad":0.3112360011486237,"eduShareAssoc":0.06128727899249292,"femIncome":{"zero":0.3514129443938013,"u75":0.4358640447974997,"b7599":0.06980075530668056,"p100":0.14292225550201848},"dist":{"p20":52855,"p40":84401,"p60":121000,"p80":205247,"p95":250001},"maleMedEarn":76761,"homeValue":330800,"grossRent":1275,"ownerCostMortgage":1971,"pop":34574,"women":{"a18_24":1591,"a25_29":989,"a30_34":1203,"a35_39":1103,"a40_49":2297,"a50_64":3293},"race":{"total":34574,"white":26977,"black":3304,"asian":866,"native":29,"pacific":6,"other":325,"multi":3067,"hispanic":1025},"marital":{"neverMarried":0.29813504823151127,"separated":0.0032797427652733117,"divorced":0.12636655948553055},"obesity":0.313,"ll":[38.5901,-90.3499]},"63120":{"medHHIncome":34097,"eduShareBplus":0.0783399393798088,"eduShareGrad":0.03170902308230357,"eduShareAssoc":0.053392399160643506,"femIncome":{"zero":0.42323651452282157,"u75":0.5675071816150654,"b7599":0.004468560485157995,"p100":0.0047877433769549956},"dist":{"p20":11218,"p40":28820,"p60":41086,"p80":64850,"p95":133318},"maleMedEarn":34020,"homeValue":52300,"grossRent":922,"ownerCostMortgage":927,"pop":7227,"women":{"a18_24":438,"a25_29":230,"a30_34":256,"a35_39":135,"a40_49":548,"a50_64":675},"race":{"total":7227,"white":203,"black":6487,"asian":0,"native":10,"pacific":0,"other":55,"multi":472,"hispanic":54},"marital":{"neverMarried":0.6086014851485149,"separated":0.08168316831683169,"divorced":0.09313118811881188},"obesity":0.313,"ll":[38.6906,-90.2621]},"63121":{"medHHIncome":41285,"eduShareBplus":0.2185484375978458,"eduShareGrad":0.08735675371031373,"eduShareAssoc":0.0667543365270211,"femIncome":{"zero":0.3688086908488308,"u75":0.5750322224268091,"b7599":0.029276376357945128,"p100":0.026882710366415024},"dist":{"p20":19531,"p40":34418,"p60":50281,"p80":82038,"p95":149736},"maleMedEarn":33464,"homeValue":93900,"grossRent":938,"ownerCostMortgage":1213,"pop":24571,"women":{"a18_24":1782,"a25_29":975,"a30_34":755,"a35_39":885,"a40_49":1198,"a50_64":2396},"race":{"total":24571,"white":3466,"black":19600,"asian":386,"native":14,"pacific":0,"other":158,"multi":947,"hispanic":415},"marital":{"neverMarried":0.5007287301876481,"separated":0.027327382036800876,"divorced":0.14729458917835672},"obesity":0.313,"ll":[38.7081,-90.3006]},"63122":{"medHHIncome":132783,"eduShareBplus":0.702766353826145,"eduShareGrad":0.3319624591374038,"eduShareAssoc":0.04864845864529509,"femIncome":{"zero":0.3851868655362105,"u75":0.3841093404412182,"b7599":0.0758237395791981,"p100":0.15488005444337322},"dist":{"p20":54918,"p40":97330,"p60":162184,"p80":249537,"p95":250001},"maleMedEarn":96348,"homeValue":449700,"grossRent":1329,"ownerCostMortgage":2417,"pop":41724,"women":{"a18_24":1221,"a25_29":717,"a30_34":1003,"a35_39":1592,"a40_49":2797,"a50_64":4098},"race":{"total":41724,"white":35341,"black":1541,"asian":1009,"native":34,"pacific":0,"other":357,"multi":3442,"hispanic":1018},"marital":{"neverMarried":0.24423141232861442,"separated":0.01304202430052391,"divorced":0.12434511202764463},"obesity":0.313,"ll":[38.5794,-90.4209]},"63123":{"medHHIncome":74187,"eduShareBplus":0.36043656207366986,"eduShareGrad":0.141118690313779,"eduShareAssoc":0.10439290586630287,"femIncome":{"zero":0.32705644605704315,"u75":0.5646442842052083,"b7599":0.06999494787121664,"p100":0.038304321866531946},"dist":{"p20":36131,"p40":60447,"p60":88813,"p80":134090,"p95":222017},"maleMedEarn":50829,"homeValue":205300,"grossRent":987,"ownerCostMortgage":1453,"pop":49826,"women":{"a18_24":1954,"a25_29":1558,"a30_34":1918,"a35_39":1951,"a40_49":3154,"a50_64":5089},"race":{"total":49826,"white":41596,"black":1787,"asian":2433,"native":54,"pacific":2,"other":337,"multi":3617,"hispanic":2360},"marital":{"neverMarried":0.30458907536271435,"separated":0.005548733342429618,"divorced":0.13717196525219447},"obesity":0.313,"ll":[38.5474,-90.3281]},"63124":{"medHHIncome":188750,"eduShareBplus":0.8496194451264424,"eduShareGrad":0.4790081021360177,"eduShareAssoc":0.02516572550945249,"femIncome":{"zero":0.4789951446062909,"u75":0.26303567658855814,"b7599":0.05362043487439307,"p100":0.20434874393075786},"dist":{"p20":70404,"p40":124459,"p60":250001,"p80":250001,"p95":250001},"maleMedEarn":161000,"homeValue":967300,"grossRent":1812,"ownerCostMortgage":4001,"pop":11009,"women":{"a18_24":410,"a25_29":354,"a30_34":264,"a35_39":281,"a40_49":583,"a50_64":1256},"race":{"total":11009,"white":9433,"black":222,"asian":634,"native":0,"pacific":0,"other":170,"multi":550,"hispanic":385},"marital":{"neverMarried":0.23737582781456953,"separated":0.005794701986754967,"divorced":0.08174668874172185},"obesity":0.313,"ll":[38.6366,-90.3747]},"63125":{"medHHIncome":59683,"eduShareBplus":0.2206129303106633,"eduShareGrad":0.06225860621326616,"eduShareAssoc":0.10596137699412259,"femIncome":{"zero":0.38721495327102806,"u75":0.5745046728971963,"b7599":0.026691588785046728,"p100":0.011588785046728972},"dist":{"p20":32633,"p40":51350,"p60":71321,"p80":106350,"p95":165659},"maleMedEarn":46055,"homeValue":166200,"grossRent":920,"ownerCostMortgage":1250,"pop":32701,"women":{"a18_24":1171,"a25_29":1198,"a30_34":1605,"a35_39":870,"a40_49":1657,"a50_64":3404},"race":{"total":32701,"white":28552,"black":1455,"asian":594,"native":55,"pacific":21,"other":453,"multi":1571,"hispanic":1159},"marital":{"neverMarried":0.3385556550283497,"separated":0.010519247985675918,"divorced":0.11451805431214562},"obesity":0.313,"ll":[38.5194,-90.2927]},"63126":{"medHHIncome":99795,"eduShareBplus":0.5584314404432132,"eduShareGrad":0.20723684210526316,"eduShareAssoc":0.06189404432132964,"femIncome":{"zero":0.30978260869565216,"u75":0.48493788819875777,"b7599":0.06739130434782609,"p100":0.13788819875776398},"dist":{"p20":52704,"p40":80872,"p60":123864,"p80":185143,"p95":250001},"maleMedEarn":61919,"homeValue":287000,"grossRent":1112,"ownerCostMortgage":1828,"pop":15373,"women":{"a18_24":300,"a25_29":568,"a30_34":434,"a35_39":730,"a40_49":781,"a50_64":1838},"race":{"total":15373,"white":14142,"black":158,"asian":215,"native":0,"pacific":0,"other":81,"multi":777,"hispanic":542},"marital":{"neverMarried":0.20862757138470986,"separated":0.03208474055879644,"divorced":0.10039914031317163},"obesity":0.313,"ll":[38.5496,-90.3787]},"63127":{"medHHIncome":124583,"eduShareBplus":0.6193384223918575,"eduShareGrad":0.28040712468193385,"eduShareAssoc":0.06793893129770992,"femIncome":{"zero":0.5230107526881721,"u75":0.3260215053763441,"b7599":0.04258064516129032,"p100":0.10838709677419354},"dist":{"p20":55078,"p40":103882,"p60":160071,"p80":250001,"p95":250001},"maleMedEarn":114531,"homeValue":594100,"grossRent":null,"ownerCostMortgage":2824,"pop":5161,"women":{"a18_24":147,"a25_29":43,"a30_34":113,"a35_39":23,"a40_49":434,"a50_64":472},"race":{"total":5161,"white":4797,"black":94,"asian":29,"native":0,"pacific":0,"other":7,"multi":234,"hispanic":48},"marital":{"neverMarried":0.15045006429489927,"separated":0,"divorced":0.08015430775825118},"obesity":0.313,"ll":[38.5345,-90.4174]},"63128":{"medHHIncome":87266,"eduShareBplus":0.4690754039497307,"eduShareGrad":0.1552064631956912,"eduShareAssoc":0.0854129263913824,"femIncome":{"zero":0.4276206322795341,"u75":0.4469823022235668,"b7599":0.059824534866132206,"p100":0.0655725306307669},"dist":{"p20":40102,"p40":69506,"p60":109795,"p80":174385,"p95":250001},"maleMedEarn":60152,"homeValue":319700,"grossRent":1120,"ownerCostMortgage":1857,"pop":30106,"women":{"a18_24":1131,"a25_29":627,"a30_34":696,"a35_39":1017,"a40_49":1542,"a50_64":3189},"race":{"total":30106,"white":27803,"black":427,"asian":287,"native":119,"pacific":15,"other":92,"multi":1363,"hispanic":429},"marital":{"neverMarried":0.2282185628742515,"separated":0.012574850299401197,"divorced":0.11976047904191617},"obesity":0.313,"ll":[38.492,-90.3866]},"63129":{"medHHIncome":91920,"eduShareBplus":0.4185076554637677,"eduShareGrad":0.1501493420875602,"eduShareAssoc":0.08955143556763448,"femIncome":{"zero":0.3550322964863255,"u75":0.507306793714783,"b7599":0.06921984516010811,"p100":0.06844106463878327},"dist":{"p20":44772,"p40":74434,"p60":111631,"p80":171891,"p95":250001},"maleMedEarn":59530,"homeValue":278800,"grossRent":1087,"ownerCostMortgage":1751,"pop":51356,"women":{"a18_24":2195,"a25_29":1350,"a30_34":1303,"a35_39":1559,"a40_49":2799,"a50_64":6220},"race":{"total":51356,"white":45507,"black":2080,"asian":778,"native":56,"pacific":0,"other":198,"multi":2737,"hispanic":1489},"marital":{"neverMarried":0.2370882472549817,"separated":0.01599566219330351,"divorced":0.10315846550088112},"obesity":0.313,"ll":[38.4578,-90.3191]},"63130":{"medHHIncome":81103,"eduShareBplus":0.6361840105380484,"eduShareGrad":0.3345323741007194,"eduShareAssoc":0.05638869186341068,"femIncome":{"zero":0.3136334079907521,"u75":0.5026370926956145,"b7599":0.06943139946535655,"p100":0.11429809984827685},"dist":{"p20":33132,"p40":61142,"p60":110697,"p80":190714,"p95":250001},"maleMedEarn":59499,"homeValue":285500,"grossRent":1199,"ownerCostMortgage":1966,"pop":29074,"women":{"a18_24":2716,"a25_29":1306,"a30_34":1119,"a35_39":735,"a40_49":1503,"a50_64":3152},"race":{"total":29074,"white":15864,"black":9080,"asian":1849,"native":44,"pacific":10,"other":383,"multi":1844,"hispanic":1071},"marital":{"neverMarried":0.44563141139016627,"separated":0.011248673505482844,"divorced":0.13760169791298196},"obesity":0.313,"ll":[38.6649,-90.3249]},"63131":{"medHHIncome":209306,"eduShareBplus":0.8327937843962447,"eduShareGrad":0.4124312075105212,"eduShareAssoc":0.030025898348980253,"femIncome":{"zero":0.43969204448246363,"u75":0.31308810949529514,"b7599":0.05930995152552039,"p100":0.18790989449672085},"dist":{"p20":93857,"p40":165715,"p60":250001,"p80":250001,"p95":250001},"maleMedEarn":126875,"homeValue":734300,"grossRent":1999,"ownerCostMortgage":3380,"pop":17993,"women":{"a18_24":510,"a25_29":197,"a30_34":226,"a35_39":629,"a40_49":1333,"a50_64":1840},"race":{"total":17993,"white":15859,"black":205,"asian":794,"native":20,"pacific":0,"other":156,"multi":959,"hispanic":393},"marital":{"neverMarried":0.18406933553446142,"separated":0.0009629935341862705,"divorced":0.07139909203466777},"obesity":0.313,"ll":[38.6167,-90.4396]},"63132":{"medHHIncome":84034,"eduShareBplus":0.6197006176070344,"eduShareGrad":0.32743640741128444,"eduShareAssoc":0.06029519522663038,"femIncome":{"zero":0.29442925495557076,"u75":0.49487354750512647,"b7599":0.09125085440874915,"p100":0.11944634313055366},"dist":{"p20":35288,"p40":64443,"p60":109696,"p80":163729,"p95":250001},"maleMedEarn":56345,"homeValue":403600,"grossRent":1325,"ownerCostMortgage":1918,"pop":13953,"women":{"a18_24":599,"a25_29":309,"a30_34":512,"a35_39":493,"a40_49":1388,"a50_64":1100},"race":{"total":13953,"white":6933,"black":3884,"asian":2299,"native":2,"pacific":0,"other":69,"multi":766,"hispanic":204},"marital":{"neverMarried":0.31039653448850385,"separated":0.04231922692435855,"divorced":0.16377874041986004},"obesity":0.313,"ll":[38.6761,-90.3774]},"63133":{"medHHIncome":36927,"eduShareBplus":0.11246133451171011,"eduShareGrad":0.029606716747680072,"eduShareAssoc":0.051480335837384004,"femIncome":{"zero":0.37406143344709897,"u75":0.6088737201365187,"b7599":0.007849829351535836,"p100":0.009215017064846417},"dist":{"p20":12855,"p40":30534,"p60":48233,"p80":72194,"p95":107570},"maleMedEarn":33495,"homeValue":59200,"grossRent":1009,"ownerCostMortgage":1009,"pop":6375,"women":{"a18_24":267,"a25_29":245,"a30_34":200,"a35_39":326,"a40_49":251,"a50_64":950},"race":{"total":6375,"white":561,"black":5596,"asian":19,"native":0,"pacific":0,"other":8,"multi":191,"hispanic":54},"marital":{"neverMarried":0.5076297049847406,"separated":0.02271956595456087,"divorced":0.1268226517463547},"obesity":0.313,"ll":[38.6823,-90.3067]},"63134":{"medHHIncome":42222,"eduShareBplus":0.17142857142857143,"eduShareGrad":0.059764089121887284,"eduShareAssoc":0.09148099606815203,"femIncome":{"zero":0.3085553997194951,"u75":0.6746143057503506,"b7599":0.011019835704267681,"p100":0.005810458825886596},"dist":{"p20":20598,"p40":36095,"p60":59583,"p80":84520,"p95":132153},"maleMedEarn":37431,"homeValue":92000,"grossRent":1107,"ownerCostMortgage":1103,"pop":13460,"women":{"a18_24":683,"a25_29":346,"a30_34":362,"a35_39":641,"a40_49":813,"a50_64":1207},"race":{"total":13460,"white":2330,"black":8851,"asian":39,"native":68,"pacific":1,"other":1294,"multi":877,"hispanic":1701},"marital":{"neverMarried":0.494990366088632,"separated":0.03795761078998073,"divorced":0.16184971098265896},"obesity":0.313,"ll":[38.7402,-90.3458]},"63135":{"medHHIncome":55179,"eduShareBplus":0.2396026391874861,"eduShareGrad":0.081251390021499,"eduShareAssoc":0.09207502409370598,"femIncome":{"zero":0.3152610441767068,"u75":0.6027639971651311,"b7599":0.04890148830616584,"p100":0.03307347035199622},"dist":{"p20":26485,"p40":44009,"p60":65021,"p80":92331,"p95":170708},"maleMedEarn":36727,"homeValue":95500,"grossRent":1115,"ownerCostMortgage":1265,"pop":19446,"women":{"a18_24":599,"a25_29":695,"a30_34":852,"a35_39":657,"a40_49":1538,"a50_64":2110},"race":{"total":19446,"white":5524,"black":12967,"asian":73,"native":13,"pacific":0,"other":267,"multi":602,"hispanic":368},"marital":{"neverMarried":0.4145681336785126,"separated":0.03341962814779948,"divorced":0.17074605789597552},"obesity":0.313,"ll":[38.751,-90.2995]},"63136":{"medHHIncome":40388,"eduShareBplus":0.11549243821468093,"eduShareGrad":0.03983769826632239,"eduShareAssoc":0.09302840280339358,"femIncome":{"zero":0.38218160440382665,"u75":0.588477366255144,"b7599":0.016300571856127412,"p100":0.01304045748490193},"dist":{"p20":17270,"p40":32697,"p60":49943,"p80":75560,"p95":131078},"maleMedEarn":30913,"homeValue":77300,"grossRent":1029,"ownerCostMortgage":1067,"pop":41314,"women":{"a18_24":1782,"a25_29":1473,"a30_34":1867,"a35_39":1245,"a40_49":2262,"a50_64":4808},"race":{"total":41314,"white":2294,"black":37366,"asian":143,"native":48,"pacific":0,"other":279,"multi":1184,"hispanic":186},"marital":{"neverMarried":0.4931117888316332,"separated":0.05189820170364917,"divorced":0.16557997686402356},"obesity":0.313,"ll":[38.7448,-90.2599]},"63137":{"medHHIncome":45597,"eduShareBplus":0.14650231608699066,"eduShareGrad":0.05935463609955249,"eduShareAssoc":0.09766821072466043,"femIncome":{"zero":0.4148767804657472,"u75":0.5359484512774135,"b7599":0.028261361067148993,"p100":0.020913407189690255},"dist":{"p20":18285,"p40":36019,"p60":54386,"p80":82615,"p95":127536},"maleMedEarn":36475,"homeValue":79400,"grossRent":1017,"ownerCostMortgage":1053,"pop":19690,"women":{"a18_24":829,"a25_29":498,"a30_34":668,"a35_39":1005,"a40_49":1451,"a50_64":1949},"race":{"total":19690,"white":2561,"black":16254,"asian":31,"native":0,"pacific":39,"other":184,"multi":621,"hispanic":58},"marital":{"neverMarried":0.4343805704099822,"separated":0.059269162210338684,"divorced":0.15006684491978609},"obesity":0.313,"ll":[38.7497,-90.213]},"63138":{"medHHIncome":51714,"eduShareBplus":0.1486979598606734,"eduShareGrad":0.06734118427599933,"eduShareAssoc":0.08741084757007796,"femIncome":{"zero":0.2963235294117647,"u75":0.6165441176470589,"b7599":0.05747549019607843,"p100":0.029656862745098038},"dist":{"p20":20323,"p40":40561,"p60":63571,"p80":98347,"p95":169986},"maleMedEarn":35859,"homeValue":124500,"grossRent":1073,"ownerCostMortgage":1311,"pop":18736,"women":{"a18_24":1021,"a25_29":863,"a30_34":758,"a35_39":350,"a40_49":1263,"a50_64":2274},"race":{"total":18736,"white":2656,"black":15119,"asian":31,"native":16,"pacific":0,"other":203,"multi":711,"hispanic":209},"marital":{"neverMarried":0.41304869273207007,"separated":0.0440153514032142,"divorced":0.15591268889421925},"obesity":0.313,"ll":[38.8011,-90.1924]},"63139":{"medHHIncome":74749,"eduShareBplus":0.4944998281196287,"eduShareGrad":0.18522974676291967,"eduShareAssoc":0.057751804743898245,"femIncome":{"zero":0.21943844492440603,"u75":0.5971922246220303,"b7599":0.09341252699784017,"p100":0.08995680345572354},"dist":{"p20":40603,"p40":63452,"p60":91039,"p80":136159,"p95":216983},"maleMedEarn":58077,"homeValue":199400,"grossRent":1086,"ownerCostMortgage":1442,"pop":21811,"women":{"a18_24":422,"a25_29":1550,"a30_34":1499,"a35_39":1078,"a40_49":1221,"a50_64":1675},"race":{"total":21811,"white":15873,"black":3519,"asian":701,"native":64,"pacific":0,"other":181,"multi":1473,"hispanic":1152},"marital":{"neverMarried":0.3873246975698533,"separated":0.009634942725618241,"divorced":0.1304999464725404},"obesity":0.37,"ll":[38.6104,-90.2918]},"63140":{"medHHIncome":43438,"eduShareBplus":0.41818181818181815,"eduShareGrad":0.296969696969697,"eduShareAssoc":0.006060606060606061,"femIncome":{"zero":0.12834224598930483,"u75":0.6951871657754011,"b7599":0.17647058823529413,"p100":0},"dist":{"p20":21688,"p40":36955,"p60":65438,"p80":99500,"p95":102046},"maleMedEarn":24821,"homeValue":84000,"grossRent":833,"ownerCostMortgage":null,"pop":350,"women":{"a18_24":76,"a25_29":12,"a30_34":23,"a35_39":37,"a40_49":10,"a50_64":7},"race":{"total":350,"white":137,"black":161,"asian":3,"native":5,"pacific":8,"other":2,"multi":34,"hispanic":53},"marital":{"neverMarried":0.7486631016042781,"separated":0.0106951871657754,"divorced":0.0748663101604278},"obesity":0.313,"ll":[38.7394,-90.324]},"63141":{"medHHIncome":122917,"eduShareBplus":0.6905550672706375,"eduShareGrad":0.35075383679264416,"eduShareAssoc":0.060036508687715505,"femIncome":{"zero":0.40010615711252656,"u75":0.41167728237791934,"b7599":0.06953290870488323,"p100":0.11868365180467091},"dist":{"p20":39663,"p40":89207,"p60":151856,"p80":250001,"p95":250001},"maleMedEarn":84236,"homeValue":571900,"grossRent":1456,"ownerCostMortgage":3131,"pop":20640,"women":{"a18_24":1091,"a25_29":1082,"a30_34":345,"a35_39":455,"a40_49":1092,"a50_64":2022},"race":{"total":20640,"white":15431,"black":1410,"asian":2107,"native":10,"pacific":0,"other":310,"multi":1372,"hispanic":682},"marital":{"neverMarried":0.29600921755525295,"separated":0.0024091337592961138,"divorced":0.11301979679480464},"obesity":0.313,"ll":[38.658,-90.4554]},"63143":{"medHHIncome":65712,"eduShareBplus":0.5452318995867136,"eduShareGrad":0.22011327108525947,"eduShareAssoc":0.05127812643502219,"femIncome":{"zero":0.14303861788617886,"u75":0.6864837398373984,"b7599":0.10111788617886179,"p100":0.06935975609756098},"dist":{"p20":32706,"p40":47493,"p60":76750,"p80":118813,"p95":203897},"maleMedEarn":56900,"homeValue":226300,"grossRent":900,"ownerCostMortgage":1566,"pop":8968,"women":{"a18_24":418,"a25_29":674,"a30_34":577,"a35_39":360,"a40_49":728,"a50_64":721},"race":{"total":8968,"white":6784,"black":749,"asian":251,"native":0,"pacific":0,"other":140,"multi":1044,"hispanic":364},"marital":{"neverMarried":0.4933232552280171,"separated":0.027714789619551525,"divorced":0.09246661627614008},"obesity":0.313,"ll":[38.6117,-90.3214]},"63144":{"medHHIncome":91312,"eduShareBplus":0.7543561410964726,"eduShareGrad":0.3955234452472022,"eduShareAssoc":0.032299192520186995,"femIncome":{"zero":0.23737864077669904,"u75":0.46067961165048543,"b7599":0.11747572815533981,"p100":0.18446601941747573},"dist":{"p20":48020,"p40":77584,"p60":112514,"p80":191500,"p95":250001},"maleMedEarn":82679,"homeValue":278800,"grossRent":1429,"ownerCostMortgage":1755,"pop":9580,"women":{"a18_24":468,"a25_29":695,"a30_34":403,"a35_39":286,"a40_49":783,"a50_64":744},"race":{"total":9580,"white":7524,"black":434,"asian":626,"native":13,"pacific":0,"other":37,"multi":946,"hispanic":200},"marital":{"neverMarried":0.3512357414448669,"separated":0.019724334600760455,"divorced":0.1328422053231939},"obesity":0.313,"ll":[38.6194,-90.3482]},"63146":{"medHHIncome":85724,"eduShareBplus":0.6225715294948782,"eduShareGrad":0.2932267749911692,"eduShareAssoc":0.08128753090780642,"femIncome":{"zero":0.34832501781895936,"u75":0.4302209550962224,"b7599":0.09265858873841767,"p100":0.12879543834640056},"dist":{"p20":40059,"p40":71356,"p60":104308,"p80":161913,"p95":250001},"maleMedEarn":75291,"homeValue":283600,"grossRent":1315,"ownerCostMortgage":1803,"pop":30917,"women":{"a18_24":1140,"a25_29":1599,"a30_34":1221,"a35_39":1012,"a40_49":2013,"a50_64":2445},"race":{"total":30917,"white":19803,"black":4145,"asian":5332,"native":52,"pacific":2,"other":257,"multi":1326,"hispanic":883},"marital":{"neverMarried":0.3096514745308311,"separated":0.006914068011852688,"divorced":0.1235360519260618},"obesity":0.313,"ll":[38.701,-90.4803]},"63147":{"medHHIncome":39119,"eduShareBplus":0.11936936936936937,"eduShareGrad":0.0544005544005544,"eduShareAssoc":0.06860706860706861,"femIncome":{"zero":0.42100840336134454,"u75":0.5375350140056022,"b7599":0.0350140056022409,"p100":0.006442577030812325},"dist":{"p20":17531,"p40":29272,"p60":46674,"p80":78458,"p95":133409},"maleMedEarn":26856,"homeValue":70300,"grossRent":926,"ownerCostMortgage":1052,"pop":8229,"women":{"a18_24":184,"a25_29":91,"a30_34":199,"a35_39":200,"a40_49":607,"a50_64":1198},"race":{"total":8229,"white":392,"black":7612,"asian":0,"native":21,"pacific":0,"other":1,"multi":203,"hispanic":6},"marital":{"neverMarried":0.47395273899033297,"separated":0.02497314715359828,"divorced":0.18152524167561762},"obesity":0.37,"ll":[38.6938,-90.2153]},"63301":{"medHHIncome":83551,"eduShareBplus":0.38537790780242565,"eduShareGrad":0.14945891442042775,"eduShareAssoc":0.09387337745334734,"femIncome":{"zero":0.36478815675945686,"u75":0.5096498796603243,"b7599":0.05948866990599882,"p100":0.06607329367422006},"dist":{"p20":41089,"p40":65046,"p60":102262,"p80":149321,"p95":236933},"maleMedEarn":53968,"homeValue":249400,"grossRent":1093,"ownerCostMortgage":1631,"pop":51625,"women":{"a18_24":3621,"a25_29":1644,"a30_34":2041,"a35_39":1757,"a40_49":2439,"a50_64":4670},"race":{"total":51625,"white":42372,"black":3528,"asian":1178,"native":40,"pacific":77,"other":1050,"multi":3380,"hispanic":3369},"marital":{"neverMarried":0.329602157788267,"separated":0.013800854124522364,"divorced":0.12659024499887614},"obesity":0.35700000000000004,"ll":[38.858,-90.4633]},"63303":{"medHHIncome":98031,"eduShareBplus":0.5014155394778232,"eduShareGrad":0.1908547570705482,"eduShareAssoc":0.08032829077182647,"femIncome":{"zero":0.32836347151563994,"u75":0.49861481891905507,"b7599":0.08502493325945701,"p100":0.08799677630584798},"dist":{"p20":49698,"p40":80388,"p60":118492,"p80":185312,"p95":250001},"maleMedEarn":71616,"homeValue":301700,"grossRent":1329,"ownerCostMortgage":1808,"pop":46627,"women":{"a18_24":1398,"a25_29":2289,"a30_34":1538,"a35_39":1719,"a40_49":2353,"a50_64":5103},"race":{"total":46627,"white":37226,"black":3045,"asian":2594,"native":89,"pacific":41,"other":1048,"multi":2584,"hispanic":2269},"marital":{"neverMarried":0.23854628844907522,"separated":0.006929557804476794,"divorced":0.12712498130514982},"obesity":0.35700000000000004,"ll":[38.7398,-90.5437]},"63304":{"medHHIncome":114124,"eduShareBplus":0.4802670918875822,"eduShareGrad":0.18201448408743606,"eduShareAssoc":0.08790113613713374,"femIncome":{"zero":0.3350317742027824,"u75":0.4752390221560657,"b7599":0.07202152630674988,"p100":0.11770767733440202},"dist":{"p20":62834,"p40":95391,"p60":138217,"p80":205726,"p95":250001},"maleMedEarn":70777,"homeValue":331300,"grossRent":1618,"ownerCostMortgage":1877,"pop":43389,"women":{"a18_24":1578,"a25_29":875,"a30_34":1371,"a35_39":1256,"a40_49":3070,"a50_64":4516},"race":{"total":43389,"white":38480,"black":1905,"asian":790,"native":35,"pacific":0,"other":340,"multi":1839,"hispanic":1814},"marital":{"neverMarried":0.22375612779624726,"separated":0.0060855355834788976,"divorced":0.08762044289175636},"obesity":0.35700000000000004,"ll":[38.7061,-90.686]},"63332":{"medHHIncome":137083,"eduShareBplus":0.2950391644908616,"eduShareGrad":0.13577023498694518,"eduShareAssoc":0.1496953872932985,"femIncome":{"zero":0.29402985074626864,"u75":0.5686567164179105,"b7599":0.034328358208955224,"p100":0.10298507462686567},"dist":{"p20":64583,"p40":112976,"p60":157500,"p80":183571,"p95":250001},"maleMedEarn":77500,"homeValue":385600,"grossRent":null,"ownerCostMortgage":2354,"pop":1676,"women":{"a18_24":69,"a25_29":19,"a30_34":4,"a35_39":38,"a40_49":162,"a50_64":146},"race":{"total":1676,"white":1617,"black":1,"asian":2,"native":0,"pacific":0,"other":47,"multi":9,"hispanic":63},"marital":{"neverMarried":0.259946949602122,"separated":0,"divorced":0.09283819628647215},"obesity":0.35700000000000004,"ll":[38.5969,-90.894]},"63341":{"medHHIncome":177583,"eduShareBplus":0.5387409200968523,"eduShareGrad":0.2824858757062147,"eduShareAssoc":0.059322033898305086,"femIncome":{"zero":0.4016212232866618,"u75":0.3072955047899779,"b7599":0.06632277081798084,"p100":0.2247605011053795},"dist":{"p20":84319,"p40":149833,"p60":202864,"p80":250001,"p95":250001},"maleMedEarn":100156,"homeValue":552600,"grossRent":1086,"ownerCostMortgage":2897,"pop":3554,"women":{"a18_24":86,"a25_29":64,"a30_34":58,"a35_39":69,"a40_49":272,"a50_64":526},"race":{"total":3554,"white":3300,"black":10,"asian":0,"native":0,"pacific":0,"other":76,"multi":168,"hispanic":84},"marital":{"neverMarried":0.2180349932705249,"separated":0,"divorced":0.06460296096904442},"obesity":0.35700000000000004,"ll":[38.6606,-90.8068]},"63347":{"medHHIncome":78144,"eduShareBplus":0.06646153846153846,"eduShareGrad":0.032,"eduShareAssoc":0.11015384615384616,"femIncome":{"zero":0.3823870220162225,"u75":0.5770567786790266,"b7599":0.030127462340672075,"p100":0.010428736964078795},"dist":{"p20":39333,"p40":53333,"p60":87639,"p80":128194,"p95":154458},"maleMedEarn":54432,"homeValue":166400,"grossRent":871,"ownerCostMortgage":1182,"pop":2627,"women":{"a18_24":87,"a25_29":84,"a30_34":29,"a35_39":98,"a40_49":79,"a50_64":320},"race":{"total":2627,"white":2421,"black":73,"asian":0,"native":0,"pacific":0,"other":79,"multi":54,"hispanic":79},"marital":{"neverMarried":0.28751431844215347,"separated":0.010309278350515464,"divorced":0.06300114547537228},"obesity":0.39899999999999997,"ll":[39.0655,-90.7692]},"63348":{"medHHIncome":106458,"eduShareBplus":0.3238612620142081,"eduShareGrad":0.09569577935645633,"eduShareAssoc":0.0913776291962669,"femIncome":{"zero":0.29609976120986997,"u75":0.5730963120191032,"b7599":0.06022817723534094,"p100":0.07057574953568586},"dist":{"p20":56566,"p40":86748,"p60":125167,"p80":168845,"p95":250001},"maleMedEarn":65707,"homeValue":364900,"grossRent":1602,"ownerCostMortgage":1863,"pop":10207,"women":{"a18_24":290,"a25_29":199,"a30_34":191,"a35_39":234,"a40_49":761,"a50_64":1156},"race":{"total":10207,"white":9713,"black":201,"asian":9,"native":0,"pacific":0,"other":22,"multi":262,"hispanic":62},"marital":{"neverMarried":0.17384535547483135,"separated":0.01634665282823041,"divorced":0.04488842760768033},"obesity":0.39899999999999997,"ll":[38.7854,-90.9452]},"63362":{"medHHIncome":85300,"eduShareBplus":0.19578518014955812,"eduShareGrad":0.058123725356900066,"eduShareAssoc":0.0783480625424881,"femIncome":{"zero":0.3083466241360978,"u75":0.5970228601807549,"b7599":0.04811270600744285,"p100":0.04651780967570441},"dist":{"p20":41482,"p40":69653,"p60":99325,"p80":133295,"p95":224394},"maleMedEarn":59508,"homeValue":225000,"grossRent":994,"ownerCostMortgage":1414,"pop":9247,"women":{"a18_24":570,"a25_29":443,"a30_34":578,"a35_39":304,"a40_49":487,"a50_64":732},"race":{"total":9247,"white":8490,"black":352,"asian":20,"native":6,"pacific":0,"other":2,"multi":377,"hispanic":433},"marital":{"neverMarried":0.2608811040339703,"separated":0,"divorced":0.19904458598726116},"obesity":0.39899999999999997,"ll":[38.9358,-90.8955]},"63365":{"medHHIncome":41125,"eduShareBplus":0.13725490196078433,"eduShareGrad":0.058823529411764705,"eduShareAssoc":0.19607843137254902,"femIncome":{"zero":0.896551724137931,"u75":0.10344827586206896,"b7599":0,"p100":0},"dist":{"p20":36450,"p40":40400,"p60":41850,"p80":54500,"p95":250001},"maleMedEarn":91250,"homeValue":null,"grossRent":null,"ownerCostMortgage":null,"pop":56,"women":{"a18_24":0,"a25_29":0,"a30_34":0,"a35_39":2,"a40_49":0,"a50_64":3},"race":{"total":56,"white":49,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":7,"hispanic":0},"marital":{"neverMarried":0,"separated":0,"divorced":0},"obesity":0.35700000000000004,"ll":[38.7096,-90.8734]},"63366":{"medHHIncome":98237,"eduShareBplus":0.3428815504952081,"eduShareGrad":0.12013134360233856,"eduShareAssoc":0.08040791265116527,"femIncome":{"zero":0.3124663435648896,"u75":0.5395350924430085,"b7599":0.07642254532399928,"p100":0.07157601866810268},"dist":{"p20":44393,"p40":77428,"p60":118584,"p80":170132,"p95":250001},"maleMedEarn":59863,"homeValue":283900,"grossRent":1274,"ownerCostMortgage":1771,"pop":54449,"women":{"a18_24":2037,"a25_29":1446,"a30_34":1932,"a35_39":2031,"a40_49":3476,"a50_64":5521},"race":{"total":54449,"white":44927,"black":2757,"asian":1537,"native":18,"pacific":0,"other":601,"multi":4609,"hispanic":3107},"marital":{"neverMarried":0.23586951710706855,"separated":0.010844066746337361,"divorced":0.13349267472225912},"obesity":0.35700000000000004,"ll":[38.8575,-90.7253]},"63367":{"medHHIncome":134932,"eduShareBplus":0.4864707130730051,"eduShareGrad":0.17153013582342955,"eduShareAssoc":0.10027589134125636,"femIncome":{"zero":0.3027933942375263,"u75":0.48533028812368234,"b7599":0.08169360505973296,"p100":0.13018271257905834},"dist":{"p20":58547,"p40":110204,"p60":155309,"p80":214087,"p95":250001},"maleMedEarn":73778,"homeValue":381000,"grossRent":1654,"ownerCostMortgage":2154,"pop":27893,"women":{"a18_24":881,"a25_29":833,"a30_34":735,"a35_39":1241,"a40_49":1791,"a50_64":2917},"race":{"total":27893,"white":24113,"black":1426,"asian":469,"native":14,"pacific":0,"other":249,"multi":1622,"hispanic":916},"marital":{"neverMarried":0.221403174052554,"separated":0.0059838695689879455,"divorced":0.1279160523805394},"obesity":0.35700000000000004,"ll":[38.7742,-90.7951]},"63368":{"medHHIncome":118811,"eduShareBplus":0.4874800383264133,"eduShareGrad":0.17524752475247524,"eduShareAssoc":0.09198339188757586,"femIncome":{"zero":0.28937527496700394,"u75":0.4941157061152662,"b7599":0.11361636603607567,"p100":0.1028926528816542},"dist":{"p20":62266,"p40":99906,"p60":139539,"p80":197921,"p95":250001},"maleMedEarn":70026,"homeValue":327700,"grossRent":1442,"ownerCostMortgage":1929,"pop":45862,"women":{"a18_24":1657,"a25_29":1420,"a30_34":1712,"a35_39":1539,"a40_49":3082,"a50_64":4988},"race":{"total":45862,"white":38730,"black":1703,"asian":2517,"native":35,"pacific":40,"other":679,"multi":2158,"hispanic":1534},"marital":{"neverMarried":0.23397679210497777,"separated":0.007862487799587897,"divorced":0.11999783103784839},"obesity":0.35700000000000004,"ll":[38.7515,-90.7284]},"63369":{"medHHIncome":94079,"eduShareBplus":0.18666666666666668,"eduShareGrad":0.056,"eduShareAssoc":0.1056,"femIncome":{"zero":0.36607142857142855,"u75":0.5691964285714286,"b7599":0.006696428571428571,"p100":0.05803571428571429},"dist":{"p20":44563,"p40":83087,"p60":105265,"p80":154500,"p95":250001},"maleMedEarn":81202,"homeValue":320200,"grossRent":1251,"ownerCostMortgage":1824,"pop":2984,"women":{"a18_24":267,"a25_29":122,"a30_34":75,"a35_39":80,"a40_49":336,"a50_64":161},"race":{"total":2984,"white":2849,"black":33,"asian":0,"native":6,"pacific":2,"other":0,"multi":94,"hispanic":2},"marital":{"neverMarried":0.29376854599406527,"separated":0.040059347181008904,"divorced":0.11943620178041543},"obesity":0.39899999999999997,"ll":[38.9384,-90.7764]},"63373":{"medHHIncome":77250,"eduShareBplus":0.2376599634369287,"eduShareGrad":0.08409506398537477,"eduShareAssoc":0.06946983546617916,"femIncome":{"zero":0.29245283018867924,"u75":0.4968553459119497,"b7599":0.07861635220125786,"p100":0.1320754716981132},"dist":{"p20":38444,"p40":58167,"p60":98500,"p80":146547,"p95":241817},"maleMedEarn":36781,"homeValue":206500,"grossRent":1035,"ownerCostMortgage":1546,"pop":717,"women":{"a18_24":50,"a25_29":17,"a30_34":24,"a35_39":18,"a40_49":27,"a50_64":117},"race":{"total":717,"white":657,"black":6,"asian":2,"native":0,"pacific":0,"other":0,"multi":52,"hispanic":38},"marital":{"neverMarried":0.279874213836478,"separated":0,"divorced":0.03773584905660377},"obesity":0.35700000000000004,"ll":[38.9295,-90.3853]},"63376":{"medHHIncome":94921,"eduShareBplus":0.3911359969630825,"eduShareGrad":0.14677802030938597,"eduShareAssoc":0.09441017367372118,"femIncome":{"zero":0.32471346026333237,"u75":0.5340216601938682,"b7599":0.07129550693063054,"p100":0.06996937261216886},"dist":{"p20":46600,"p40":76045,"p60":112150,"p80":160355,"p95":248875},"maleMedEarn":58654,"homeValue":255500,"grossRent":1319,"ownerCostMortgage":1606,"pop":74876,"women":{"a18_24":2963,"a25_29":1985,"a30_34":2262,"a35_39":2603,"a40_49":5307,"a50_64":8120},"race":{"total":74876,"white":64737,"black":3479,"asian":1582,"native":91,"pacific":21,"other":488,"multi":4478,"hispanic":1825},"marital":{"neverMarried":0.2619919329816941,"separated":0.00952528699968973,"divorced":0.11960905988209743},"obesity":0.35700000000000004,"ll":[38.8007,-90.6121]},"63385":{"medHHIncome":111851,"eduShareBplus":0.3911876330648894,"eduShareGrad":0.1327717609306057,"eduShareAssoc":0.10839581597704341,"femIncome":{"zero":0.3083907493457245,"u75":0.5208567003151204,"b7599":0.09416226032152968,"p100":0.07659029001762538},"dist":{"p20":54519,"p40":94199,"p60":128170,"p80":182340,"p95":250001},"maleMedEarn":72161,"homeValue":321300,"grossRent":1221,"ownerCostMortgage":1938,"pop":50420,"women":{"a18_24":1597,"a25_29":1044,"a30_34":1563,"a35_39":1778,"a40_49":4282,"a50_64":3991},"race":{"total":50420,"white":44065,"black":2629,"asian":1105,"native":14,"pacific":0,"other":253,"multi":2354,"hispanic":1489},"marital":{"neverMarried":0.22304176189486807,"separated":0.011115728236027425,"divorced":0.09910658632869312},"obesity":0.35700000000000004,"ll":[38.797,-90.8572]},"63386":{"medHHIncome":125313,"eduShareBplus":0.20718232044198895,"eduShareGrad":0.03038674033149171,"eduShareAssoc":0.052486187845303865,"femIncome":{"zero":0.25,"u75":0.609375,"b7599":0.13541666666666666,"p100":0.005208333333333333},"dist":{"p20":48857,"p40":85800,"p60":140025,"p80":142138,"p95":232888},"maleMedEarn":53864,"homeValue":156300,"grossRent":1313,"ownerCostMortgage":1181,"pop":537,"women":{"a18_24":13,"a25_29":8,"a30_34":27,"a35_39":54,"a40_49":14,"a50_64":47},"race":{"total":537,"white":527,"black":8,"asian":0,"native":0,"pacific":0,"other":0,"multi":2,"hispanic":0},"marital":{"neverMarried":0.2358974358974359,"separated":0,"divorced":0.09743589743589744},"obesity":0.35700000000000004,"ll":[38.8702,-90.2195]},"63389":{"medHHIncome":92646,"eduShareBplus":0.14416058394160583,"eduShareGrad":0.033657745336577456,"eduShareAssoc":0.08231954582319546,"femIncome":{"zero":0.3748507759649821,"u75":0.5487465181058496,"b7599":0.03939514524472742,"p100":0.03700756068444091},"dist":{"p20":46448,"p40":73595,"p60":105770,"p80":128200,"p95":212664},"maleMedEarn":49849,"homeValue":218500,"grossRent":941,"ownerCostMortgage":1546,"pop":7159,"women":{"a18_24":169,"a25_29":278,"a30_34":174,"a35_39":278,"a40_49":404,"a50_64":711},"race":{"total":7159,"white":6618,"black":15,"asian":62,"native":2,"pacific":0,"other":31,"multi":431,"hispanic":248},"marital":{"neverMarried":0.1615566037735849,"separated":0.008254716981132075,"divorced":0.0915880503144654},"obesity":0.39899999999999997,"ll":[39.0005,-90.7728]},"63626":{"medHHIncome":80129,"eduShareBplus":0.023809523809523808,"eduShareGrad":0,"eduShareAssoc":0.07738095238095238,"femIncome":{"zero":0.4107883817427386,"u75":0.5892116182572614,"b7599":0,"p100":0},"dist":{"p20":41625,"p40":63054,"p60":81059,"p80":86676,"p95":238243},"maleMedEarn":36607,"homeValue":118200,"grossRent":null,"ownerCostMortgage":1177,"pop":694,"women":{"a18_24":0,"a25_29":0,"a30_34":29,"a35_39":76,"a40_49":68,"a50_64":39},"race":{"total":694,"white":694,"black":0,"asian":0,"native":0,"pacific":0,"other":0,"multi":0,"hispanic":0},"marital":{"neverMarried":0.07468879668049792,"separated":0,"divorced":0.16182572614107885},"obesity":0.40299999999999997,"ll":[38.0727,-90.7098]},"63627":{"medHHIncome":86985,"eduShareBplus":0.16466083150984684,"eduShareGrad":0.05196936542669584,"eduShareAssoc":0.1274617067833698,"femIncome":{"zero":0.157644824311491,"u75":0.691358024691358,"b7599":0.05413105413105413,"p100":0.09686609686609686},"dist":{"p20":35486,"p40":65833,"p60":114138,"p80":157351,"p95":213854},"maleMedEarn":58079,"homeValue":241400,"grossRent":825,"ownerCostMortgage":1193,"pop":2856,"women":{"a18_24":135,"a25_29":35,"a30_34":49,"a35_39":128,"a40_49":204,"a50_64":326},"race":{"total":2856,"white":2731,"black":62,"asian":0,"native":0,"pacific":0,"other":0,"multi":63,"hispanic":25},"marital":{"neverMarried":0.27085285848172447,"separated":0.0037488284910965324,"divorced":0.14526710402999063},"obesity":0.40299999999999997,"ll":[38.0383,-90.2522]},"63628":{"medHHIncome":59237,"eduShareBplus":0.15506622795916647,"eduShareGrad":0.051548131274782756,"eduShareAssoc":0.10343372985742007,"femIncome":{"zero":0.44297082228116713,"u75":0.4679045092838196,"b7599":0.06312997347480107,"p100":0.0259946949602122},"dist":{"p20":30322,"p40":47727,"p60":79402,"p80":119519,"p95":203317},"maleMedEarn":38091,"homeValue":171000,"grossRent":698,"ownerCostMortgage":1196,"pop":15864,"women":{"a18_24":328,"a25_29":577,"a30_34":339,"a35_39":282,"a40_49":874,"a50_64":1929},"race":{"total":15864,"white":13925,"black":862,"asian":173,"native":11,"pacific":0,"other":71,"multi":822,"hispanic":113},"marital":{"neverMarried":0.19097956307258632,"separated":0.0102184637068358,"divorced":0.13953488372093023},"obesity":0.40299999999999997,"ll":[37.9346,-90.5342]},"63630":{"medHHIncome":50896,"eduShareBplus":0.09743384121892543,"eduShareGrad":0.053728949478749,"eduShareAssoc":0.10425020048115477,"femIncome":{"zero":0.46875,"u75":0.4966755319148936,"b7599":0.003324468085106383,"p100":0.03125},"dist":{"p20":23000,"p40":42508,"p60":63914,"p80":102217,"p95":158072},"maleMedEarn":48750,"homeValue":111600,"grossRent":807,"ownerCostMortgage":1172,"pop":3765,"women":{"a18_24":73,"a25_29":110,"a30_34":58,"a35_39":234,"a40_49":244,"a50_64":510},"race":{"total":3765,"white":3627,"black":0,"asian":0,"native":0,"pacific":0,"other":27,"multi":111,"hispanic":41},"marital":{"neverMarried":0.21010638297872342,"separated":0.007978723404255319,"divorced":0.1283244680851064},"obesity":0.40299999999999997,"ll":[38.0279,-90.7194]},"63670":{"medHHIncome":60235,"eduShareBplus":0.18242782450556944,"eduShareGrad":0.07274380541032052,"eduShareAssoc":0.135485337576722,"femIncome":{"zero":0.39497041420118345,"u75":0.5285291631445478,"b7599":0.03994082840236687,"p100":0.036559594251901945},"dist":{"p20":30651,"p40":49005,"p60":72269,"p80":128909,"p95":217034},"maleMedEarn":45829,"homeValue":205700,"grossRent":769,"ownerCostMortgage":1252,"pop":12294,"women":{"a18_24":368,"a25_29":377,"a30_34":410,"a35_39":347,"a40_49":558,"a50_64":1292},"race":{"total":12294,"white":11472,"black":218,"asian":9,"native":14,"pacific":0,"other":33,"multi":548,"hispanic":203},"marital":{"neverMarried":0.23143032535297728,"separated":0.008594229588704727,"divorced":0.10108450992428893},"obesity":0.37200000000000005,"ll":[37.904,-90.1645]},"63673":{"medHHIncome":75000,"eduShareBplus":0.18250471994965387,"eduShareGrad":0.030207677784770296,"eduShareAssoc":0.05726872246696035,"femIncome":{"zero":0.3885135135135135,"u75":0.5180180180180181,"b7599":0.09234234234234234,"p100":0.0011261261261261261},"dist":{"p20":32611,"p40":56294,"p60":88682,"p80":153229,"p95":238708},"maleMedEarn":49972,"homeValue":217000,"grossRent":926,"ownerCostMortgage":1377,"pop":2350,"women":{"a18_24":67,"a25_29":48,"a30_34":74,"a35_39":90,"a40_49":124,"a50_64":230},"race":{"total":2350,"white":2287,"black":22,"asian":3,"native":0,"pacific":0,"other":0,"multi":38,"hispanic":3},"marital":{"neverMarried":0.23248407643312102,"separated":0.037154989384288746,"divorced":0.09978768577494693},"obesity":0.38799999999999996,"ll":[37.8418,-89.9911]}};

// ---- Styles ---------------------------------------------------------------

const INK = "var(--ink)";
const PAPER = "var(--paper)";
const LINE = "var(--line)";
const ACCENT = "var(--accent)";

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" style={{ display: "block" }} aria-hidden="true">
    <line x1="6" y1="2" x2="6" y2="10" />
    <line x1="2" y1="6" x2="10" y2="6" />
  </svg>
);

// Real Material Symbols Outlined "format_paint" glyph, served from the Google icon font
// (not a hand-drawn path). Colored by the accent variable; flips to olive with the theme.
const PaintBrushIcon = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 15, color: ACCENT, display: "block" }} aria-hidden="true">format_paint</span>
);


const VERDICT_STYLE = {
  clear: { background: "#13351f", color: "#dff0e4" },
  marginal: { background: "#3a3413", color: "#f0ead0" },
  below: { background: "var(--verdict-bg)", color: "var(--verdict-fg)" },
  fund: { background: "#1c1c24", color: "var(--paper4)", borderLeft: `4px solid ${ACCENT}` },
};

const S_ = {
  wrap: { minHeight: "100vh", background: PAPER, color: INK, fontFamily: "'Inter', system-ui, sans-serif", padding: "0 0 60px" },
  header: { padding: "40px 0 28px", borderBottom: `1px solid ${LINE}`, width: "100%", margin: "0 auto" },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  eyebrow: { fontSize: 11, letterSpacing: "0.28em", color: ACCENT, fontWeight: 600, marginBottom: 14 },
  formula: { margin: 0, fontFamily: "inherit", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 },
  empty: { border: `1px solid ${LINE}`, background: "var(--paper2)", padding: "20px 20px", textAlign: "left" },
  emptyHead: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 },
  emptyMark: { fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: ACCENT, lineHeight: 1, whiteSpace: "nowrap" },
  emptyTitle: { fontSize: 14, fontWeight: 600, color: INK },
  exCard: { border: `1px solid ${LINE}`, borderLeft: `3px solid ${ACCENT}`, background: "var(--surface)", padding: "13px 16px" },
  exCardTop: { display: "flex", flexDirection: "column", gap: 2, marginBottom: 7 },
  exCardLabel: { fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--warm3)", fontWeight: 600 },
  exCardLabelRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
  exVar: { fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, fontWeight: 600, whiteSpace: "nowrap" },
  exVarGate: { fontSize: 9.5, letterSpacing: "0.12em", color: "#fff", background: ACCENT, padding: "2px 6px", fontWeight: 700, whiteSpace: "nowrap" },
  exCardChoice: { fontSize: 14, fontWeight: 600, color: INK },
  exCardText: { fontSize: 12.5, color: "var(--warm1)", lineHeight: 1.5 },
  emptyText: { fontSize: 12.5, color: "var(--warm1)", marginTop: 8, lineHeight: 1.55 },
  explore: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  ladderWrap: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  resultRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" },
  calcCollapsed: { border: `1px solid ${LINE}`, background: "var(--paper2)", padding: "14px 18px", cursor: "pointer" },
  calcCollapsedRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  calcCollapsedTitle: { fontSize: 14, fontWeight: 600, color: INK },
  calcCollapsedSub: { fontSize: 12, color: "var(--warm2)", marginTop: 3 },
  fwWrap: { maxWidth: 1200, margin: "28px auto 0", padding: "0 32px" },
  fwPair: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, alignItems: "start" },
  fwQuad: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 28 },
  fwDuo: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 28, alignItems: "start" },
  fwDivider: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  fwDividerLine: { borderTop: `1px solid ${LINE}` },
  ladderHead: { marginBottom: 16 },
  ladderTitle: { margin: 0, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em" },
  ladderSub: { fontSize: 13, color: "var(--warm1)", marginTop: 8, lineHeight: 1.5, maxWidth: 760 },
  ladderTableWrap: { overflowX: "auto", border: `1px solid ${LINE}` },
  ladderTable: { width: "100%", borderCollapse: "collapse", fontSize: 13, background: "var(--surface)" },
  ladderTh: { textAlign: "left", padding: "11px 14px", borderBottom: `2px solid ${INK}`, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm1)", verticalAlign: "bottom" },
  ladderThR: { textAlign: "right", padding: "11px 14px", borderBottom: `2px solid ${INK}`, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm1)", verticalAlign: "bottom" },
  ladderThC: { textAlign: "center", padding: "11px 10px", borderBottom: `2px solid ${INK}`, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm1)", verticalAlign: "bottom" },
  ladderTdName: { padding: "11px 14px", borderBottom: `1px solid ${LINE}`, fontWeight: 600 },
  ladderTdR: { padding: "11px 14px", borderBottom: `1px solid ${LINE}`, textAlign: "right", fontFamily: "Georgia, serif", whiteSpace: "nowrap" },
  ladderTdC: { padding: "11px 10px", borderBottom: `1px solid ${LINE}`, textAlign: "center", color: "var(--warm1)" },
  ladderNote: { fontSize: 12, color: "var(--warm1)", marginTop: 12, lineHeight: 1.55 },
  availControls: { border: `1px solid ${LINE}`, padding: "14px 14px 4px", marginBottom: 14, background: "var(--paper2)" },
  availHdr: { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: INK, marginBottom: 10 },
  funnelWrap: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "8px 0" },
  funnelRow: { display: "grid", gridTemplateColumns: "1fr 2fr auto", alignItems: "center", gap: 12, padding: "8px 16px" },
  funnelLabel: { fontSize: 12.5, color: "var(--warmdk2)" },
  funnelBarTrack: { background: "var(--paper3)", height: 14, position: "relative" },
  funnelBar: { background: ACCENT, height: 14, transition: "width .3s" },
  funnelNum: { fontFamily: "Georgia, serif", fontSize: 14, textAlign: "right", minWidth: 70, fontVariantNumeric: "tabular-nums" },
  funnelFinal: { fontSize: 14, color: INK, marginTop: 12, lineHeight: 1.5 },
  availBox: { border: `2px solid ${INK}`, background: INK, color: "#fff", padding: "20px 24px", marginBottom: 16 },
  availBoxNum: { fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 400, letterSpacing: "-0.02em", whiteSpace: "nowrap" },
  availBoxNumLbl: { fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 500, color: "var(--warm5)", marginLeft: 10, letterSpacing: "0" },
  availBoxText: { fontSize: 13, color: "var(--warm5)", marginTop: 10, lineHeight: 1.55 },
  checksWrap: { display: "flex", flexWrap: "wrap", gap: 6 },
  checkChip: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 11px", border: `1px solid ${LINE}`, background: "#fff", borderRadius: 0, fontSize: 12.5, color: INK, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" },
  checkChipOn: { borderColor: ACCENT, background: "var(--accent-fill)", color: ACCENT, fontWeight: 600 },
  checkBox: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, border: `1px solid ${ACCENT}`, fontSize: 10, lineHeight: 1 },
  divorceWrap: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  divorceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 },
  divorceCard: { border: `1px solid ${LINE}`, padding: "18px 18px 16px", background: "var(--surface)" },
  divorceStat: { fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 400, color: ACCENT, letterSpacing: "-0.01em", lineHeight: 1.05 },
  divorceLabel: { fontSize: 13, fontWeight: 600, color: INK, marginTop: 6, lineHeight: 1.3 },
  divorceSrc: { fontSize: 11.5, color: "var(--warm1)", marginTop: 8, lineHeight: 1.5 },
  exploreHead: { marginBottom: 16 },
  exploreTitle: { margin: 0, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em" },
  exploreSub: { fontSize: 13, color: "var(--warm1)", marginTop: 8, lineHeight: 1.5 },
  exTableHead: { display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1.2fr 1fr 1fr", gap: 12, padding: "10px 14px", background: INK, color: "#fff", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 },
  exScroll: { border: `1px solid ${LINE}`, borderTop: "none", maxHeight: 520, overflowY: "auto", background: "var(--surface)" },
  exRow: { display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1.2fr 1fr 1fr", gap: 12, padding: "11px 14px", borderBottom: `1px solid #eceae3`, fontSize: 13, alignItems: "center" },
  exName: { fontWeight: 600 },
  exNum: { fontFamily: "Georgia, serif", fontSize: 14 },
  exDot: { display: "inline-block", width: 9, height: 9, borderRadius: 2, marginRight: 7, verticalAlign: "middle" },
  exploreNote: { fontSize: 12, color: "var(--warm2)", lineHeight: 1.6, marginTop: 14 },
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 },
  h1: { margin: 0, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 },
  subtitle: { fontSize: 16, letterSpacing: "normal", color: ACCENT, fontWeight: 400, fontFamily: "Georgia, serif", fontStyle: "italic" },
  eq: { fontFamily: "Georgia, serif" },
  eqVar: { fontFamily: "inherit", fontWeight: 400, fontSize: 12, color: INK },
  eqWord: { fontFamily: "inherit", fontSize: 18, lineHeight: 1, color: ACCENT },
  eqArrow: { display: "block", flex: "0 0 auto" },
  link: { color: "inherit", textDecoration: "none", fontWeight: 400 },
  tagline: { fontSize: 13, color: "var(--warm1)", lineHeight: 1.5 },
  formulaRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginTop: 6 },
  explainTabs: { display: "flex", justifyContent: "flex-end", gap: 20, flexWrap: "wrap" },
  explainTabOn: { color: ACCENT },
  explainPanel: { fontSize: 12, color: "var(--warm2)", lineHeight: 1.6, maxWidth: 1200, margin: "0 auto", padding: "16px 32px 20px" },
  chev: { display: "inline-block", fontSize: 16, lineHeight: 1, transition: "transform 0.18s" },
  explainP: { margin: 0, fontSize: 13, color: "var(--warm1)", lineHeight: 1.5 },
  grid: { display: "grid", gridTemplateColumns: "minmax(320px, 1fr) minmax(340px, 1.05fr)", gap: 28, maxWidth: 1200, margin: "28px auto 0", padding: "0 32px", alignItems: "start" },
  col: { display: "flex", flexDirection: "column", gap: 14 },
  accordion: { border: `1px solid ${LINE}`, background: "var(--paper2)" },
  accBtn: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" },
  accBtnOpen: { borderBottom: `1px solid ${LINE}`, background: "var(--surface)" },
  accLabel: { display: "block", fontSize: 16, fontWeight: 600 },
  accSub: { display: "block", fontSize: 12, color: "var(--warm4)", marginTop: 2 },
  chev: { fontSize: 22, color: ACCENT, fontWeight: 300 },
  accBody: { padding: "6px 18px 18px" },
  field: { padding: "30px 0", borderBottom: `1px solid #eceae3` },
  fieldLabelRow: { display: "flex", alignItems: "center", gap: 7, marginBottom: 10 },
  fieldLabel: { fontSize: 13, fontWeight: 600, lineHeight: 1.35 },
  fieldHint: { fontSize: 11.5, color: "var(--warm2)", marginTop: 6, lineHeight: 1.45 },
  infoBtn: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, flex: "0 0 16px", padding: 0, borderRadius: "50%", border: `1px solid #c9c2b6`, background: "none", color: "var(--warm3)", cursor: "pointer", lineHeight: 0 },
  pop: { position: "absolute", zIndex: 50, width: 260, background: "#fff", border: `1px solid ${INK}`, boxShadow: "0 8px 26px rgba(22,24,29,0.16)", padding: "13px 15px", fontSize: 12, lineHeight: 1.5, color: "var(--warmdk1)" },
  popArrow: { position: "absolute", width: 10, height: 10, background: "#fff", borderLeft: `1px solid ${INK}`, borderTop: `1px solid ${INK}`, transform: "rotate(45deg)" },
  select: { width: "100%", padding: "10px 36px 10px 12px", fontSize: 13, border: `1px solid ${LINE}`, borderRadius: 0, color: INK, fontFamily: "inherit", cursor: "pointer", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", backgroundColor: "#fff", backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23948b7f' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" },
  numInput: { width: "100%", padding: "10px 12px", fontSize: 15, border: `1px solid ${LINE}`, background: "#fff", borderRadius: 0, color: INK, fontFamily: "Georgia, serif", boxSizing: "border-box" },
  rangeWrap: { display: "flex", alignItems: "center", gap: 12 },
  range: { flex: 1, accentColor: ACCENT },
  rangeVal: { fontFamily: "Georgia, serif", fontSize: 15, minWidth: 64, textAlign: "right", whiteSpace: "nowrap" },
  dualWrap: { position: "relative", height: 28, flex: 1, display: "flex", alignItems: "center" },
  dualTrack: { position: "absolute", left: 0, right: 0, height: 4, background: LINE, borderRadius: 2 },
  dualFill: { position: "absolute", height: 4, background: ACCENT, borderRadius: 2 },
  dualInput: { position: "absolute", left: 0, right: 0, width: "100%", margin: 0, background: "transparent", appearance: "none", WebkitAppearance: "none", pointerEvents: "none", accentColor: ACCENT, height: 28 },
  disclaim: { fontSize: 11.5, color: "var(--warm2)", lineHeight: 1.55, padding: "4px 4px 0" },
  collapseLink: { display: "inline-flex", alignItems: "center", gap: 6, padding: 0, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, color: "var(--warm4)", letterSpacing: "0.01em" },
  collapseChev: { display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", transition: "transform 0.18s" },

  liveBox: { border: `1px solid ${ACCENT}`, background: "var(--accent-bg)", padding: "14px 14px 12px", marginTop: 14, marginBottom: 6 },
  liveTitle: { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: ACCENT, marginBottom: 10 },
  liveRow: { display: "flex", gap: 8 },
  liveInput: { flex: 1, padding: "9px 11px", fontSize: 13, border: `1px solid ${LINE}`, background: "#fff", borderRadius: 0, color: INK, fontFamily: "inherit", boxSizing: "border-box" },
  liveBtn: { padding: "9px 18px", fontSize: 13, fontWeight: 600, background: ACCENT, color: "#fff", border: "none", cursor: "pointer" },
  liveMsg: { fontSize: 12, marginTop: 8, lineHeight: 1.45 },
  liveStats: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 },
  liveStatBox: { background: "var(--accent-fill)", border: "1px solid var(--accent-fill2)", padding: "10px 12px", textAlign: "center" },
  liveStatNum: { fontFamily: "inherit", fontSize: 18, fontWeight: 700, color: ACCENT, lineHeight: 1.1 },
  liveStatLbl: { fontFamily: "inherit", fontSize: 10.5, color: "var(--accent-soft)", marginTop: 4, letterSpacing: "0.02em", textTransform: "uppercase" },
  liveHint: { fontSize: 11, color: "var(--warm3)", marginTop: 10, lineHeight: 1.5 },

  verdict: { padding: "22px 24px" },
  verdictLabel: { fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" },
  verdictNote: { fontSize: 13.5, marginTop: 8, opacity: 0.92, lineHeight: 1.5, fontFamily: "Georgia, serif" },

  priceCard: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "22px 24px" },
  cardTitle: { fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: ACCENT, fontWeight: 600 },
  liveBadge: { marginLeft: 10, color: "#1a6b4a", fontSize: 11, letterSpacing: "0.02em", textTransform: "none", fontWeight: 600 },
  defBadge: { marginLeft: 10, color: "var(--warm3)", fontSize: 10, letterSpacing: "0.05em", textTransform: "none" },
  bigNum: { fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 400, marginTop: 8, letterSpacing: "-0.02em" },
  perYr: { fontSize: 17, fontWeight: 500, letterSpacing: "0", color: "var(--warm2)", fontFamily: "Inter, sans-serif", marginLeft: 10 },
  ord: { fontSize: 20, color: "inherit", fontFamily: "Georgia, serif", marginLeft: 1 },
  band: { fontSize: 12.5, color: "var(--warm2)", marginTop: 6, marginBottom: 14 },
  grossLine: { fontSize: 13, color: "var(--warm1)", marginTop: 16, lineHeight: 1.55 },
  meansText: { fontSize: 13, color: "var(--warm1)", lineHeight: 1.55, marginTop: 14 },
  meansDivide: { borderTop: "1px solid #eceae3", margin: "14px 0 0" },

  barTrack: { position: "relative", height: 30, background: "var(--paper3)", border: `1px solid ${LINE}` },
  barBand: { position: "absolute", left: "8%", right: "8%", top: 0, bottom: 0, background: "var(--accent-band)" },
  barMid: { position: "absolute", top: -3, bottom: -3, width: 2, background: ACCENT },
  barDeliver: { position: "absolute", top: -5, bottom: -5, width: 3, transform: "translateX(-50%)" },

  tierTrack: { position: "relative", height: 30, background: "var(--paper3)", border: `1px solid ${LINE}`, marginTop: 4 },
  tierZone: { position: "absolute", top: 0, bottom: 0, background: "rgba(26,107,74,0.12)" },
  tierEntry: { position: "absolute", top: -3, bottom: -3, width: 2, background: ACCENT, transform: "translateX(-1px)" },
  tierYou: { position: "absolute", top: -5, bottom: -5, width: 3, transform: "translateX(-50%)" },
  tierScale: { display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--warm3)", marginTop: 5 },
  tierLegend: { display: "flex", gap: 18, fontSize: 11, color: "var(--warm1)", marginTop: 8, flexWrap: "wrap" },

  bottomLine: { border: `2px solid ${INK}`, background: INK, color: "#fff", padding: "20px 24px" },
  blLabel: { fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--warm6)", fontWeight: 600 },
  blNum: { fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 400, marginTop: 8, letterSpacing: "-0.02em" },
  blYr: { fontSize: 17, fontWeight: 500, letterSpacing: "0", color: "var(--warm6)", fontFamily: "Inter, sans-serif", marginLeft: 10 },
  blNote: { fontSize: 12.5, color: "var(--warm5)", marginTop: 12, lineHeight: 1.55 },
  blExplain: { border: `1px dashed ${LINE}`, background: "var(--paper2)", padding: "16px 18px", marginTop: 14, fontSize: 13, color: "var(--warm1)", lineHeight: 1.55 },
  term: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "14px 16px" },
  termHot: { borderColor: ACCENT, background: "var(--accent-bg)" },
  termVal: { fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400 },
  termLabel: { fontSize: 12, fontWeight: 600, marginTop: 4 },
  termNote: { fontSize: 11, color: "var(--warm2)", marginTop: 2 },

  vCard: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "18px 24px" },
  vRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid #eceae3`, fontSize: 13.5 },
  vRowLabel: { color: "var(--warm1)" },
  vRowVal: { fontFamily: "Georgia, serif", fontSize: 16 },
  vTotal: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 4, fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" },

  readout: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12 },
  footer: { width: "100%", margin: "32px auto 0", borderTop: `1px solid ${LINE}`, fontSize: 12, color: "var(--warm2)", lineHeight: 1.6 },
  footerInner: { maxWidth: 1200, margin: "0 auto", padding: "16px 32px 0" },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block');
  .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  * { box-sizing: border-box; }
  .rpm-glide { display: grid; grid-template-rows: 0fr; opacity: 0;
    transition: grid-template-rows 0.32s ease, opacity 0.32s ease; }
  .rpm-glide.open { grid-template-rows: 1fr; opacity: 1; }
  .rpm-glide > * { min-height: 0; overflow: hidden; }
  body { margin: 0; }
  select:focus, input:focus { outline: 2px solid ${ACCENT}; outline-offset: 1px; }
  .rpm-dd { position: relative; width: 100%; }
  .rpm-dd-btn { width: 100%; padding: 10px 36px 10px 12px; font-size: 13px; line-height: 1.4;
    border: 1px solid ${LINE}; border-radius: 0; background: #fff; font-family: inherit; cursor: pointer;
    text-align: left; color: ${INK}; position: relative; display: block; }
  .rpm-dd-btn[data-placeholder="true"] { color: var(--warm3); }
  .rpm-dd-btn:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 1px; }
  .rpm-dd-btn[aria-expanded="true"] { border-color: ${ACCENT}; }
  .rpm-dd-chev { position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    width: 12px; height: 12px; pointer-events: none; transition: transform 0.16s; }
  .rpm-dd-btn[aria-expanded="true"] .rpm-dd-chev { transform: translateY(-50%) rotate(180deg); }
  .rpm-dd-list { position: absolute; z-index: 40; left: 0; right: 0; top: calc(100% - 1px);
    background: #fff; border: 1px solid ${ACCENT}; max-height: 264px; overflow-y: auto;
    box-shadow: 0 6px 20px rgba(22,24,29,0.13); margin: 0; padding: 4px 0; list-style: none; }
  .rpm-dd-opt { padding: 9px 12px; font-size: 13px; line-height: 1.4; cursor: pointer; color: ${INK};
    display: block; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
  .rpm-dd-opt[data-active="true"] { background: ${PAPER}; }
  .rpm-dd-opt[aria-selected="true"] { font-weight: 600; box-shadow: inset 3px 0 0 ${ACCENT}; }
  .rpm-dd-opt:hover { background: ${PAPER}; }
  input[type=range].rpm-dual { pointer-events: none; }
  input[type=range].rpm-dual::-webkit-slider-thumb { pointer-events: auto; -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${ACCENT}; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.3); cursor: pointer; margin-top: -7px; }
  input[type=range].rpm-dual::-moz-range-thumb { pointer-events: auto; width: 18px; height: 18px; border-radius: 50%; background: ${ACCENT}; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.3); cursor: pointer; }
  input[type=range].rpm-dual::-webkit-slider-runnable-track { background: transparent; height: 4px; }
  input[type=range].rpm-dual::-moz-range-track { background: transparent; height: 4px; }
  a { font-weight: 400 !important; text-decoration: none; color: inherit; }
  a:hover { text-decoration: underline; font-weight: 400 !important; color: inherit; }
  .readout p, [style*="readout"] p { font-size: 13px; font-weight: 400; letter-spacing: 0; line-height: 1.55; color: var(--warm1); margin: 0;
    font-family: Inter, sans-serif; }
  .rpm-grid [style*="tierLegend"] i, span > i { display: inline-block; width: 11px; height: 11px; border-radius: 2px; margin-right: 5px; vertical-align: middle; }
  .rpm-field:last-child { border-bottom: none !important; padding-bottom: 4px !important; }
  @media (max-width: 880px) {
    .rpm-grid { grid-template-columns: 1fr !important; }
    .rpm-fwquad { grid-template-columns: 1fr 1fr !important; }
    .rpm-fwduo { grid-template-columns: 1fr !important; }
    .rpm-resultrow { grid-template-columns: 1fr !important; }
    .rpm-formula { display: none !important; }
  }
  @media (max-width: 560px) {
    .rpm-h1 { font-size: 20px !important; }
    .rpm-subtitle { display: none !important; }
    .rpm-formularow { margin-top: 18px !important; }
    .rpm-fwpair { grid-template-columns: 1fr !important; }
    .rpm-fwquad { grid-template-columns: 1fr 1fr !important; }
    .rpm-bignum { font-size: 30px !important; white-space: nowrap; }
    .rpm-bignum span { font-size: 13px !important; margin-left: 7px !important; }
  }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }

  /* Theme palettes. Default: warm beige + oxblood red accent. Olive: true greyscale
     (every beige tone mapped to neutral grey at the SAME lightness) + matte olive accent.
     Only the accent changes hue; the beige-to-grey conversion preserves the value scale. */
  .rpm-app {
    --ink: #16181d; --paper: #f3f1ec; --line: #d8d3c8; --accent: #9a3b2e; --surface: #fff;
    --accent-fill: rgba(154,59,46,0.07); --accent-fill2: rgba(154,59,46,0.18);
    --accent-band: rgba(154,59,46,0.1); --accent-soft: #7a4a44; --accent-bg: #fbf2f0;
    --accent-neg: #a3372b; --verdict-bg: #3a1614; --verdict-fg: #f3dcd8;
    --warm1: #56504a; --warm2: #948b7f; --warm3: #a08d88; --warm4: #857d72;
    --warm5: #d8cfc4; --warm6: #c9b9a8; --paper2: #faf8f3; --paper3: #eceae3;
    --paper4: #e6e0d8; --warmdk1: #3a352f; --warmdk2: #2e2a25;
    transition: --accent 0.4s ease;
  }
  .rpm-app.rpm-olive {
    --ink: #2b2b30; --paper: #edeef0; --line: #d6d6da; --accent: #4f7a6f; --surface: #f7f7f8;
    --accent-fill: rgba(79,122,111,0.12); --accent-fill2: rgba(79,122,111,0.26);
    --accent-band: rgba(79,122,111,0.14); --accent-soft: #3c5f56; --accent-bg: #eaf1ee;
    --accent-neg: #3c5f56; --verdict-bg: #24332e; --verdict-fg: #d6e4df;
    --warm1: #62626b; --warm2: #62626b; --warm3: #62626b; --warm4: #62626b;
    --warm5: #ececee; --warm6: #d6d7da; --paper2: #f7f7f8; --paper3: #edeef0;
    --paper4: #edeef0; --warmdk1: #2b2b30; --warmdk2: #2b2b30;
  }
`;


// ============================================================
// FEDERAL DATA LAYER (BUNDLED SNAPSHOT)
// Per-ZIP ACS 2023 5-year + CDC PLACES obesity, snapshotted into the data file by
// harvest_snapshot.mjs. No live API, no key, no network, no timeouts, no aborts.
// Re-run the harvest on a new ACS release to refresh. lookupZip returns the same
// object shape the old live pull produced, so all downstream code is unchanged.
// ============================================================

function lookupZip(zip) {
  const d = ZIP_DATA[zip];
  if (!d) return null;
  return {
    medHHIncome: d.medHHIncome,
    eduShareBplus: d.eduShareBplus,
    eduShareGrad: d.eduShareGrad,
    eduShareAssoc: d.eduShareAssoc,
    obesity: d.obesity,
    maleMedEarn: d.maleMedEarn,
    homeValue: d.homeValue,
    grossRent: d.grossRent,
    ownerCostMortgage: d.ownerCostMortgage,
    dist: {
      p20: d.dist.p20, p40: d.dist.p40, p60: d.dist.p60,
      p80: d.dist.p80, p95: d.dist.p95,
    },
  };
}

// Place an income on the LOCAL distribution curve (household-income breakpoints,
// used as the competitive-male reference). Returns a percentile 0–100.
// Beyond the published p95 breakpoint, extrapolate into the top tail.
function localPercentile(income, dist) {
  if (!dist || dist.p20 == null) return null;
  const pts = [
    [0, 0], [dist.p20, 20], [dist.p40, 40], [dist.p60, 60],
    [dist.p80, 80], [dist.p95, 95],
  ].filter(([x]) => x != null);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, p0] = pts[i], [x1, p1] = pts[i + 1];
    if (income >= x0 && income <= x1) {
      return p0 + ((income - x0) / (x1 - x0 || 1)) * (p1 - p0);
    }
  }
  // top tail above p95: log-style approach toward 99.9
  const top = pts[pts.length - 1];
  if (income > top[0]) {
    const ratio = income / top[0];
    return Math.min(99.9, 95 + Math.log2(ratio) * 4);
  }
  return 0;
}

// Inverse: the income at a given percentile on the local distribution.
function incomeAtPercentile(p, dist) {
  if (!dist || dist.p20 == null) return null;
  const pts = [
    [0, 0], [dist.p20, 20], [dist.p40, 40], [dist.p60, 60],
    [dist.p80, 80], [dist.p95, 95],
  ].filter(([x]) => x != null);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, p0] = pts[i], [x1, p1] = pts[i + 1];
    if (p >= p0 && p <= p1) {
      return x0 + ((p - p0) / (p1 - p0 || 1)) * (x1 - x0);
    }
  }
  // above p95: invert the log tail
  const topX = pts[pts.length - 1][0];
  if (p > 95) return topX * Math.pow(2, (p - 95) / 4);
  return topX;
}


// ============================================================
// THE RETENTION PRICING MODEL — CALCULATOR
// S = B × C × M    (retention price, her side)
// Retain ⇔ (Vp + Vℓ·k) − F ≥ S   AND   import is low
//
// Public-data anchors baked in (2024–2025):
//  - US individual income: median ~$50k; top10% ~$150k; top5% ~$201k; top1% ~$430k
//  - Metro cost multipliers from COL indices
//  - Race-preference + interracial base rates from OkCupid/Tinder/Census
// Everything else is user observation with explicit confidence bands.
// ============================================================

const FMT = (n) =>
  n >= 1000
    ? "$" + Math.round(n).toLocaleString("en-US")
    : "$" + Math.round(n).toLocaleString("en-US");

const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

// Percent of a base, with precision that grows as the fraction shrinks. Floors at
// 0.001%; below that the count is effectively no one in the local population.
const fmtTinyPct = (num, base) => {
  if (!base || base <= 0) return "n/a";
  const p = (num / base) * 100;
  if (p <= 0) return "essentially no one";
  if (p < 0.001) return "under 0.001%";
  if (p < 0.01) return p.toFixed(3) + "%";
  if (p < 0.1) return p.toFixed(2) + "%";
  if (p < 1) return p.toFixed(1) + "%";
  return Math.round(p) + "%";
};

// Dynamic explainer text that changes with the slider position.
function RELATIONAL_TEXT(v) {
  if (v >= 90) return "Everything she wants in a man she's with: attraction, compatibility, intimacy, emotional maturity, values, family, safety, etc. Added value here is where you can offset her price the most.";
  if (v >= 70) return "Strong draw. You're a man she's genuinely attracted to and proud to be seen with. Real offset, but it has a ceiling against her price.";
  if (v >= 40) return "Solid but not commanding. She enjoys you. Not enough on its own to move a high price.";
  if (v >= 10) return "Limited pull. You register as pleasant company more than a man she's drawn to.";
  return "No meaningful attraction credit. Nothing here offsets her price.";
}
function FRICTION_TEXT(v) {
  if (v >= 90) return "Heavy additional drag on top of your children: other dependents, legal entanglement, or obligations she'd also have to absorb.";
  if (v >= 70) return "Substantial extra friction beyond your children.";
  if (v >= 40) return "Some additional friction beyond your children, workable for the right fit.";
  if (v >= 10) return "Minor extra friction beyond your children.";
  return "Nothing beyond your children. Your fatherhood structure above is the whole of it.";
}

// ---- Public anchor tables -------------------------------------------------

// Metro anchors. floor = top-tier after-tax maintenance floor (COL-scaled);
// cNudge derived from Census ACS 2023–24 metro median household income rank
// (San Jose/SF highest ~$141–175k; DC ~$122k; Boston/Seattle high; St. Louis/
// Pittsburgh mid; smaller markets low). Higher metro income => denser high-earning
// male suitor pool => larger upward pull on C.
const MARKETS = {
  "San Francisco Bay": { floor: 240000, col: 1.05, cNudge: 0.48 },
  "New York City": { floor: 235000, col: 1.0, cNudge: 0.45 },
  "Washington DC": { floor: 200000, col: 0.92, cNudge: 0.4 },
  "Boston": { floor: 195000, col: 0.95, cNudge: 0.38 },
  "Los Angeles": { floor: 215000, col: 0.95, cNudge: 0.4 },
  "Miami": { floor: 205000, col: 0.9, cNudge: 0.38 },
  "Denver / Scottsdale": { floor: 155000, col: 0.82, cNudge: 0.28 },
  "Chicago": { floor: 170000, col: 0.82, cNudge: 0.3 },
  "Dallas / Austin": { floor: 150000, col: 0.78, cNudge: 0.26 },
  "Atlanta": { floor: 145000, col: 0.76, cNudge: 0.25 },
  "Nashville / Charlotte": { floor: 130000, col: 0.74, cNudge: 0.2 },
  "Mid-size metro (St. Louis, Pittsburgh, Indianapolis)": { floor: 95000, col: 0.62, cNudge: 0.12 },
  "Smaller / regional market": { floor: 70000, col: 0.55, cNudge: 0.05 },
};

// Built-in 40-metro fallback: REAL federal data, pre-fetched from Census ACS 2023
// (income, male earnings, income-distribution breakpoints) and CDC PLACES 2024
// (obesity). Used only in the preview build. In production the harvest writes a
// 100-metro METRO_DATA into zipData.js, which supersedes this. p95=250001 is the
// ACS top-code (income at or above ~$250k).
const METRO_DATA_FALLBACK = {
  "New York, NY": { medHH:104553, maleMed:87207, p20:28440, p40:75300, p60:141538, p80:250001, p95:250001, obesity:0.192 },
  "Los Angeles, CA": { medHH:87760, maleMed:47940, p20:33675, p40:68183, p60:110133, p80:179919, p95:250001, obesity:0.265 },
  "Chicago, IL": { medHH:81797, maleMed:55568, p20:30902, p40:63311, p60:102693, p80:167832, p95:250001, obesity:0.31 },
  "Dallas, TX": { medHH:74149, maleMed:47755, p20:33795, p40:59867, p60:91995, p80:147918, p95:250001, obesity:0.357 },
  "Houston, TX": { medHH:73104, maleMed:48131, p20:31197, p40:58057, p60:91763, p80:152504, p95:250001, obesity:0.373 },
  "Washington, DC": { medHH:106287, maleMed:86270, p20:37090, p40:81976, p60:138274, p80:235940, p95:250001, obesity:0.247 },
  "Miami, FL": { medHH:68694, maleMed:42562, p20:26745, p40:53516, p60:86014, p80:142562, p95:250001, obesity:0.295 },
  "Philadelphia, PA": { medHH:60698, maleMed:46755, p20:20401, p40:45608, p60:77275, p80:127694, p95:250001, obesity:0.335 },
  "Atlanta, GA": { medHH:91490, maleMed:67500, p20:33954, p40:70741, p60:114185, p80:199189, p95:250001, obesity:0.282 },
  "Phoenix, AZ": { medHH:85518, maleMed:52078, p20:39000, p40:68625, p60:104725, p80:162143, p95:250001, obesity:0.304 },
  "Boston, MA": { medHH:92859, maleMed:59640, p20:26542, p40:69432, p60:120009, p80:203033, p95:250001, obesity:0.242 },
  "San Francisco, CA": { medHH:141446, maleMed:92837, p20:43281, p40:103281, p60:181590, p80:250001, p95:250001, obesity:0.172 },
  "Riverside, CA": { medHH:89672, maleMed:49417, p20:38122, p40:71730, p60:110427, p80:168689, p95:250001, obesity:0.368 },
  "Detroit, MI": { medHH:59521, maleMed:46075, p20:22099, p40:45677, p60:75971, p80:125313, p95:231554, obesity:0.374 },
  "Seattle, WA": { medHH:122148, maleMed:80289, p20:50340, p40:95657, p60:152329, p80:247212, p95:250001, obesity:0.226 },
  "Minneapolis, MN": { medHH:96339, maleMed:61570, p20:41618, p40:76486, p60:119712, p80:190630, p95:250001, obesity:0.271 },
  "San Diego, CA": { medHH:102285, maleMed:56929, p20:42634, p40:81133, p60:125904, p80:197521, p95:250001, obesity:0.253 },
  "Tampa, FL": { medHH:75011, maleMed:48466, p20:32351, p40:60015, p60:93777, p80:150219, p95:250001, obesity:0.316 },
  "Denver, CO": { medHH:91681, maleMed:62933, p20:38281, p40:72390, p60:114693, p80:184290, p95:250001, obesity:0.216 },
  "St. Louis, MO": { medHH:55279, maleMed:47853, p20:19585, p40:42479, p60:70222, p80:117303, p95:215492, obesity:0.37 },
  "Baltimore, MD": { medHH:59623, maleMed:49162, p20:19963, p40:45820, p60:76005, p80:129006, p95:245171, obesity:0.387 },
  "Charlotte, NC": { medHH:83765, maleMed:55861, p20:38381, p40:66459, p60:104843, p80:170445, p95:250001, obesity:0.297 },
  "Orlando, FL": { medHH:77011, maleMed:45583, p20:33640, p40:60965, p60:96042, p80:150333, p95:250001, obesity:0.335 },
  "San Antonio, TX": { medHH:70571, maleMed:44456, p20:30473, p40:56190, p60:86794, p80:138771, p95:250001, obesity:0.341 },
  "Portland, OR": { medHH:86247, maleMed:54114, p20:35798, p40:68381, p60:108497, p80:174694, p95:250001, obesity:0.289 },
  "Sacramento, CA": { medHH:88724, maleMed:51499, p20:37295, p40:70966, p60:108369, p80:168813, p95:250001, obesity:0.296 },
  "Pittsburgh, PA": { medHH:76393, maleMed:56910, p20:30709, p40:59877, p60:96142, p80:155919, p95:250001, obesity:0.335 },
  "Las Vegas, NV": { medHH:73845, maleMed:45403, p20:31916, p40:59166, p60:91340, p80:142459, p95:250001, obesity:0.314 },
  "Austin, TX": { medHH:97169, maleMed:61868, p20:42371, p40:77192, p60:121525, p80:194658, p95:250001, obesity:0.304 },
  "Cincinnati, OH": { medHH:70816, maleMed:50189, p20:27389, p40:54388, p60:89961, p80:147195, p95:250001, obesity:0.356 },
  "Kansas City, MO": { medHH:67178, maleMed:50196, p20:28878, p40:53295, p60:83586, p80:132924, p95:229998, obesity:0.372 },
  "Columbus, OH": { medHH:73795, maleMed:49448, p20:32612, p40:58657, p60:91850, p80:146181, p95:250001, obesity:0.337 },
  "Indianapolis, IN": { medHH:63450, maleMed:45377, p20:27845, p40:50419, p60:77935, p80:124503, p95:228196, obesity:0.383 },
  "Cleveland, OH": { medHH:62823, maleMed:49356, p20:24332, p40:49127, p60:79058, p80:131798, p95:250001, obesity:0.353 },
  "Nashville, TN": { medHH:75664, maleMed:49778, p20:34201, p40:60634, p60:93735, p80:149681, p95:250001, obesity:0.323 },
  "San Jose, CA": { medHH:159674, maleMed:91898, p20:64015, p40:123967, p60:200026, p80:250001, p95:250001, obesity:0.219 },
  "Jacksonville, FL": { medHH:68447, maleMed:47603, p20:29371, p40:54461, p60:84697, p80:131787, p95:241924, obesity:0.343 },
  "Raleigh, NC": { medHH:101763, maleMed:65695, p20:43827, p40:80359, p60:125380, p80:196168, p95:250001, obesity:0.293 },
  "Richmond, VA": { medHH:62671, maleMed:45005, p20:23341, p40:47983, p60:77594, p80:134977, p95:250001, obesity:0.377 },
  "Salt Lake City, UT": { medHH:94658, maleMed:55075, p20:45036, p40:77455, p60:114864, p80:171040, p95:250001, obesity:0.299 },
};

// Per-metro data and single-women counts come from the annual harvest (zipData.js
// exports METRO_DATA + METRO_SINGLE_WOMEN, 100 metros). In this preview build those
// exports are absent, so fall back to the built-in 40-metro table and an empty count
// map (every metro reads 0 until the harvest has populated it).
const METRO_DATA = (typeof window !== "undefined" && window.METRO_DATA) || METRO_DATA_FALLBACK;
const METRO_SINGLE_WOMEN = (typeof window !== "undefined" && window.METRO_SINGLE_WOMEN) || {};

// CDC NHANES (2017–2018 race-by-sex; Aug2021–Aug2023 overall) measured-BMI obesity
// prevalence in WOMEN. Combined with overweight, a clear majority sit above the
// lean band the "fit" gate requires. Used to compute trait scarcity on the supply
// side: rarer fit tier => higher female optionality at the top => upward pressure
// on C and M. Not a direct multiplier on S.
const OBESITY_W = { white: 0.398, hispanic: 0.437, black: 0.569, asian: 0.172, overall: 0.413 };
// approx share ALSO overweight-but-not-obese (NHANES), to estimate lean remainder
const OVERWEIGHT_W = { white: 0.27, hispanic: 0.30, black: 0.22, asian: 0.25, overall: 0.27 };

// Cohort is specified white; this is the relevant base rate. Lean share = remainder.
function leanShareWhite() {
  return Math.max(0.05, 1 - OBESITY_W.white - OVERWEIGHT_W.white); // ~0.33 of women
}

// Presentation tier — pure visual appeal, before fitness and children adjust the realized
// level. Dual: priceV multiplies the floor B (pricing); topShare is the top-% of looks the
// funnel targets (count, combined with the zip's obesity). No dataset field of its own.
const TIER_OPTS = [
  { id: "tierMagazine", label: "Stops every room. Magazine-level",    priceV: 1.6,  topShare: 0.03 },
  { id: "tierStriking", label: "Striking. Clearly turns heads",       priceV: 1.25, topShare: 0.10 },
  { id: "tierAbove",    label: "Above average, put-together",         priceV: 1.0,  topShare: 0.30 },
  { id: "tierAttractive", label: "Attractive, not the top of her city", priceV: 0.78, topShare: 0.55 },
  { id: "tierAverage",  label: "Average looks",                       priceV: 0.55, topShare: 0.80 },
  { id: "tierBelow",    label: "Below average",                       priceV: 0.4,  topShare: 1.0 },
];
const TIER_BY_ID = Object.fromEntries(TIER_OPTS.map((o) => [o.id, o]));
const TIER_EXPLAIN = {
  tierMagazine: "Top fraction of a percent on pure visual appeal. The base of her upkeep floor is the highest before fitness and kids adjust it.",
  tierStriking: "Roughly top 5% on looks alone. Styling that reads as effort and resources. High base floor.",
  tierAbove: "Roughly top 10–20%. Attractive and cared-for. Moderate base floor.",
  tierAttractive: "Genuinely attractive but not setting the local ceiling. The lowest base floor of the top tiers.",
  tierAverage: "Around the middle of her local distribution. The comparison-and-optionality dynamics this model is built on weaken here, and the base floor drops well below the top tiers.",
  tierBelow: "Below the local median on looks. Optionality is limited and the price the market will bear falls sharply.",
};

// Fitness — separate from looks. Dual: lookMult/costMult feed pricing (realized looks + the
// upkeep cost line of B); filterShare feeds the funnel desirability count; mi is the fitness
// index into the BMI×fitness matrix in bmiFitness. Multi-select. No dataset field of its own
// (the funnel combines filterShare with the zip's obesity, read separately).
const FITNESS_OPTS = [
  { id: "any",        label: "Any",                                  lookMult: null, costMult: null, filterShare: null, mi: null },
  { id: "fitAthlete", label: "Athlete-level. Visible training discipline", lookMult: 1.18, costMult: 1.6,  filterShare: 0.4, mi: 0 },
  { id: "fitLean",    label: "Lean and toned, clearly works at it",   lookMult: 1.1,  costMult: 1.35, filterShare: 0.7, mi: 1 },
  { id: "fitAvg",     label: "Fit, average gym routine",              lookMult: 1.0,  costMult: 1.1,  filterShare: 1.0, mi: 2 },
  { id: "fitUnfit",   label: "Not especially fit",                    lookMult: 0.88, costMult: 0.9,  filterShare: 1.3, mi: 3 },
  { id: "fitOut",     label: "Out of shape",                          lookMult: 0.75, costMult: 0.8,  filterShare: 1.6, mi: 4 },
];
const FITNESS_BY_ID = Object.fromEntries(FITNESS_OPTS.map((o) => [o.id, o]));
const FITNESS_EXPLAIN = {
  fitAthlete: "Adds the most to both attractiveness and cost. Daily training, recovery, coaching, often procedures, all scaled up in expensive metros. Raises realized looks and the upkeep line of her floor the most.",
  fitLean: "A real, visible fitness investment. Meaningfully raises how she reads and adds a solid upkeep cost.",
  fitAvg: "Ordinary fitness. Small lift to looks, modest cost.",
  fitUnfit: "Below the fit baseline. Pulls realized looks down and carries little upkeep cost.",
  fitOut: "Lowers realized attractiveness regardless of underlying features, and removes the fitness upkeep cost from her floor.",
};

// BMI band — observed, since there is no individual BMI data, only county prevalence.
// It does not act alone; it interacts with fitness (see bmiFitness below).
const BMI_BANDS = ["Very lean (under 19)", "Ideal (19 to 22)", "Average (22 to 25)",
  "Overweight (25 to 30)", "Obese (30+)"];

// id===label maps so the explainer registry can resolve multi-select BMI like the others.
const BMI_BY_ID = BMI_BANDS.reduce((m, b) => { m[b] = { label: b }; return m; }, {});
const BMI_EXPLAIN = {
  "Very lean (under 19)": "A very lean body reads as high-maintenance and raises upkeep cost, but past a point it narrows rather than widens her appeal.",
  "Ideal (19 to 22)": "The ideal band is where looks and upkeep cost both peak when paired with real fitness. The most expensive body to keep.",
  "Average (22 to 25)": "A healthy average body reads well and costs less to maintain than the lean ideal.",
  "Overweight (25 to 30)": "An overweight band pulls her looks-scarcity below neutral and lowers upkeep cost.",
  "Obese (30+)": "An obese band is the lowest looks-scarcity signal and the cheapest to maintain.",
};

// BMI × fitness interaction. Returns { look, cost } multipliers applied on top of the
// fitness multipliers. Low BMI + high fitness enhances both (lean, trained, expensive to
// keep). High BMI + low fitness compounds the penalty. The off-diagonals are not symmetric:
// high BMI with high fitness reads athletic/muscular and is barely penalized, while low BMI
// with no fitness is thin-but-soft, a mild positive. Indices: 0 = best fitness / lowest BMI.
function bmiFitness(bmiSel, fitnessId) {
  const fi = FITNESS_BY_ID[fitnessId] != null ? FITNESS_BY_ID[fitnessId].mi : -1;
  if (fi == null || fi < 0) return { look: 1.0, cost: 1.0 };
  // normalize selection to a list of band strings; "any"/empty = neutral, no body signal
  const list = Array.isArray(bmiSel) ? bmiSel.filter((b) => b && b !== "any") : (bmiSel && bmiSel !== "any" ? [bmiSel] : []);
  if (!list.length) return { look: 1.0, cost: 1.0 };
  // look multiplier matrix [bmi][fitness]
  const LOOK = [
    // athlete   lean    avg     unfit   out
    [1.15,     1.12,   1.05,   0.98,   0.92], // very lean
    [1.18,     1.14,   1.08,   1.0,    0.95], // lean (peak at athlete+lean)
    [1.12,     1.08,   1.02,   0.95,   0.9 ], // healthy
    [1.02,     0.96,   0.9,    0.82,   0.76], // overweight
    [0.9,      0.84,   0.78,   0.7,    0.64], // obese (compounds down with low fitness)
  ];
  // cost multiplier: very low BMI at high fitness is the most expensive to maintain
  const COST = [
    [1.55,     1.4,    1.2,    1.0,    0.9 ], // very lean
    [1.5,      1.35,   1.18,   1.0,    0.9 ], // lean
    [1.3,      1.2,    1.1,    0.95,   0.85], // healthy
    [1.1,      1.0,    0.92,   0.82,   0.75], // overweight
    [0.95,     0.88,   0.8,    0.72,   0.65], // obese
  ];
  // average the look/cost cells of every selected band at the chosen fitness
  let lookSum = 0, costSum = 0, n = 0;
  for (const band of list) {
    const bi = BMI_BANDS.indexOf(band);
    if (bi < 0) continue;
    lookSum += LOOK[bi][fi];
    costSum += COST[bi][fi];
    n++;
  }
  if (!n) return { look: 1.0, cost: 1.0 };
  return { look: lookSum / n, cost: costSum / n };
}

// Male height — a documented preference variable on the man's side, the mirror of how looks
// and body work for her. Height and income are partially substitutable: a shorter man needs
// higher income to land equally, and the short + low-income corner is penalized hardest. Not
// a cliff at exactly 6ft, but a continuous tradeoff, with a hard low cap below 5'8".
const HEIGHT_BANDS = ["6'0\" or taller", "5'10\" to 5'11\"", "5'9\" and under"];

// Returns a multiplier on delivered value. Rows = height band (0 tallest), cols = income
// tier: <100k, 100-200k, 200-300k, 300-500k, 500k+. Tall is neutral-to-positive at any
// income; shorter is penalized, and the penalty eases as income climbs (the substitution).
// 5'9" and under carries a hard cap: even high income cannot fully buy it back.
function heightIncome(heightBand, income) {
  const hi = HEIGHT_BANDS.indexOf(heightBand);
  if (hi < 0) return 1.0;
  const ci = income >= 500000 ? 4 : income >= 300000 ? 3 : income >= 200000 ? 2 : income >= 100000 ? 1 : 0;
  const M = [
    //  <100k  100-200 200-300 300-500  500k+
    [1.05,   1.08,   1.1,    1.1,    1.1 ], // 6'0" or taller
    [0.9,    0.96,   1.0,    1.02,   1.03], // 5'10" to 5'11"
    [0.6,    0.68,   0.74,   0.78,   0.8 ], // 5'9" and under (hard cap, never reaches 1.0)
  ];
  return M[hi][ci];
}

// Plain explainer for a picked height, based on which model band it lands in.
function heightExplain(h) {
  const band = HEIGHT_TO_BAND(h);
  if (band === "6'0\" or taller") return "Lands in the tallest band (6'0\" and up). A premium on how your value reads, and it holds at any income.";
  if (band === "5'10\" to 5'11\"") return "Lands in the middle band (5'10\"-5'11\"). A small penalty at lower income that disappears as you earn more.";
  return "Lands in the 5'9\"-and-under band. Height drags your delivered value, and even high income cannot fully buy it back.";
}

// The exact heights the user picks from, tallest to shortest.
const HEIGHT_PICK = ["6'6\" or taller", "6'5\"", "6'4\"", "6'3\"", "6'2\"", "6'1\"", "6'0\"",
  "5'11\"", "5'10\"", "5'9\"", "5'8\"", "5'7\"", "5'6\"", "5'5\" or shorter"];
// Map a picked exact height to its model band by parsing total inches.
const HEIGHT_TO_BAND = (h) => {
  if (!h) return "5'9\" and under";
  const m = h.match(/(\d+)'(\d+)/);
  if (!m) return "5'9\" and under";
  const inches = parseInt(m[1], 10) * 12 + parseInt(m[2], 10);
  if (inches >= 72) return "6'0\" or taller";      // 6'0" and up
  if (inches >= 70) return "5'10\" to 5'11\"";       // 5'10"-5'11"
  return "5'9\" and under";                          // 5'9" and below
};

// Network reference set sets the core of C
// Network — single source of truth per option. id is the stable internal key stored in state;
// label is display-only and can change freely; priceV feeds the pricing C contribution.
// Pricing-only: this group does not feed the availability count or read any dataset field.
const NETWORK_OPTS = [
  { id: "netOldMoney", label: "Old money. Trust funds and seven-figure men around her.",        priceV: 1.85 },
  { id: "netElite",    label: "Elite city circle. Country clubs, finance and law, visible wealth.", priceV: 1.55 },
  { id: "netPro",      label: "Educated professional crowd, some money in the mix.",             priceV: 1.25 },
  { id: "netRegional", label: "Regional and grounded. Family or faith at the center.",           priceV: 1.0 },
  { id: "netCommunity",label: "Community rooted. Status isn't the measuring stick.",             priceV: 0.9 },
];
const NETWORK_BY_ID = Object.fromEntries(NETWORK_OPTS.map((o) => [o.id, o]));
const NETWORK_EXPLAIN = {
  netOldMoney: "Her sense of normal is set by inherited wealth and men earning seven figures. Comparison runs hottest here, and almost no non-dynastic income clears it. The single biggest upward force on her price.",
  netElite: "Her reference set is high earners in finance, law, and the club scene. Strong upward pressure on price, because you're being measured against that field.",
  netPro: "A normal upper-professional circle with some wealth around but not dominated by it. Middle of the comparison range.",
  netRegional: "Her world centers on family, community, or faith rather than status display. This is the baseline comparison pressure on this axis.",
  netCommunity: "Status comparison isn't the currency in her circle. Below baseline, the most retainable on this axis, which lowers her price.",
};

// Her own income relative to a partner — high earners can lower their financial dependence but
// often RAISE C (calibrated to a high reference). incV feeds pricing (C). acsBand maps each tier
// to the finest real ACS B20001 female-earnings cut for the COUNT: "zero" (no earnings),
// "u75" ($1-74,999), "b7599" ($75k-99,999), "p100" ($100k+). The top three pricing bands all
// collapse to p100 because B20001's ceiling is a single "$100,000 or more" bracket.
// Income — single source of truth per option. id is the stable internal key stored in
// state and used by all math; label is display-only and can change freely; priceV feeds the
// pricing C contribution; acs maps to the Census female-income band for the availability count.
// "u75" ($1-74,999), "b7599" ($75k-99,999), "p100" ($100k+). The top three pricing bands all
// map to the same p100 ACS bracket (Census doesn't split above $100k for this table).
const HERINCOME_OPTS = [
  { id: "any",        label: "Any",            priceV: null, acs: null   },
  { id: "inc200plus", label: "$200k+",         priceV: 0.14, acs: "p100" },
  { id: "inc150_199", label: "$150k to $199k", priceV: 0.11, acs: "p100" },
  { id: "inc100_149", label: "$100k to $149k", priceV: 0.08, acs: "p100" },
  { id: "inc75_99",   label: "$75k to $99k",   priceV: 0.04, acs: "b7599" },
  { id: "inc1_75",    label: "$1 to $75k",     priceV: -0.02, acs: "u75" },
  { id: "incNone",    label: "Does not work",  priceV: -0.08, acs: "zero" },
];
// Fast lookups by id.
const HERINCOME_BY_ID = Object.fromEntries(HERINCOME_OPTS.map((o) => [o.id, o]));
// Explainer text keyed by id (display-independent).
const HERINCOME_EXPLAIN = {
  inc200plus: "She doesn't need provision, so money buys less with her. But top earners calibrate expectations to their own peers, which nudges her price up.",
  inc150_199: "High personal income. Provision matters little; her comparison set sits high, which keeps her price elevated.",
  inc100_149: "Strong earner. Largely self-sufficient, with expectations calibrated to a professional peer set. A modest upward nudge.",
  inc75_99: "Comfortable on her own but not at a level that resets her expectations. Roughly neutral.",
  inc1_75: "Provision carries more weight here, which slightly lowers the comparison bar.",
  incNone: "Provision matters most, which lowers her comparison-driven expectations even as it raises what you would fund.",
};

// Her education. ACS attainment is cumulative (a graduate degree-holder also holds a
// bachelor's). The "partner-tier" refinement that makes a woman wife-eligible, and that
// also raises her own expectations of a partner, scales with attainment. Nudges C.
// Her education — dual. priceV is the pricing nudge to C (partner-tier refinement / raised
// expectations); rank orders the levels so the highest selected drives pricing; acsBucket tags
// which local Census share the funnel counts against. Reads dataset fields eduShareBplus/
// eduShareGrad/eduShareAssoc for the COUNT, but those keys are unchanged by this migration.
const EDU_OPTS = [
  { id: "eduHS",    label: "High school or less",                 priceV: 0.0,  rank: 0, acsBucket: "sub" },
  { id: "eduSome",  label: "Some college",                        priceV: 0.02, rank: 1, acsBucket: "sub" },
  { id: "eduAssoc", label: "Associate's degree or trade school",  priceV: 0.05, rank: 2, acsBucket: "assoc" },
  { id: "eduBach",  label: "Bachelor's degree",                   priceV: 0.10, rank: 3, acsBucket: "bachOnly" },
  { id: "eduGrad",  label: "Graduate Degree",                     priceV: 0.10, rank: 4, acsBucket: "grad" },
];
const EDU_BY_ID = Object.fromEntries(EDU_OPTS.map((o) => [o.id, o]));
const EDU_EXPLAIN = {
  eduGrad: "Highest attainment tier. Tends to come with the highest expectations of a partner's standing and the strongest 'partner-tier' refinement. Nudges her price up. A graduate degree also counts as a college degree.",
  eduBach: "College-educated, the baseline for the professional cohort. Moderate upward nudge.",
  eduAssoc: "A completed two-year or vocational credential. Above some-college, below a four-year degree, with a modest effect on expectations.",
  eduSome: "Slightly above the floor, small effect on expectations.",
  eduHS: "No degree-driven lift to her expectations on this axis.",
};

// Mobility / optionality
// Mobility / reach — pure geographic and life freedom to pursue alternatives (her kids
// are handled separately in HERKIDS so children read as their own clear question).
// Mobility — single source of truth per option. Pricing-only: feeds M, does not feed the
// count and reads no dataset field. id stored in state, label display-only, priceV the multiplier.
const MOBILITY_OPTS = [
  { id: "mobAnywhere", label: "Can live and work anywhere",            priceV: 1.4 },
  { id: "mobRooted",   label: "Free, but rooted here by job or family", priceV: 1.25 },
  { id: "mobTied",     label: "Tied down here, limited reach",          priceV: 1.08 },
];
const MOBILITY_BY_ID = Object.fromEntries(MOBILITY_OPTS.map((o) => [o.id, o]));
const MOBILITY_EXPLAIN = {
  mobAnywhere: "Maximum reach. Nothing about her job or location ties her down, so she can pursue or relocate toward better options anywhere, which raises her optionality and her price.",
  mobRooted: "No hard constraints, but her work or family keeps her local. Reach is real but bounded.",
  mobTied: "Her job or circumstances pin her in place, which narrows her field and lowers her price.",
};

// Her children — anchor her in place and lower her optionality (M). Their own question,
// separate from your children, which are friction on your side. Pricing-only: feeds M, does
// not feed the count and reads no dataset field.
const HERKIDS_OPTS = [
  { id: "any",          label: "Any",                                       priceV: null },
  { id: "hkNone",       label: "No children",                               priceV: 1.08 },
  { id: "hkCoparent",   label: "Children, co-parent in town, tied to the area", priceV: 0.85 },
  { id: "hkOnline",     label: "Children, but dates and travels nationally",  priceV: 0.97 },
  { id: "hkRelocate",   label: "Children, and free to relocate with them",   priceV: 1.0 },
];
const HERKIDS_BY_ID = Object.fromEntries(HERKIDS_OPTS.map((o) => [o.id, o]));
const HERKIDS_EXPLAIN = {
  hkNone: "No dependents anchoring her, so her reach to alternatives stays high. Slightly raises her optionality and price.",
  hkCoparent: "Children and a local co-parent anchor her in place, narrowing her field. The same friction that hurts a man's position makes a woman more retainable, and lowers her price.",
  hkOnline: "Rooted by kids day to day, but she dates and travels nationally, drawing a wider comparison set than her home market alone. That keeps her reach higher than her geography would suggest.",
  hkRelocate: "She has children but no co-parent holding her in place, so her reach is close to a woman with no kids at all.",
};

// Age band — affects M and, on a lag, C
// Age band — optionality multipliers (m on M, cLag on C). The user sets a continuous age
// range; ageRangeToBand population-weights the covered bands into one {m, cLag} using the
// center ZIP's women-by-age counts. Reads dataset field women, but those keys are unchanged.
const AGEBAND_OPTS = [
  { id: "ageUnder28", label: "Under 28. The most options she'll ever have",            m: 1.12, cLag: 1.0 },
  { id: "age28_33",   label: "28 to 33. Strong, starting to value time",               m: 1.05, cLag: 1.0 },
  { id: "age34_38",   label: "34 to 38. Options narrowing, expectations still high",    m: 0.92, cLag: 1.08 },
  { id: "age39_44",   label: "39 to 44. Fewer suitors, standards still set high",       m: 0.82, cLag: 1.12 },
  { id: "age45up",    label: "45 and up. A much smaller field",                         m: 0.72, cLag: 1.05 },
];
const AGEBAND_BY_ID = Object.fromEntries(AGEBAND_OPTS.map((o) => [o.id, o]));

// Import behavior — the gate
// Import gate — does she actually show up (gate before price). Pricing-only: feeds the gate,
// not the count, no dataset field. priceV is the gate level (0 = all in, 1/2 = failing).
const IMPORT_OPTS = [
  { id: "impAllIn",   label: "All in. Present and exclusive in practice",                  priceV: 0 },
  { id: "impUnclear", label: "Hard to read. Keeps options or attention elsewhere",         priceV: 1 },
  { id: "impElsewhere", label: "Taking attention or money from higher-tier men elsewhere", priceV: 2 },
];
const IMPORT_BY_ID = Object.fromEntries(IMPORT_OPTS.map((o) => [o.id, o]));
const IMPORT_EXPLAIN = {
  impAllIn: "She's actually here, exclusive in behavior, not sourcing attention or money elsewhere. The gate is open and the price math applies.",
  impUnclear: "Ambiguous signals. Until this resolves to all-in, treat the price as unpayable no matter what the math says, because this gate sits before everything.",
  impElsewhere: "She's sourcing value from other men. The gate fails before price is even evaluated, anything you provide is funding her position, not keeping her.",
};

// k inputs — history discount applies to LOVER value, only under serious intent
// Pedigree — your lineage (k discount on lover value under serious intent). Pricing-only.
const PEDIGREE_OPTS = [
  { id: "pedEarned", label: "No, I earned my own way",              priceV: 1.0 },
  { id: "pedSome",   label: "Some family money in the background",  priceV: 0.85 },
  { id: "pedGen",    label: "Yes, established generational wealth",  priceV: 0.72 },
];
const PEDIGREE_BY_ID = Object.fromEntries(PEDIGREE_OPTS.map((o) => [o.id, o]));
const PEDIGREE_EXPLAIN = {
  pedEarned: "You price a partner on present value, with no lineage to protect. Her history barely discounts what you'd offer.",
  pedSome: "Some family money in the picture, so her history carries a moderate discount in a serious context.",
  pedGen: "In a world where safety is code for wealth and financial independence, generational wealth is a premium on top of high wage earnings or entrepreneurialism. With a lineage to protect, her past discounts the relational value more heavily under serious intent.",
};
// History — how her past reads (k discount on lover value under serious intent). Pricing-only.
const HISTORY_OPTS = [
  { id: "histPrivate", label: "Private. Her past isn't part of how she presents", priceV: 1.0 },
  { id: "histUnknown", label: "Don't know or don't think about it",               priceV: 0.92 },
  { id: "histLoud",    label: "Loud about it. Her options are part of her brand",  priceV: 0.8 },
];
const HISTORY_BY_ID = Object.fromEntries(HISTORY_OPTS.map((o) => [o.id, o]));
const HISTORY_EXPLAIN = {
  histPrivate: "Discreet history reads as circumstance, not identity, and preserves her standing in a serious context. Little to no discount.",
  histUnknown: "Neutral. A small default discount applies under serious intent.",
  histLoud: "When optionality is part of how she markets herself, a serious-intent buyer reads ongoing availability, which discounts relational value the most.",
};

// Race / sorting term — probability weighting on suitor competition, not a wall
// Sorting — are you her type (probability weighting on F, not a wall). Pricing-only.
const SORTING_OPTS = [
  { id: "sortInType",  label: "I'm the type she tends to go for (helps me)", priceV: 1.0 },
  { id: "sortOutType", label: "I'm outside her usual type (steeper climb)",   priceV: 1.18 },
];
const SORTING_BY_ID = Object.fromEntries(SORTING_OPTS.map((o) => [o.id, o]));
const SORTING_EXPLAIN = {
  sortInType: "You're inside the group she's most drawn to, which keeps you in the running rather than fighting her preferences. No penalty.",
  sortOutType: "You're outside her usual type, a real headwind, though not a wall. Dating data shows roughly a 20% lower response rate across these lines, and about 19% of marriages cross them.",
};

// Your fatherhood structure — the dominant friction a partner has to absorb. Dual: priceV is
// the annualized dollar "value drag" feeding F (pricing); kidsOk flags whether this triggers the
// funnel's "open to a partner with children" filter. No dataset field of its own.
const FATHERHOOD_OPTS = [
  { id: "fhNone",          label: "No children",                                       priceV: 0,      kidsOk: false },
  { id: "fhLocalJoint",    label: "Kids, local, joint custody, no support out",         priceV: 35000,  kidsOk: true },
  { id: "fhLocalSupport",  label: "Kids, local, you pay support",                       priceV: 60000,  kidsOk: true },
  { id: "fhDistTravel",    label: "Kids in another state, you travel and pay support",  priceV: 130000, kidsOk: true },
  { id: "fhDistHostile",   label: "Kids in another state, heavy support, hostile ex",   priceV: 175000, kidsOk: true },
];
const FATHERHOOD_BY_ID = Object.fromEntries(FATHERHOOD_OPTS.map((o) => [o.id, o]));
const FATHERHOOD_EXPLAIN = {
  fhNone: "Nothing about your family structure raises what you have to deliver. A friction-free competitor has no edge on you here.",
  fhLocalJoint: "Children nearby with shared custody and no money flowing out. Real but light friction, the kind most partners absorb.",
  fhLocalSupport: "Local kids plus a support obligation that's allocated before the relationship begins. Moderate friction a friction-free man doesn't carry.",
  fhDistTravel: "The structurally heaviest common case: distance, the cost and time of travel, and support all at once. This is the friction the source material identifies as your single biggest one, and a competing man without it has a real advantage when she compares.",
  fhDistHostile: "Distance, heavy support, and an ex she'd have to navigate. The maximum drag. A woman choosing you absorbs all of it, and the model treats this as the strongest single force lowering your delivered value.",
};

// Per-option explainer text for the running stack on the right. Plain language, says
// what the choice means and which way it moves the price.
const EXPLAIN = {
  // BMI
  "Very lean (under 19)": "Very low body mass. Paired with high fitness this is the lean-and-trained peak and the most expensive body to maintain. Paired with no fitness it reads thin but soft, a milder positive.",
  "Ideal (19 to 22)": "The range where high fitness produces the strongest enhancement to both looks and cost. The model's peak combination.",
  "Average (22 to 25)": "A normal healthy range. Fitness still moves it up or down, but neither enhances nor compounds as sharply as the extremes.",
  "Overweight (25 to 30)": "Above the healthy range. High fitness softens this toward athletic or muscular and limits the penalty. Low fitness reads as overweight and pulls realized looks down.",
  "Obese (30+)": "Highest band. With high fitness it reads athletic and is only modestly penalized. With low fitness it compounds an already low realized attractiveness, the worst combination in the model.",
  // HEIGHT explainers are generated dynamically (see heightExplain), since the picker offers
  // many discrete heights that map onto three model bands.
};

// Income percentile engine (US individual, 2024–25 anchors)
function incomePercentile(income) {
  const pts = [
    [0, 0], [30000, 30], [50200, 50], [75000, 66], [100000, 79],
    [150000, 90], [201050, 95], [300000, 98], [430000, 99], [700000, 99.6],
    [1200000, 99.9],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, p0] = pts[i];
    const [x1, p1] = pts[i + 1];
    if (income >= x0 && income <= x1) {
      return p0 + ((income - x0) / (x1 - x0)) * (p1 - p0);
    }
  }
  return income > 1200000 ? 99.95 : 0;
}

// Effective all-in tax rate, computed from the ACTUAL 2025 federal marginal brackets
// (single filer), plus FICA and a flat state rate. Not interpolated guesses: the real
// progressive formula, so it scales correctly at every income. Returns share of gross kept.
const FED_BRACKETS_2025 = [   // [lower bound, marginal rate], single filer, published IRS
  [0, 0.10], [11925, 0.12], [48475, 0.22], [103350, 0.24],
  [197300, 0.32], [250525, 0.35], [626350, 0.37],
];
const STD_DEDUCTION_2025 = 15000;   // single-filer standard deduction, published
const STATE_RATE = 0.0495;          // flat state income rate (IL), published
const FICA_SS_RATE = 0.062, FICA_SS_CAP = 176100, FICA_MED_RATE = 0.0145; // published 2025

function federalTax(taxable) {
  if (taxable <= 0) return 0;
  let tax = 0;
  for (let i = 0; i < FED_BRACKETS_2025.length; i++) {
    const [lo, rate] = FED_BRACKETS_2025[i];
    const hi = i + 1 < FED_BRACKETS_2025.length ? FED_BRACKETS_2025[i + 1][0] : Infinity;
    if (taxable > lo) tax += (Math.min(taxable, hi) - lo) * rate;
    else break;
  }
  return tax;
}
function effectiveTaxRate(income) {
  if (income <= 0) return 0;
  const taxable = Math.max(0, income - STD_DEDUCTION_2025);
  const fed = federalTax(taxable);
  const state = taxable * STATE_RATE;
  const fica = Math.min(income, FICA_SS_CAP) * FICA_SS_RATE + income * FICA_MED_RATE;
  return (fed + state + fica) / income;
}
const afterTaxKept = (income) => 1 - effectiveTaxRate(income);

// Convert an after-tax target into the pre-tax gross required, using the real effective rate
// at that gross level (solve the gross whose after-tax equals the target).
function grossFromAfterTax(afterTax) {
  // iterate: start from a guess, converge on gross where gross*(1-rate(gross)) = afterTax.
  let g = afterTax / 0.7;
  for (let i = 0; i < 12; i++) {
    const net = g * afterTaxKept(g);
    g = g * (afterTax / Math.max(1, net));
  }
  return g;
}

// Pure model. data = { medHH, dist:{p20..p95}, maleMed, obesity } (real, from ZIP or metro).
// inputs = all the slider/dropdown values. Returns the full result object.
// Class ladder + family-of-four net, for the reality-check panel. National household-income
// class bands (2024 Pew/Census-style anchors), then COL-weighted to the ZIP. For a
// representative income in each band, model after-tax income minus a COL-weighted family-of-
// four cost of living, anchored to REAL local housing (ACS) where possible and modeled
// national figures (COL-scaled) for childcare, transport, education, vacations, and savings.
function classLadder(data) {
  if (!data || !data.medHH) return null;
  const col = Math.max(0.55, Math.min(2.4, data.medHH / 80000));
  // National band thresholds (household income).
  const bands = [
    { name: "Lower", natLow: 0, natHigh: 50000, rep: 38000 },
    { name: "Middle", natLow: 50000, natHigh: 100000, rep: 75000 },
    { name: "Upper-middle", natLow: 100000, natHigh: 200000, rep: 150000 },
    { name: "Upper", natLow: 200000, natHigh: 500000, rep: 325000 },
    { name: "True wealth", natLow: 500000, natHigh: null, rep: 900000 },
  ];

  // Real local annual housing for a family of four (own w/ mortgage if available, else rent).
  const ownerAnnual = data.ownerCostMortgage ? data.ownerCostMortgage * 12 : null;
  const rentAnnual = data.grossRent ? data.grossRent * 12 * 1.25 : null; // 3-4BR ≈ 1.25x median unit
  const housing = ownerAnnual || rentAnnual || 24000 * col;

  // COL-weighted national family-of-four annual cost lines (2024 inflation-adjusted, modeled).
  const childcare = 16000 * col;        // two kids, part-time/after-school blended
  const transport = 12500 * col;        // two vehicles, fuel, insurance, maintenance
  const k12 = 4000 * col;               // public-school extras, supplies, activities
  const food = 15000 * col;             // family of four groceries + some dining
  const healthcare = 9000 * col;        // premiums + out-of-pocket, employer-sponsored
  const collegeSavings = 6000 * col;    // 529 contributions, two kids
  const staycation = 2500 * col;
  const domesticTrip = 5000 * col;
  const intlTrip = 12000 * col;
  const baseExpenses = housing + childcare + transport + k12 + food + healthcare + collegeSavings;

  const afterTax = (gross) => {
    // Rough blended federal+state+FICA effective rate, progressive by band.
    let rate;
    if (gross < 50000) rate = 0.14;
    else if (gross < 100000) rate = 0.2;
    else if (gross < 200000) rate = 0.27;
    else if (gross < 500000) rate = 0.34;
    else rate = 0.42;
    return gross * (1 - rate);
  };

  return {
    col, housing, baseExpenses,
    lines: { housing, childcare, transport, k12, food, healthcare, collegeSavings,
             staycation, domesticTrip, intlTrip },
    bands: bands.map((b) => {
      const localLow = b.natLow * col;
      const localHigh = b.natHigh != null ? b.natHigh * col : null;
      const net = afterTax(b.rep) - baseExpenses;
      // What's left after the base, and whether each vacation tier fits in that leftover.
      const afterStay = net - staycation;
      const afterDom = net - domesticTrip;
      const afterIntl = net - intlTrip;
      return {
        name: b.name, rep: b.rep, natLow: b.natLow, natHigh: b.natHigh,
        localLow, localHigh, net,
        canStaycation: afterStay >= 0, canDomestic: afterDom >= 0, canIntl: afterIntl >= 0,
      };
    }),
  };
}

// ============================================================
// INPUT ROUTING — one questionnaire, routed to the right engine.
// Age range and education multi-select feed BOTH the pricing model and the availability
// funnel, but differently: age population-weights to one optionality multiplier for pricing
// and sizes the pool for counting; education uses the HIGHEST selected level for pricing C
// and the COMBINED selected shares for counting. Race feeds only the funnel.
// ============================================================

// The five Census female age bands the snapshot stores.
const AGE_BANDS = [
  { lo: 18, hi: 24, key: "a18_24" },
  { lo: 25, hi: 29, key: "a25_29" },
  { lo: 30, hi: 34, key: "a30_34" },
  { lo: 35, hi: 39, key: "a35_39" },
  { lo: 40, hi: 49, key: "a40_49" },
  { lo: 50, hi: 65, key: "a50_64" },
];

// Map the five Census female age bands to the model's age-band optionality entries (by id).
const CENSUS_TO_MODEL_AGE = {
  a18_24: "ageUnder28",
  a25_29: "age28_33",
  a30_34: "age28_33",
  a35_39: "age34_38",
  a40_49: "age39_44",
  a50_64: "age45up",
};

// Collapse an age range to one {m, cLag} by population-weighting the bands it covers,
// using the center ZIP's real women-by-age counts. Falls back to even weight if no counts.
function ageRangeToBand(ageLo, ageHi, women) {
  let wm = 0, wc = 0, wsum = 0;
  for (const b of AGE_BANDS) {
    const span = b.hi - b.lo + 1;
    const ov = Math.max(0, Math.min(b.hi, ageHi) - Math.max(b.lo, ageLo) + 1);
    if (ov <= 0) continue;
    const count = women && women[b.key] != null ? women[b.key] : span; // even weight fallback
    const w = count * (ov / span);
    const band = AGEBAND_BY_ID[CENSUS_TO_MODEL_AGE[b.key]];
    wm += band.m * w; wc += band.cLag * w; wsum += w;
  }
  if (!wsum) return { m: 1.0, cLag: 1.0 };
  return { m: wm / wsum, cLag: wc / wsum };
}

// Education multi-select: highest selected level drives the model's C contribution.
function highestEdu(selected) {
  if (!selected || !selected.length) return null;
  let best = null, bestRank = -1;
  for (const e of selected) {
    const rec = EDU_BY_ID[e];
    if (rec && rec.rank > bestRank) { bestRank = rec.rank; best = e; }
  }
  return best;
}
// For the funnel: combined local share of the selected education levels. Census gives
// bachelor's-or-higher and associate's-degree shares per ZIP. The remainder is some-college
// and below. We sum the shares for whichever buckets the selection touches, keyed by the
// acsBucket tag on each record.
function eduSelectShare(selected, eduShareBplus, eduShareAssoc, eduShareGrad) {
  if (!selected || !selected.length) return 1;
  const bplus = eduShareBplus != null ? eduShareBplus : 0.35;
  const grad = eduShareGrad != null ? eduShareGrad : 0.13;
  const assoc = eduShareAssoc != null ? eduShareAssoc : 0.08;
  const bucketShare = {
    grad,
    bachOnly: Math.max(0, bplus - grad), // bachelor's, no graduate degree
    assoc,
    sub: Math.max(0, 1 - bplus - assoc), // some college or less
  };
  const buckets = new Set();
  for (const id of selected) { const rec = EDU_BY_ID[id]; if (rec) buckets.add(rec.acsBucket); }
  let share = 0;
  for (const b of buckets) share += (bucketShare[b] || 0);
  return Math.max(0.02, Math.min(1, share || 1));
}


// ============================================================
// AVAILABILITY FUNNEL — how many qualifying women in a radius.
// Sums women in the chosen age range across every ZIP whose centroid is within the radius,
// then applies multiplicative funnel shares (race, single, desirability, education, kids-ok).
// Counts are modeled estimates: ACS publishes age, race, and marital separately, not as a
// single cross-tab, so race/single by age is a proportional combination, labeled as such.
// ============================================================

// great-circle distance in miles
function milesBetween(lat1, lon1, lat2, lon2) {
  const R = 3958.8, toRad = (x) => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// National anchors for the B/C/M regime (single source of truth).
const NAT_MED_HH = 75000;     // national median household income (COL + market anchor)
const NAT_MALE_MED = 62000;   // national median male earnings (suitor-bar anchor)
const NAT_OBESITY = 0.40;     // national adult obesity (looks-scarcity anchor)
const UPKEEP_BASE = 12000;    // national annual beauty/wellness base (only non-harvest $)
const LIFESTYLE_BASE = 18000; // national annual discretionary base (only non-harvest $)

// Walk every harvested ZIP whose centroid is within `radius` miles of the center ZIP and
// return the radius aggregates the B/C/M regime needs. Rates/levels are population-weighted
// (the typical person in range); the male-earnings array is the weighted sample used to
// place her suitor bar. A bare metro point (explore table) passes through as a radius-of-one.
function radiusAggregate(ZIP_DATA, centerZip, radius) {
  const center = ZIP_DATA[centerZip];
  if (!center || !center.ll) return null;
  const [clat, clon] = center.ll;
  let incN = 0, incP = 0, obesN = 0, obesP = 0, rentN = 0, rentP = 0, mortN = 0, mortP = 0;
  const maleEarns = [];
  for (const z of Object.keys(ZIP_DATA)) {
    const d = ZIP_DATA[z];
    if (!d.ll || !d.pop) continue;
    if (milesBetween(clat, clon, d.ll[0], d.ll[1]) > radius) continue;
    if (d.medHHIncome != null) { incN += d.medHHIncome * d.pop; incP += d.pop; }
    if (d.obesity != null) { obesN += d.obesity * d.pop; obesP += d.pop; }
    if (d.grossRent != null) { rentN += d.grossRent * 12 * d.pop; rentP += d.pop; }
    if (d.ownerCostMortgage != null) { mortN += d.ownerCostMortgage * 12 * d.pop; mortP += d.pop; }
    if (d.maleMedEarn != null) { const reps = Math.max(1, Math.round(d.pop / 100)); for (let i = 0; i < reps; i++) maleEarns.push(d.maleMedEarn); }
  }
  if (!incP) return null;
  maleEarns.sort((a, b) => a - b);
  const radiusMedHH = incN / incP;
  const rent = rentP ? rentN / rentP : null;
  const mort = mortP ? mortN / mortP : null;
  const housing = (rent != null && mort != null) ? (rent + mort) / 2 : (rent != null ? rent : (mort != null ? mort : radiusMedHH * 0.28));
  return {
    medHH: radiusMedHH,
    col: radiusMedHH / NAT_MED_HH,
    obesity: obesP ? obesN / obesP : NAT_OBESITY,
    housingAnnual: housing,
    maleEarns,
  };
}

// women in [ageLo, ageHi] from the 5 stored bands, prorating partial overlap (no double count).
function womenInAgeRange(women, ageLo, ageHi) {
  if (!women) return 0;
  let total = 0;
  for (const b of AGE_BANDS) {
    const span = b.hi - b.lo + 1;
    const ov = Math.max(0, Math.min(b.hi, ageHi) - Math.max(b.lo, ageLo) + 1);
    if (ov > 0) total += (women[b.key] || 0) * (ov / span);
  }
  return total;
}

// Universal single-women 18-64 count for one ZIP record. Used anywhere single women
// are needed (availability denominator, metro column). Six stored bands cover 18-64
// exactly; single share = never-married + separated + divorced.
function singleWomen18to64(d) {
  if (!d || !d.women || !d.marital) return 0;
  const w = (d.women.a18_24 || 0) + (d.women.a25_29 || 0) + (d.women.a30_34 || 0) +
    (d.women.a35_39 || 0) + (d.women.a40_49 || 0) + (d.women.a50_64 || 0);
  return w * ((d.marital.neverMarried || 0) + (d.marital.separated || 0) + (d.marital.divorced || 0));
}

// share of women matching the chosen race selection(s). Accepts an array; "any" or empty = all.
function raceShare(race, sel) {
  if (!race || !race.total) return 1;
  const list = Array.isArray(sel) ? sel : [sel];
  if (!list.length || list.includes("any")) return 1;
  const t = race.total;
  // "other" on the front end combines Census "some other race" and "two or more races"
  const cell = { white: race.white, black: race.black, asian: race.asian, hispanic: race.hispanic,
    native: race.native, pacific: race.pacific, other: (race.other || 0) + (race.multi || 0) };
  let sum = 0;
  for (const s of list) if (cell[s] != null) sum += cell[s];
  return Math.max(0, Math.min(1, sum / t));
}

// Marital — funnel only (feeds singleShare off the ZIP marital record). id is the bucket the
// share function sums; label is display-only. Reads dataset field marital, keys unchanged.
const MARITAL_OPTS = [
  { id: "any",          label: "Any" },
  { id: "neverMarried", label: "Never married" },
  { id: "divorced",     label: "Divorced" },
  { id: "separated",    label: "Separated" },
];
// Race — funnel only (feeds raceShare off the ZIP race record). id matches the Census cell
// key; "other" combines Census "some other race" and "two or more races". label is display.
const RACE_OPTS = [
  { id: "any",      label: "Any" },
  { id: "white",    label: "White" },
  { id: "black",    label: "Black" },
  { id: "asian",    label: "Asian" },
  { id: "hispanic", label: "Hispanic" },
  { id: "native",   label: "Native American" },
  { id: "pacific",  label: "Pacific Islander" },
  { id: "other",    label: "Other / multiracial" },
];

// share of women in the chosen marital categories. Accepts an array of bucket ids.
// Empty selection falls back to the full single set (never married + divorced + separated).
function singleShare(marital, set) {
  if (!marital) return 0.55;
  const nm = marital.neverMarried || 0, sep = marital.separated || 0, div = marital.divorced || 0;
  const list = Array.isArray(set) ? set : [set];
  if (!list.length || list.includes("any")) return nm + sep + div;
  let s = 0;
  if (list.includes("neverMarried")) s += nm;
  if (list.includes("divorced")) s += div;
  if (list.includes("separated")) s += sep;
  return s;
}

// share of women in the chosen income bands. Accepts an array of income option ids,
// mapped to ACS bands via HERINCOME_BY_ID. "any"/empty = 1. The top three ids all map to
// p100, so picking any of them counts the same $100k+ ACS bracket (dedup via Set).
function incomeShare(bandsObj, sel) {
  if (!bandsObj) return 1;
  const list = Array.isArray(sel) ? sel : [sel];
  if (!list.length || list.includes("any")) return 1;
  const bands = new Set();
  for (const s of list) { const rec = HERINCOME_BY_ID[s]; if (rec && rec.acs) bands.add(rec.acs); }
  let sum = 0;
  for (const b of bands) sum += (bandsObj[b] || 0);
  return Math.max(0, Math.min(1, sum));
}

// desirability share: reuse the model's looks tier + local obesity to estimate the fit/attractive
// fraction. Tier sets the top-% of looks targeted (TIER_BY_ID); fitness tightens or loosens the
// local lean remainder (filterShare from FITNESS_BY_ID); obesity sets the lean base.
function desirabilityShare(tier, fitness, localObesity) {
  const lookTop = TIER_BY_ID[tier] != null ? TIER_BY_ID[tier].topShare : 0.3;
  // local lean share: 1 - obesity, clamped; fitness expectation tightens or loosens it
  const leanBase = Math.max(0.1, 1 - (localObesity != null ? localObesity : 0.41));
  // fitness may be a single id or an array of ids (multi-select); average the selected filters
  const list = Array.isArray(fitness) ? fitness.filter((f) => f && f !== "any") : (fitness ? [fitness] : []);
  let fitAdj = 1.0;
  if (list.length) {
    let s = 0, n = 0;
    for (const f of list) { const rec = FITNESS_BY_ID[f]; if (rec && rec.filterShare != null) { s += rec.filterShare; n++; } }
    if (n) fitAdj = s / n;
  }
  const leanShare = Math.max(0.03, Math.min(1, leanBase / fitAdj));
  return Math.max(0.005, Math.min(1, lookTop * leanShare));
}


// Run the funnel across all ZIPs within radius of the center ZIP.
function computeAvailability(ZIP_DATA, centerZip, opts) {
  const center = ZIP_DATA[centerZip];
  if (!center || !center.ll) return null;
  const [clat, clon] = center.ll;
  const { ageLo, ageHi, race, maritalSet, tier, fitness, eduSelected, kidsOk, incomeSet } = opts;

  let rawWomen = 0, zipsInRange = 0, popInRange = 0, singleWomenAll = 0;
  for (const z of Object.keys(ZIP_DATA)) {
    const d = ZIP_DATA[z];
    if (!d.ll) continue;
    if (milesBetween(clat, clon, d.ll[0], d.ll[1]) > opts.radius) continue;
    zipsInRange++;
    popInRange += d.pop || 0;
    rawWomen += womenInAgeRange(d.women, ageLo, ageHi);
    // every single woman of dating age (18-64) in this ZIP, via the universal helper
    singleWomenAll += singleWomen18to64(d);
  }
  if (!zipsInRange) return null;

  // funnel shares — use the center ZIP's distributions as the representative local rates
  const rShare = raceShare(center.race, race);
  const sShare = singleShare(center.marital, maritalSet);
  const iShare = incomeShare(center.femIncome, incomeSet);
  const dShare = desirabilityShare(tier, fitness, center.obesity);
  const eShare = eduSelectShare(eduSelected, center.eduShareBplus, center.eduShareAssoc, center.eduShareGrad);
  // "kids ok": share of women open to a partner with children. Not in ACS; a modeled assumption
  // that tightens with her age (younger less open on average). Applied only if user has kids.
  const kShare = kidsOk ? 0.55 : 1;

  const afterAgeArea = rawWomen;
  const afterRace = afterAgeArea * rShare;
  const afterSingle = afterRace * sShare;
  const afterIncome = afterSingle * iShare;
  const afterDesire = afterIncome * dShare;
  const afterEdu = afterDesire * eShare;
  const afterKids = afterEdu * kShare;

  return {
    radius: opts.radius, zipsInRange, popInRange,
    singleWomenAll: Math.round(singleWomenAll),
    rawWomen: Math.round(rawWomen),
    shares: { race: rShare, single: sShare, income: iShare, desire: dShare, edu: eShare, kids: kShare },
    steps: [
      { label: "Women in age range, in radius", n: Math.round(afterAgeArea) },
      { label: "Of chosen race/ethnicity", n: Math.round(afterRace) },
      { label: "Single (chosen marital set)", n: Math.round(afterSingle) },
      { label: "In the chosen income range", n: Math.round(afterIncome) },
      { label: "In the attractiveness and fitness tier", n: Math.round(afterDesire) },
      { label: "Meeting the education filter", n: Math.round(afterEdu) },
      { label: kidsOk ? "Open to a partner with children" : "No children filter applied", n: Math.round(afterKids) },
    ],
    final: Math.round(afterKids),
  };
}

function computeModel(data, inputs) {
  const { tier, fitness, network, herIncome, herEdu, mobility, herKids, ageBand, importB, pedigree, history,
          sorting, fatherhood, bmi, height, yourIncome, incomeGrowth, loverValue, friction } = inputs;

  // Neutral fallbacks so an unpicked dropdown doesn't break the math (the UI also
  // requires all picks before showing results, but the explore table runs early).

  // Multi-select normalization for PRICING. herIncome and fitness may arrive as arrays.
  // Income: average the selected incV (or the comfortable-middle if "any"/empty).
  // Fitness: average the selected look/cost multipliers, and pick a representative single
  // level (the middle of the selected set) for the bmi-fitness interaction.
  const incList = Array.isArray(herIncome) ? herIncome.filter((x) => x && x !== "any") : (herIncome && herIncome !== "any" ? [herIncome] : []);
  let incV;
  if (!incList.length) incV = 0.04;
  else { let s = 0, n = 0; for (const k of incList) { const rec = HERINCOME_BY_ID[k]; if (rec && rec.priceV != null) { s += rec.priceV; n++; } } incV = n ? s / n : 0.04; }

  const fitList = Array.isArray(fitness) ? fitness.filter((x) => x && x !== "any") : (fitness && fitness !== "any" ? [fitness] : []);
  let fit, fitnessRep;
  if (!fitList.length) { fit = { lookMult: 1.0, costMult: 1.1 }; fitnessRep = "fitAvg"; }
  else {
    let lm = 0, cm = 0, n = 0;
    for (const k of fitList) { const f = FITNESS_BY_ID[k]; if (f && f.lookMult != null) { lm += f.lookMult; cm += f.costMult; n++; } }
    fit = n ? { lookMult: lm / n, costMult: cm / n } : { lookMult: 1.0, costMult: 1.1 };
    // representative id for the BMI interaction: the one nearest the averaged lookMult
    fitnessRep = fitList.reduce((best, k) => {
      const f = FITNESS_BY_ID[k];
      if (!f || f.lookMult == null) return best;
      if (!best || Math.abs(f.lookMult - fit.lookMult) < Math.abs(FITNESS_BY_ID[best].lookMult - fit.lookMult)) return k;
      return best;
    }, null) || "fitAvg";
  }

  // Children may be multi-select (ids). Pricing rule: "No children" alone uses that value;
  // "any" or any mix that includes a children option uses the most common real case
  // (co-parent in town, tied to the area). Resolve to one representative id.
  const kidList = Array.isArray(herKids) ? herKids.filter((x) => x && x !== "any") : (herKids && herKids !== "any" ? [herKids] : []);
  let herKidsId;
  if (!kidList.length) herKidsId = "hkCoparent";
  else if (kidList.length === 1 && kidList[0] === "hkNone") herKidsId = "hkNone";
  else herKidsId = "hkCoparent";
  const impV = IMPORT_BY_ID[importB] != null ? IMPORT_BY_ID[importB].priceV : 0;

  // ===== B / C / M REGIME =====================================================
  // S = B x C x M. B is her lifestyle cost in real dollars (a clean sum, no modifier).
  // C is expectation: a weighted sum of grid levers, amplified by looks-scarcity.
  // M is optionality: a weighted sum of grid levers, scaled by suitor-scarcity.
  // All levers ride a 0-2.0 grid (1.0 neutral). Radius aggregates arrive on `data`
  // (radius pop-weighted COL/obesity/housing and the radius male-earnings array).
  const radMedHH = data.medHH;
  const col = data.col != null ? data.col : (radMedHH != null ? radMedHH / NAT_MED_HH : 1.0);
  const radObesity = data.obesity != null ? data.obesity : NAT_OBESITY;
  const housingAnnual = data.housingAnnual != null ? data.housingAnnual : (radMedHH != null ? radMedHH * 0.28 : 21000);
  const maleEarns = Array.isArray(data.maleEarns) ? data.maleEarns : null;

  // --- grid levers from her inputs (id -> 0-2.0 grid value) ---
  const TIER_GRID = { tierMagazine: 2.0, tierStriking: 1.6, tierAbove: 1.2, tierAttractive: 1.0, tierAverage: 0.9, tierBelow: 0.8 };
  const tierGrid = TIER_GRID[tier] != null ? TIER_GRID[tier] : 1.0;

  const CIRCLE_GRID = { netOldMoney: 2.0, netElite: 1.6, netPro: 1.2, netRegional: 1.0, netCommunity: 0.8 };
  const circleGrid = CIRCLE_GRID[network] != null ? CIRCLE_GRID[network] : 1.2;

  // age on the 5 real bands: arc value for C (expectation) and optionality value for M.
  const AGE_C_GRID = { ageUnder28: 1.6, age28_33: 1.6, age34_38: 0.9, age39_44: 0.7, age45up: 0.4 };
  const AGE_M_GRID = { ageUnder28: 1.8, age28_33: 1.4, age34_38: 1.1, age39_44: 0.9, age45up: 0.7 };
  const ageKey = inputs.ageOverride != null && inputs.ageOverride.id ? inputs.ageOverride.id : ageBand;
  const ageCGrid = AGE_C_GRID[ageKey] != null ? AGE_C_GRID[ageKey] : 1.1;
  const ageMGrid = AGE_M_GRID[ageKey] != null ? AGE_M_GRID[ageKey] : 1.1;

  // market lever: radius all-earner income vs national median, banded.
  const mr = radMedHH / NAT_MED_HH;
  const marketGrid = mr >= 1.5 ? 2.0 : mr >= 1.3 ? 1.7 : mr >= 1.15 ? 1.4 : mr >= 1.0 ? 1.2 : mr >= 0.85 ? 1.0 : mr >= 0.7 ? 0.9 : 0.8;

  // her income lever (multi-select averages; "any"/empty -> neutral-ish middle).
  const INCOME_GRID = { inc200plus: 1.6, inc150_199: 1.4, inc100_149: 1.3, inc75_99: 1.1, inc1_75: 0.9, incNone: 0.8 };
  let incomeGrid;
  if (!incList.length) incomeGrid = 1.1;
  else { let s = 0, n = 0; for (const k of incList) { if (INCOME_GRID[k] != null) { s += INCOME_GRID[k]; n++; } } incomeGrid = n ? s / n : 1.1; }

  // her education lever (highest selected drives it).
  const EDU_GRID = { eduGrad: 1.4, eduBach: 1.3, eduAssoc: 1.1, eduSome: 1.0, eduHS: 0.9 };
  const eduKey = inputs.eduOverride != null ? inputs.eduOverride : herEdu;
  const eduGrid = EDU_GRID[eduKey] != null ? EDU_GRID[eduKey] : 1.0;

  // mobility and kids levers for M.
  const MOB_GRID = { mobAnywhere: 1.8, mobRooted: 1.2, mobTied: 0.9 };
  const mobGrid = MOB_GRID[mobility] != null ? MOB_GRID[mobility] : 1.2;
  const KIDS_M_GRID = { hkNone: 1.4, hkRelocate: 1.2, hkOnline: 1.1, hkCoparent: 0.8 };
  const kidsMGrid = KIDS_M_GRID[herKidsId] != null ? KIDS_M_GRID[herKidsId] : 1.1;
  // kids lever for B's lifestyle line.
  const KIDS_B_GRID = { hkNone: 1.1, hkRelocate: 1.0, hkOnline: 1.0, hkCoparent: 0.9 };
  const kidsBGrid = KIDS_B_GRID[herKidsId] != null ? KIDS_B_GRID[herKidsId] : 1.0;

  // realized looks (kept for downstream / desirability), and the BMI x fitness cost interaction.
  const bf = bmiFitness(bmi, fitnessRep);
  const kidsLookHit = (herKidsId && herKidsId !== "hkNone") ? 0.95 : 1.0;
  const realizedTier = tierGrid * fit.lookMult * bf.look * kidsLookHit;

  // --- B: lifestyle cost in real dollars (clean sum, no modifier) ---
  const housing$ = housingAnnual * tierGrid;
  const upkeep$ = UPKEEP_BASE * col * bf.cost;
  const lifestyle$ = LIFESTYLE_BASE * col * tierGrid * kidsBGrid;
  const B = housing$ + upkeep$ + lifestyle$;

  // --- C: expectation = weighted sum x looks-scarcity ---
  const cSum = 0.4 * circleGrid + 0.2 * ageCGrid + 0.2 * marketGrid + 0.1 * incomeGrid + 0.1 * eduGrid;
  const obesRatio = radObesity / NAT_OBESITY;
  const looksScarcity = obesRatio >= 1.2 ? 1.8 : obesRatio >= 1.1 ? 1.5 : obesRatio >= 0.95 ? 1.2 : obesRatio >= 0.8 ? 1.0 : 0.8;
  const C = cSum * looksScarcity;

  // --- M: optionality = weighted sum x suitor-scarcity ---
  const mSum = 0.5 * mobGrid + 0.3 * kidsMGrid + 0.2 * ageMGrid;
  // suitor scarcity (optionality only): share of radius men clearing her C-implied bar,
  // times radius male-pool depth vs national. More qualifying men => more real exits.
  let suitorScarcity = 1.0;
  if (maleEarns && maleEarns.length) {
    const N = maleEarns.length;
    const pctVal = (p) => maleEarns[Math.max(0, Math.min(N - 1, Math.floor(N * p / 100)))];
    const reqPct = Math.max(20, Math.min(95, Math.round((C / 2.0) * 100)));
    const bar = pctVal(reqPct);
    let clearing = 0; for (let i = 0; i < N; i++) if (maleEarns[i] >= bar) clearing++;
    const shareClearing = clearing / N;
    const depth = pctVal(50) / NAT_MALE_MED;
    const idx = shareClearing * depth;
    suitorScarcity = idx >= 0.30 ? 1.4 : idx >= 0.22 ? 1.3 : idx >= 0.16 ? 1.2 : idx >= 0.11 ? 1.1 : idx >= 0.07 ? 1.0 : idx >= 0.04 ? 0.9 : 0.8;
  }
  const M = mSum * suitorScarcity;

  const S = B * C * M;

  // ===== V / F / K REGIME =====================================================
  // delivered = ( (Vp + Vl) ) x fatherMod x frictionMod, gated by import, vs S.
  // Vp is provision in real after-tax dollars above his own radius-scaled floor, plus his
  // inflation-discounted future lift, scaled by height. Vl is the relational lift (Vp x the
  // relational step, discounted by k). fatherMod and frictionMod are penalties on the 0.1
  // ruler: structural family load and general life-drag. Only his income is reported dollars;
  // everything else is a step on the ruler. No flat fatherhood dollar table, no FRICTION_MAX.

  // afterTax: his reported income at the real effective rate (federal brackets + FICA + state).
  const afterTax = yourIncome * afterTaxKept(yourIncome);

  // selfFloor: what he keeps to live at his own standard. Bottom = radius single-person COL
  // (radius median scaled toward a single adult), rising with his local income rank, capped
  // at his own after-tax income. Surplus above the floor is what he can deliver.
  const radiusMedian = radMedHH;
  const localPos = data.dist && data.dist.p20 != null
    ? (localPercentile(yourIncome, data.dist) || 50) / 100 : 0.5;   // local income rank 0-1
  const floorMultiple = 1.0 + localPos * 1.5;                        // 1.0x median .. ~2.5x top
  const selfFloor = radiusMedian * floorMultiple * afterTaxKept(yourIncome);
  const deliverableNow = Math.max(0, afterTax - selfFloor);

  // liftPV: his future income grown at his slider rate over a 5-yr horizon, after tax, then
  // discounted once by 2026 inflation weighted to his radius COL, softened 10% if income >=
  // 150k (high earners are less CPI-exposed). His slider is his full say on trajectory.
  const INFLATION_2026 = 0.032;                                      // published base
  const colWeight = radMedHH / NAT_MED_HH;                           // radius COL vs national
  const inflPenalty = yourIncome >= 150000 ? 0.9 : 1.0;              // high-earner softener
  const inflationRate = INFLATION_2026 * colWeight * inflPenalty;
  const fiveYrGross = yourIncome * (Math.pow(1 + incomeGrowth / 100, 5) - 1);
  const liftPV = (fiveYrGross * afterTaxKept(yourIncome)) / Math.pow(1 + inflationRate, 5);

  // k: relational discount, conditional on HER. Generational wealth is native to elite
  // circles (no demotion). Earned/some is a small demotion by default, larger only when she
  // sits where lineage is priced: she earns 200k+ or her circle is old-money/elite.
  const incHi = (Array.isArray(herIncome) ? herIncome : [herIncome]).includes("inc200plus");
  const circleHi = network === "netOldMoney" || network === "netElite";
  let k;
  if (pedigree === "pedGen") k = 1.0;
  else k = (incHi || circleHi) ? 0.8 : 0.9;

  // relationalMod: loverValue slider 100..0 by 10s. 100 -> 1.5, drops 0.2 per 10, floored at
  // 0.1, with 0 -> 0.01. Then k discounts the amplification above neutral.
  const relRaw = Math.max(0.1, 1.5 - ((100 - loverValue) / 10) * 0.2);
  const relGridRaw = loverValue <= 0 ? 0.01 : relRaw;
  const relationalMod = 1 + (relGridRaw - 1) * k;

  // height: documented male-preference multiplier (existing matrix).
  const heightMult = heightIncome(HEIGHT_TO_BAND(height), yourIncome);

  // Vp = provision, Vl = relational lift. Both real dollars off his provision base.
  const Vp = (deliverableNow + liftPV) * heightMult;
  const loverOffset = Vp * (relationalMod - 1);                      // relational lift in dollars
  const Vfull = Vp + loverOffset;                                    // Vp + Vl

  // fatherMod: structural family load as a step on the 0.1 ruler. Each row is another real,
  // citable burden (support guidelines, then travel, then conflict). Replaces a dollar table.
  const FATHER_STEP = { fhNone: 1.0, fhLocalJoint: 0.9, fhLocalSupport: 0.8, fhDistTravel: 0.7, fhDistHostile: 0.6 };
  const fatherMod = FATHER_STEP[fatherhood] != null ? FATHER_STEP[fatherhood] : 1.0;

  // frictionMod: general life-drag slider 0..100 by 10s. 0 -> 1.0, drops 0.1 per 10, 100 ->
  // 0.01 (never a hard zero). Master penalty on everything else he carries beyond family load.
  const frictionMod = friction >= 100 ? 0.01 : Math.max(0.01, 1.0 - friction / 100);

  // sorting still scales structural friction (out-of-type is a steeper climb). Applied as a
  // mild value penalty so it sits on the same delivered side.
  const sortMod = sorting === "sortOutType" ? (1 / 1.2) : 1.0;

  const delivered = Vfull * fatherMod * frictionMod * sortMod;
  const F = Vfull - delivered;                                       // implied drag, for display
  const margin = delivered - S;
  const clears = margin >= 0;
  const importLevel = impV;

  // Uncertainty band widens with conditions that make the estimate softer: very high
  // expectation, an unresolved import gate, high optionality, or a heavy family load.
  const softLoad =
    (C > 1.6 ? 1 : 0) + (importLevel > 0 ? 1 : 0) +
    (mSum >= 1.5 ? 1 : 0) + (fatherMod <= 0.7 ? 1 : 0);
  const bandPct = 0.18 + softLoad * 0.07;
  const sLow = S * (1 - bandPct), sHigh = S * (1 + bandPct);

  const pct = incomePercentile(yourIncome);
  const localPct = data.dist && data.dist.p20 != null ? localPercentile(yourIncome, data.dist) : null;
  const compPct = localPct != null ? localPct : pct;
  // entry percentile of her pool scales with her expectation C (now on its 0.58-3.3 range).
  // neutral C~1.2 -> ~p72; higher C lifts the bar. capped at 99.
  const entryPct = Math.min(99, Math.max(50, 60 + (C - 1.0) * 22));
  const inPool = compPct >= entryPct;

  // Income needed to ENTER her suitor pool: the local income at her entry percentile.
  const poolEntryIncome = data.dist && data.dist.p20 != null
    ? incomeAtPercentile(entryPct, data.dist) : null;

  // Gross needed to KEEP her: he must net BOTH her lifestyle cost S AND his own
  // after-tax cost of living (selfFloor) out of the same paycheck. Gross up the sum
  // so the after-tax amount covers her S in cash while he still funds his own life.
  const grossToKeep = grossFromAfterTax(S + selfFloor);
  // The binding requirement is the higher of: clearing her pool entry, or funding the keep.
  const totalToCompete = Math.max(grossToKeep, poolEntryIncome || 0);

  const grossGap = grossToKeep - yourIncome; // positive = deficit, negative = surplus
  let verdict, vClass;
  if (importLevel === 2) {
    if (grossGap <= 0) { verdict = "Funded today, you can afford her"; vClass = "fund"; }
    else { verdict = "Funded today, can't afford her"; vClass = "fund"; }
  }
  else if (!inPool) { verdict = "Priced out of her pool"; vClass = "below"; }
  else if (clears && margin > S * 0.25 && importLevel === 0) { verdict = "You can keep her"; vClass = "clear"; }
  else if (clears) { verdict = "Marginal — clears, but barely"; vClass = "marginal"; }
  else { verdict = "Below what it takes"; vClass = "below"; }

  // What percentile of local men earns enough to KEEP her (not just enter the pool).
  const keepPct = data.dist && data.dist.p20 != null ? localPercentile(grossToKeep, data.dist) : null;

  return {
    B, C, M, S, sLow, sHigh, Vp, loverOffset, F, delivered, margin, heightMult,
    clears, k, importLevel, bandPct, pct, verdict, vClass,
    grossToKeep, poolEntryIncome, totalToCompete, keepPct, grossGap,
    compPct, entryPct, inPool, localPct,
    maleMed: data.maleMed || null,
  };
}

// ---- Component ------------------------------------------------------------

// Registry of migrated single-select groups, keyed by their allQuestions label. Each new
// single-select migration adds one line here; the explainer resolver reads from this so no
// per-group branching is needed. (Income is multi-select and handled separately.)
const ID_SELECT_REGISTRY = {
  "How desirable is she locally": { byId: TIER_BY_ID, explain: TIER_EXPLAIN },
  "The money she interacts with regularly": { byId: NETWORK_BY_ID, explain: NETWORK_EXPLAIN },
  "How free she is to move": { byId: MOBILITY_BY_ID, explain: MOBILITY_EXPLAIN },
  "Is she all in?": { byId: IMPORT_BY_ID, explain: IMPORT_EXPLAIN },
  "Do you come from generational wealth": { byId: PEDIGREE_BY_ID, explain: PEDIGREE_EXPLAIN },
  "How her past reads": { byId: HISTORY_BY_ID, explain: HISTORY_EXPLAIN },
  "Are you her type?": { byId: SORTING_BY_ID, explain: SORTING_EXPLAIN },
  "Your children": { byId: FATHERHOOD_BY_ID, explain: FATHERHOOD_EXPLAIN },
};

// Registry of migrated multi-select groups, keyed by their allQuestions label. multiText is the
// fallback shown when more than one option is selected (no single explainer applies).
const ID_MULTI_REGISTRY = {
  "Her fitness": { byId: FITNESS_BY_ID, explain: FITNESS_EXPLAIN,
    multiText: "Her fitness raises both how she reads and the upkeep cost of her floor, and tightens the local pool of comparably fit women." },
  "What she earns": { byId: HERINCOME_BY_ID, explain: HERINCOME_EXPLAIN,
    multiText: "Her own income sets how much provision matters and how high her comparison set sits." },
  "Her children": { byId: HERKIDS_BY_ID, explain: HERKIDS_EXPLAIN,
    multiText: "Her children shape how anchored she is in place, which sets her reach to alternatives." },
  "Her BMI band": { byId: BMI_BY_ID, explain: BMI_EXPLAIN,
    multiText: "Averaging several BMI bands widens the body type you'd accept, which softens her looks-scarcity and lowers the price." },
};

const SECTIONS = [
  { id: "her", label: "Her market position", sub: "Sets the retention price S" },
  { id: "you", label: "Your delivered value", sub: "Sets your value V, considers friction F" },
  { id: "gate", label: "The gates", sub: "Is she all in, and where you stand" },
];

function RetentionCalculatorInner() {
  const [tier, setTier] = useState("");
  const [fitness, setFitness] = useState(["any"]);
  const [bmi, setBmi] = useState(["any"]);
  const [height, setHeight] = useState("");
  const [network, setNetwork] = useState("");
  const [herIncome, setHerIncome] = useState(["any"]);
  const [herEdu, setHerEdu] = useState("");
  const [eduSelected, setEduSelected] = useState([]); // checkboxes; highest drives model, combo drives funnel
  const [mobility, setMobility] = useState("");
  const [herKids, setHerKids] = useState(["any"]);
  const [ageBand, setAgeBand] = useState("");
  const [importB, setImportB] = useState("");
  const [pedigree, setPedigree] = useState("");
  const [history, setHistory] = useState("");
  const [sorting, setSorting] = useState("");
  const [fatherhood, setFatherhood] = useState("");

  const [yourIncome, setYourIncome] = useState(200000);
  const [incomeGrowth, setIncomeGrowth] = useState(5); // % expected annual income growth
  const [loverValue, setLoverValue] = useState(100); // Relational value, 0-100 step 10
  const [friction, setFriction] = useState(0); // Friction she absorbs, 0-100 step 10

  const [openSecs, setOpenSecs] = useState(["her"]);
  const isOpen = (id) => openSecs.includes(id);
  const toggleSec = (id) => setOpenSecs((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  const [calcExpanded, setCalcExpanded] = useState(false); // when results show, calc collapses unless user reopens
  const [explainOpen, setExplainOpen] = useState(false);
  const [formulaOpen, setFormulaOpen] = useState(false);
  const [disclaimOpen, setDisclaimOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [matchesOpen, setMatchesOpen] = useState(false);
  const [oliveTheme, setOliveTheme] = useState(true);
  const [activeExplain, setActiveExplain] = useState(null); // label of the most recently changed question
  const [explainVisible, setExplainVisible] = useState(true); // drives the fade out/in on change

  // ---- federal data (bundled snapshot) ----
  const [targetZip, setTargetZip] = useState("");
  const [live, setLive] = useState(null); // { medHHIncome, eduShareBplus, obesity, label }
  // availability funnel inputs
  const [availRace, setAvailRace] = useState(["any"]);
  const [availMarital, setAvailMarital] = useState(["any"]);
  const [ageLo, setAgeLo] = useState(18);
  const [ageHi, setAgeHi] = useState(65);
  const [ageTouched, setAgeTouched] = useState(false);
  const [radiusMi, setRadiusMi] = useState(50);
  const [liveStatus, setLiveStatus] = useState("idle"); // idle|ok|error
  const [liveMsg, setLiveMsg] = useState("");

  const fetchLive = useCallback(() => {
    const z = targetZip.trim();
    if (!/^\d{5}$/.test(z)) {
      setLiveStatus("error"); setLiveMsg("Enter a 5-digit ZIP."); return;
    }
    const data = lookupZip(z);
    if (!data || data.medHHIncome == null) {
      setLiveStatus("error");
      setLiveMsg("No data for ZIP " + z + ". Some ZIPs aren't tabulated by the Census. Try a nearby ZIP.");
      setLive(null);
      return;
    }
    setLive({ ...data, label: z });
    setLiveStatus("ok");
    setLiveMsg("Loaded ZIP " + z);
  }, [targetZip]);


  // Route the new questionnaire controls to the model. Age range -> population-weighted
  // optionality (ageOverride). Education checkboxes -> highest level for pricing (eduOverride).
  // herEdu / ageBand strings are kept in sync so the gate, stack, and Explore keep working.
  const modelHighestEdu = highestEdu(eduSelected);
  const ageOverride = live ? ageRangeToBand(ageLo, ageHi, live.women) : null;

  useEffect(() => {
    if (modelHighestEdu && modelHighestEdu !== herEdu) setHerEdu(modelHighestEdu);
  }, [modelHighestEdu]);
  useEffect(() => {
    // mark age as "picked" for the gate once a range exists (always true), using a stable token.
    if (!ageBand) setAgeBand("__range__");
  }, [ageBand]);

  const resultsShowing = useRef(false);
  const inputs = useMemo(() => ({ tier, fitness, network, herIncome, herEdu, mobility, herKids, ageBand, importB, pedigree,
    history, sorting, fatherhood, bmi, height, yourIncome, incomeGrowth, loverValue, friction,
    ageOverride, eduOverride: modelHighestEdu }),
    [tier, fitness, network, herIncome, herEdu, mobility, herKids, ageBand, importB, pedigree,
    history, sorting, fatherhood, bmi, height, yourIncome, incomeGrowth, loverValue, friction,
    ageOverride, modelHighestEdu]);

  // Primary result computes once a ZIP has been pulled AND every dropdown is picked.
  const allPicked = tier && fitness && network && herIncome && eduSelected.length && mobility && herKids && ageBand &&
    importB && pedigree && history && sorting && fatherhood && bmi.length && height;
  const r = useMemo(() => {
    if (!live || !live.medHHIncome || !allPicked) return null;
    // Radius aggregate (pop-weighted COL/obesity/housing + male-earnings sample) drives B/C/M.
    const agg = (targetZip && ZIP_DATA[targetZip]) ? radiusAggregate(ZIP_DATA, targetZip, radiusMi) : null;
    const data = agg
      ? { medHH: agg.medHH, col: agg.col, obesity: agg.obesity, housingAnnual: agg.housingAnnual, maleEarns: agg.maleEarns, dist: live.dist }
      : { medHH: live.medHHIncome, dist: live.dist };
    return computeModel(data, inputs);
  }, [live, allPicked, inputs, targetZip, radiusMi]);

  // When results first appear (calc auto-collapses), bring the user to the top so they land
  // on the verdict instead of staying scrolled at the bottom of the inputs.
  useEffect(() => {
    const showing = !!r && !calcExpanded;
    if (showing && !resultsShowing.current) {
      if (typeof window !== "undefined" && window.scrollTo) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    resultsShowing.current = showing;
  }, [r, calcExpanded]);

  const ladder = useMemo(() => {
    if (!live || !live.medHHIncome) return null;
    return classLadder({
      medHH: live.medHHIncome,
      ownerCostMortgage: live.ownerCostMortgage,
      grossRent: live.grossRent,
      homeValue: live.homeValue,
    });
  }, [live]);

  const availability = useMemo(() => {
    if (!live || !targetZip || !ZIP_DATA[targetZip]) return null;
    return computeAvailability(ZIP_DATA, targetZip, {
      ageLo, ageHi, radius: radiusMi,
      race: availRace, maritalSet: availMarital,
      tier, fitness, eduSelected, incomeSet: herIncome,
      kidsOk: FATHERHOOD_BY_ID[fatherhood] ? FATHERHOOD_BY_ID[fatherhood].kidsOk : false,
    });
  }, [live, targetZip, ageLo, ageHi, radiusMi, availRace, availMarital, tier, fitness, eduSelected, herIncome, fatherhood]);

  // Explore: run the same profile across every candidate metro, rank by single women
  // 18-64 (the once-a-year harvested count), and slice to the displayed top 40. Starting
  // from a 100-metro pool guarantees the displayed 40 are the true top 40.
  const exploreRows = useMemo(() => {
    return Object.entries(METRO_DATA).map(([name, d]) => {
      const res = computeModel(
        { medHH: d.medHH, dist: { p20: d.p20, p40: d.p40, p60: d.p60, p80: d.p80, p95: d.p95 } },
        inputs
      );
      const singleWomen = (d.singleWomen != null ? d.singleWomen : METRO_SINGLE_WOMEN[name]) || 0;
      return { name, medHH: d.medHH, S: res.S, compPct: res.compPct, entryPct: res.entryPct, inPool: res.inPool, vClass: res.vClass, singleWomen };
    }).sort((a, b) => b.singleWomen - a.singleWomen || b.S - a.S).slice(0, 40);
  }, [inputs]);

  // Running explainer stack: one entry per dropdown the user has picked, in calculator order.
  const eduStackText = eduSelected.length
    ? "Pricing uses the highest level selected (" + (EDU_BY_ID[modelHighestEdu] ? EDU_BY_ID[modelHighestEdu].label : "") + "); the availability count uses all "
      + eduSelected.length + " selected. More schooling tends to raise her expectations of a partner."
    : null;
  const ageStackText = "Her age range " + ageLo + " to " + ageHi + ". Pricing population-weights this range into one optionality multiplier; the count uses it to size the age pool.";
  // Full question list with current choices, BEFORE filtering. Tracking must see every
  // question (even unanswered ones) so a first-time answer registers as a change. The
  // rendered stack is the filtered subset (only answered questions with explainer text).
  const allQuestions = [
    ["How desirable is she locally", tier, "B"],
    ["Her fitness", fitness, "B"],
    ["Her BMI band", bmi, "B"],
    ["The money she interacts with regularly", network, "C"],
    ["What she earns", herIncome, "C"],
    ["Her education", eduSelected.length ? eduSelected.map((id) => EDU_BY_ID[id] ? EDU_BY_ID[id].label : id) : "", "C"],    ["How free she is to move", mobility, "M"],
    ["Her children", herKids, "M"],
    ["Her age range", ageTouched ? (ageLo + " to " + ageHi) : "", "M"],
    ["Is she all in?", importB, "gate"],
    ["Do you come from generational wealth", pedigree, "k"],
    ["How her past reads", history, "k"],
    ["Are you her type?", sorting, "F"],
    ["Your children", fatherhood, "F"],
    ["Your height", height, "V"],
  ].map(([label, v, vr]) => {
    // Migrated multi-selects stored as ids: resolve labels + explainer via the registry.
    if (ID_MULTI_REGISTRY[label]) {
      const { byId, explain, multiText } = ID_MULTI_REGISTRY[label];
      const ids = Array.isArray(v) ? v.filter((x) => x && x !== "any") : [];
      const labels = ids.map((id) => (byId[id] ? byId[id].label : id));
      const text = ids.length === 1 ? explain[ids[0]] : (ids.length ? multiText : null);
      return { label, choice: labels.length ? labels : null, text, vr };
    }
    // Migrated single-selects stored as ids: resolve label + explainer by id via the registry.
    if (ID_SELECT_REGISTRY[label]) {
      const { byId, explain } = ID_SELECT_REGISTRY[label];
      const rec = byId[v];
      return { label, choice: rec ? rec.label : null, text: rec ? explain[v] : null, vr };
    }
    return {
      label, choice: v,
      text: label === "Her education" ? eduStackText : label === "Her age range" ? ageStackText
        : (EXPLAIN[v] || (label === "Your height" ? heightExplain(v) : null)),
      vr,
    };
  });
  const stack = allQuestions.filter((s) => s.choice && s.text);

  // Track which question changed most recently so only its explainer shows. Signatures cover
  // ALL questions, so going from empty to a value counts as a change no matter the order picked.
  const prevChoices = useRef(null);
  useEffect(() => {
    const cur = {};
    for (const s of allQuestions) cur[s.label] = JSON.stringify(s.choice);
    const prev = prevChoices.current;
    prevChoices.current = cur;
    if (prev === null) return; // first render: seed only, don't flash
    let changed = null;
    for (const s of allQuestions) {
      if (prev[s.label] !== cur[s.label]) changed = s.label; // last change in list order wins
    }
    if (!changed) return;
    // only surface it if that question now has a renderable card
    const card = stack.find((s) => s.label === changed);
    if (!card) return;
    setActiveExplain(changed);
    setExplainVisible(false);
    const t = setTimeout(() => setExplainVisible(true), 140);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions.map((s) => JSON.stringify(s.choice)).join("|")]);

  // Active card: the last-touched question, or fall back to the most recent answered one.
  const activeCard = stack.find((s) => s.label === activeExplain) || stack[stack.length - 1] || null;

  return (
    <div style={S_.wrap} className={"rpm-app" + (oliveTheme ? " rpm-olive" : "")}>
      <style>{CSS}</style>

      <header style={S_.header}>
        <div style={S_.headerInner}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <svg width="60" height="60" viewBox="0 -960 960 960" style={{ display: "block", flex: "0 0 auto" }} aria-hidden="true">
              <path fill="var(--ink)" d="M160-240v-320 13-173 480ZM160-640h640v-80H160v80Zm303 480H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v213q-35-25-76.5-39T716-560q-57 0-107.5 21.5T520-480H160v240h279q3 21 9 41t15 39Z" />
              <path fill="var(--accent)" d="M716-140L576-280q-13-13-18.5-28t-5.5-30q0-32 23-57t59-25q28 0 44 13t38 35q20-20 36.5-34t45.5-14q37 0 59.5 25.5T880-337q0 15-6 30t-18 27L716-140Z" />
            </svg>
            <div>
              <h1 style={S_.h1} className="rpm-h1">So You Want A High-Status Woman?</h1>
              <div style={{ ...S_.subtitle, marginTop: 3 }} className="rpm-subtitle">Here is what it takes to attract her / keep her</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }} className="rpm-formula">
            <div style={{ ...S_.eyebrow, marginBottom: 0 }}>A MALE DELUSION CALCULATOR</div>
            <div style={S_.formula}>
              <span style={S_.eqVar}>S = B × C × M</span>
              <svg style={S_.eqArrow} width="20" height="13" viewBox="0 0 24 16" fill="none" stroke={ACCENT} strokeWidth="1.22" strokeLinecap="round" strokeLinejoin="round" aria-label="if and only if">
                <line x1="5" y1="6.4" x2="19" y2="6.4" />
                <line x1="5" y1="9.6" x2="19" y2="9.6" />
                <polyline points="7.5 4 4 8 7.5 12" />
                <polyline points="16.5 4 20 8 16.5 12" />
              </svg>
              <span style={S_.eqVar}>(V<sub>p</sub> + V<sub>ℓ</sub>·k) − F ≥ S</span>
            </div>
          </div>
        </div>
        </div>
      </header>

      <div style={S_.grid} className="rpm-grid">
        {/* INPUT COLUMN */}
        <div style={{ ...S_.col, ...(r && !calcExpanded ? { gridColumn: "1 / -1" } : {}) }}>
          {r && !calcExpanded ? (
            <div style={S_.resultRow} className="rpm-resultrow">
              <div style={S_.calcCollapsed} onClick={() => { setCalcExpanded(true); setOpenSecs([]); }}>
                <div style={S_.calcCollapsedRow}>
                  <div>
                    <div style={S_.calcCollapsedTitle}>Inputs locked in{live && live.label ? " · " + live.label : ""}</div>
                    <div style={S_.calcCollapsedSub}>Tap to adjust her profile, your numbers, or the market.</div>
                  </div>
                  <span style={S_.chev}>+</span>
                </div>
              </div>
              <div style={S_.calcCollapsed} onClick={() => setDisclaimOpen((v) => !v)}>
                <div style={S_.calcCollapsedRow}>
                  <div>
                    <div style={S_.calcCollapsedTitle}>Data sources and outcomes</div>
                    <div style={S_.calcCollapsedSub}>Where every number comes from, and how to read it.</div>
                  </div>
                  <span style={S_.chev}>{disclaimOpen ? "−" : "+"}</span>
                </div>
                {disclaimOpen && (
                  <div style={{ ...S_.disclaim, marginTop: 10 }}>
                    The upkeep floor, the comparison nudge, the fitness-scarcity pressure, and your
                    income rank are anchored to real federal data for her ZIP: Census ACS county income
                    and earnings (2023), CDC PLACES obesity (2024), and the national income
                    distribution (2024–25). The money she interacts with regularly, her mobility, whether she's all in,
                    and her history are things only you can read, and they carry the wider range shown
                    on the right. Read this as a wake-up call, not a scoreboard. Modern hypergamy is real
                    and well-documented, with social media, reality television, and dating apps driving
                    expectations higher and placing more high-status men in front of her than any
                    generation in history. Pretending otherwise is how men get blindsided. The
                    only thing that moves your odds is becoming the man the number says you need to be.
                  </div>
                )}
              </div>
            </div>
          ) : (
          <>
          {SECTIONS.map((sec) => (
            <div key={sec.id} style={S_.accordion}>
              <button
                onClick={() => toggleSec(sec.id)}
                style={{ ...S_.accBtn, ...(isOpen(sec.id) ? S_.accBtnOpen : {}) }}
              >
                <span>
                  <span style={S_.accLabel}>{sec.label}</span>
                  <span style={S_.accSub}>{sec.sub}</span>
                </span>
                <span style={S_.chev}>{isOpen(sec.id) ? "−" : "+"}</span>
              </button>

              {isOpen(sec.id) && sec.id === "her" && (
                <div style={S_.accBody}>
                  <div style={S_.liveBox}>
                    <div style={S_.liveTitle}>Federal data by ZIP</div>
                    <div style={S_.liveRow}>
                      <input
                        placeholder="Target ZIP (where you'd meet her)"
                        value={targetZip}
                        onChange={(e) => setTargetZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                        onKeyDown={(e) => { if (e.key === "Enter") fetchLive(); }}
                        style={S_.liveInput}
                      />
                      <button onClick={fetchLive} style={S_.liveBtn}>Load</button>
                    </div>
                    {liveMsg && (
                      <div style={{ ...S_.liveMsg, color: liveStatus === "ok" ? "#1a6b4a" : liveStatus === "error" ? ACCENT : "var(--warm1)" }}>
                        {liveMsg}
                      </div>
                    )}
                    {live && live.medHHIncome && (
                      <div style={S_.liveStats}>
                        <div style={S_.liveStatBox}>
                          <div style={S_.liveStatNum}>{FMT(live.medHHIncome)}</div>
                          <div style={S_.liveStatLbl}>Median HH income</div>
                        </div>
                        <div style={S_.liveStatBox}>
                          <div style={S_.liveStatNum}>{live.obesity != null ? Math.round(live.obesity * 100) + "%" : "—"}</div>
                          <div style={S_.liveStatLbl}>Adult obesity</div>
                        </div>
                        <div style={S_.liveStatBox}>
                          <div style={S_.liveStatNum}>{live.eduShareBplus != null ? Math.round(live.eduShareBplus * 100) + "%" : "—"}</div>
                          <div style={S_.liveStatLbl}>Bachelor's+</div>
                        </div>
                      </div>
                    )}
                    {!(live && live.medHHIncome) && (
                    <div style={S_.liveHint}>
                      Enter the ZIP where you'd meet her. Pulls real ACS income, education, and
                      housing for that ZIP plus CDC obesity for its county, from bundled US Census
                      and CDC data. No account needed.
                    </div>
                    )}
                    {live && (
                      <div style={{ marginTop: 12 }}>
                        <Field label="Search radius" hint="Distance from your ZIP. The availability count sums every ZIP whose center falls inside this radius. Dating apps commonly cap around this range.">
                          <Range v={radiusMi} set={setRadiusMi} min={10} max={250} step={5} unit=" mi" />
                        </Field>
                      </div>
                    )}
                  </div>
                  {live && (
                    <>
                      <Field label="Her race or ethnicity">
                        <Checks opts={RACE_OPTS} selected={availRace} setSelected={setAvailRace} />
                      </Field>
                      <Field label="Relationship status">
                        <Checks opts={MARITAL_OPTS} selected={availMarital} setSelected={setAvailMarital} />
                      </Field>
                    </>
                  )}
                  <Field label="How desirable is she locally" hint="Her visual appeal ranked against other women in the local dating economy.">
                    <Sel v={tier} set={setTier} opts={TIER_OPTS} />
                  </Field>
                  <Field label="Her fitness level" hint="Fitness contextualizes her looks. This raises how attractive she reads in the dating economy and adds real upkeep costs like fitness regimens, studios, trainers, wellness spas, recovery, diet, and other procedures.">
                    <Checks opts={FITNESS_OPTS} selected={fitness} setSelected={setFitness} />
                  </Field>
                  <Field label="Her BMI band" hint="BMI interacts with fitness. Low BMI plus high fitness enhances both her looks and her upkeep cost. High BMI plus low fitness compounds the penalty. Pick several to widen your range, or Any if her body type is open.">
                    <Checks opts={["any", ...BMI_BANDS]} selected={bmi} setSelected={setBmi} />
                  </Field>
                  <Field label="The money she interacts with regularly" hint="The biggest driver of her price. Look at the career paths of her exes and the partners of her five closest friends.">
                    <Sel v={network} set={setNetwork} opts={NETWORK_OPTS} />
                  </Field>
                  <Field label="What she earns herself" hint="Single women will use their own income as the floor for a partner's income expectations with significant attraction preference going to higher earners. Professional women might also create a rough calculation about what it will take for a partner to maintain his status and absorb her current or increased lifestyle costs as a couple along with the cost of having children. This becomes more extreme if she expects to stay at home with the children.">
                    <Checks opts={HERINCOME_OPTS} selected={herIncome} setSelected={setHerIncome} />
                  </Field>
                  <Field label="Her education" hint="Tap any that apply. More schooling tends to come with higher expectations of a partner.">
                    <Checks opts={EDU_OPTS} selected={eduSelected} setSelected={setEduSelected} />
                  </Field>
                  <Field label="How free she is to move" hint="How many options she can reach beyond where she lives.">
                    <Sel v={mobility} set={setMobility} opts={MOBILITY_OPTS} />
                  </Field>
                  <Field label="Does she have children?" hint="Her kids and where their other parent lives shape how freely she can pursue other options.">
                    <Checks opts={HERKIDS_OPTS} selected={herKids} setSelected={setHerKids} />
                  </Field>
                  <Field label="Her age range" hint="Sets her optionality for pricing (population-weighted across the range) and the age pool for the availability count. Snaps to Census bands; partial bands are prorated.">
                    <RangeDual lo={ageLo} hi={ageHi} setLo={(x) => { setAgeLo(x); setAgeTouched(true); }} setHi={(x) => { setAgeHi(x); setAgeTouched(true); }} min={18} max={65} step={1} />
                  </Field>
                </div>
              )}

              {isOpen(sec.id) && sec.id === "you" && (
                <div style={S_.accBody}>
                  <Field label="Your gross annual income" hint={`≈ ${incomePercentile(yourIncome).toFixed(1)}th percentile among US individual earners`}>
                    <Num v={yourIncome} set={setYourIncome} step={25000} min={0} max={5000000} />
                  </Field>
                  <Field label="Your height" hint="A documented preference variable for men. Height and income trade off, so the shorter you are, the more income it takes to land the same.">
                    <Sel v={height} set={setHeight} opts={HEIGHT_PICK} />
                  </Field>
                  <Field label="Expected annual income growth" hint="The rate your income is climbing. She prices your trajectory, not just today's number.">
                    <Range v={incomeGrowth} set={setIncomeGrowth} min={0} max={30} step={1} unit="%" />
                  </Field>
                  <Field label="Relational value you deliver" hint={RELATIONAL_TEXT(loverValue)}>
                    <Range v={loverValue} set={setLoverValue} min={0} max={100} step={10} />
                  </Field>
                  <Field label="Do you have children?" hint="Your fatherhood structure is the biggest friction a partner has to absorb. This sets most of it.">
                    <Sel v={fatherhood} set={setFatherhood} opts={FATHERHOOD_OPTS} />
                  </Field>
                  <Field label="Do you have other frictions in your life that might make dating difficult?" hint={FRICTION_TEXT(friction)}>
                    <Range v={friction} set={setFriction} min={0} max={100} step={10} />
                  </Field>
                </div>
              )}

              {isOpen(sec.id) && sec.id === "gate" && (
                <div style={S_.accBody}>
                  <Field label="Is she all in?" hint="The make-or-break gate. If she's sourcing attention or money elsewhere, your money is funding her, not keeping her.">
                    <Sel v={importB} set={setImportB} opts={IMPORT_OPTS} />
                  </Field>
                  <Field label="Do you come from generational wealth" hint="In a world where safety is code for wealth and financial independence, generational wealth is a premium on top of high wage earnings or entrepreneurialism.">
                    <Sel v={pedigree} set={setPedigree} opts={PEDIGREE_OPTS} />
                  </Field>
                  <Field label="How her past affects long-term value" hint="Only matters for something serious. The louder her options are part of her image, the more it counts against the wife-tier read.">
                    <Sel v={history} set={setHistory} opts={HISTORY_OPTS} />
                  </Field>
                  <Field label="Are you her usual type?" hint="Does she give all types of men a chance or does she stick with a type? As high as 80% of marriages stick to general archetypes and met expectations in a partner.">
                    <Sel v={sorting} set={setSorting} opts={SORTING_OPTS} />
                  </Field>
                </div>
              )}
            </div>
          ))}
          </>
          )}
        </div>

        {/* OUTPUT COLUMN */}
        <div style={{ ...S_.col, ...(r && !calcExpanded ? { gridColumn: "1 / -1" } : {}) }}>
          {!r ? (
            <>
              <div style={S_.empty}>
                <div style={S_.emptyHead}>
                  <div style={S_.emptyTitle}>
                    {live && live.medHHIncome
                      ? "Finish the questions to see the result"
                      : "Enter her ZIP to run the model"}
                  </div>
                  <div style={S_.emptyMark}>S = B × C × M</div>
                </div>
                <div style={S_.emptyText}>
                  {live && live.medHHIncome
                    ? "Her market is loaded for " + live.label + ". Answer each question on the left. Every answer is explained below and tagged with the part of the equation it builds: B her floor, C the comparison, M her options, k the discount, F your friction. The full result appears once they're all in."
                    : "Put the ZIP where you hope to meet her in the panel on the left and hit Pull. As you answer the questions below it, each answer is explained here and tagged with the part of the equation it feeds. The full result appears once the ZIP is in and the questions are answered."}
                </div>
              </div>
              {activeCard ? (
                <div
                  key={activeCard.label}
                  style={{
                    ...S_.exCard,
                    opacity: explainVisible ? 1 : 0,
                    transition: "opacity 0.18s ease",
                  }}
                >
                  <div style={S_.exCardTop}>
                    <div style={S_.exCardLabelRow}>
                      <span style={S_.exCardLabel}>{activeCard.label}</span>
                      <span style={activeCard.vr === "gate" ? S_.exVarGate : S_.exVar}>
                        {activeCard.vr === "gate" ? "GATE" : "→ " + activeCard.vr}
                      </span>
                    </div>
                    <span style={S_.exCardChoice}>{Array.isArray(activeCard.choice) ? activeCard.choice.join(", ") : activeCard.choice}</span>
                  </div>
                  <div style={S_.exCardText}>{activeCard.text}</div>
                </div>
              ) : null}
            </>
          ) : (
          <>
          <div style={S_.resultRow} className="rpm-resultrow">
          <div style={{ ...S_.verdict, ...VERDICT_STYLE[r.vClass] }}>
            <div style={S_.blLabel}>Can You Afford Her Lifestyle</div>
            <div style={{ ...S_.blNum, color: "inherit" }} className="rpm-bignum">{FMT(Math.abs(r.grossGap))}<span style={{ ...S_.blYr, color: "inherit", opacity: 0.7 }}>{r.grossGap > 0 ? "income deficit" : "income surplus"}</span></div>
            <div style={{ ...S_.verdictNote, border: "1px dashed rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", padding: "16px 18px", marginTop: 14, lineHeight: 1.55, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13 }}>
              {r.importLevel === 2 ? (
                r.grossGap <= 0 ? (
                  <>At her status level today, the odds are she is likely receiving <strong>{FMT(r.S)}</strong> after
                  taxes to maintain her lifestyle. If this doesn't come from her own income or generational wealth
                  or she decides not to work, you will need to deliver roughly <strong>{FMT(r.grossToKeep)}</strong> gross
                  annual income while in a committed relationship. Luckily, you can afford her with a <strong>{FMT(-r.grossGap)}</strong> surplus
                  in annual income.</>
                ) : (
                  <>At her status level today, the odds are she is likely receiving <strong>{FMT(r.S)}</strong> after
                  taxes to maintain her lifestyle. If this doesn't come from her own income or generational wealth
                  or she decides not to work, you will need to deliver roughly <strong>{FMT(r.grossToKeep)}</strong> gross
                  annual income while in a committed relationship. Unfortunately, you are facing a <strong>{FMT(r.grossGap)}</strong> deficit
                  in annual income.</>
                )
              ) : !r.inPool ? (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. But before
                that matters, she checks whether your income competes in her local pool, and at <strong>{FMT(yourIncome)}</strong> you
                fall below the <strong>{FMT(r.poolEntryIncome)}</strong> entry bar. Unfortunately, you are priced out before your
                ability to fund her lifestyle is ever weighed.</>
              ) : r.grossGap > 0 ? (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. She will want
                to know you can absorb that amount if she isn't working. To deliver and still fund your own life, you'd
                need to earn roughly <strong>{FMT(r.grossToKeep)}</strong> gross annual income. Unfortunately, you are
                facing a <strong>{FMT(r.grossGap)}</strong> deficit in annual income.</>
              ) : r.vClass === "marginal" ? (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. She will want
                to know you can absorb that amount if she isn't working. To deliver and still fund your own life, you'd
                need to earn roughly <strong>{FMT(r.grossToKeep)}</strong> gross annual income. You clear that, but by
                only a <strong>{FMT(-r.grossGap)}</strong> margin, thin enough that a lean year or a higher earner closes it.</>
              ) : (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. She will want
                to know you can absorb that amount if she isn't working. To deliver and still fund your own life, you'd
                need to earn roughly <strong>{FMT(r.grossToKeep)}</strong> gross annual income. You clear that with
                a <strong>{FMT(-r.grossGap)}</strong> surplus in annual income.</>
              )}
            </div>
          </div>

          <div style={S_.bottomLine}>
            <div style={S_.blLabel}>Bottom Line: Can You Keep Her Safe</div>
            <div style={S_.blNum} className="rpm-bignum">{FMT(r.totalToCompete)}<span style={S_.blYr}>/yr annual income</span></div>
            <div style={{ ...S_.blExplain, background: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>
              In most cases, you must demonstrate you can earn enough to compete in her local suitor
              pool (<strong>{FMT(r.grossToKeep)}</strong> gross income) which absorbs her lifestyle costs
              (<strong>{FMT(r.S)}</strong>) without sacrificing your own lifestyle and status. You have to
              clear both and expect her to run this general calculation as part of her evaluation of you
              as a partner. In today's dating economy, women use a common but coded phrase: "Can you keep me safe?" Can you?
            </div>
          </div>
          </div>
          </>
          )}
        </div>
      </div>

      {/* FULL-WIDTH RESULTS */}
      {r && (
        <div style={S_.fwWrap}>
          <div style={S_.fwPair} className="rpm-fwpair">
            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>
                What it takes to keep her
                <span style={S_.liveBadge}>●&nbsp; {live.label}</span>
              </div>
              <div style={S_.bigNum} className="rpm-bignum">{FMT(r.S)}<span style={S_.perYr}>in expenses</span></div>
              <div style={S_.band}>
                Her floor {FMT(r.sLow)} · her ceiling {FMT(r.sHigh)} (±{Math.round(r.bandPct * 100)}%)
              </div>
              <BandBar low={r.sLow} mid={r.S} high={r.sHigh} delivered={r.delivered} />
            </div>

            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>
                You vs other men
                <span style={S_.liveBadge}>●&nbsp; {live.label}</span>
              </div>
              <div style={S_.bigNum} className="rpm-bignum">
                {Math.round(r.compPct)}<span style={S_.ord}>{ordinal(Math.round(r.compPct))}</span>
                <span style={S_.perYr}>percentile locally</span>
              </div>
              <div style={S_.band}>
                {r.maleMed ? <>Local male median earnings {FMT(r.maleMed)}. </> : null}
                To be a real option for her you'd need about the {Math.round(r.entryPct)}{ordinal(Math.round(r.entryPct))} percentile
                {r.poolEntryIncome ? <>, roughly <strong>{FMT(r.poolEntryIncome)}/yr</strong> here</> : null} (higher the pickier her circle).
              </div>
              <TierBar entry={r.entryPct} you={r.compPct} inPool={r.inPool} />
            </div>

            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>What this means</div>
              <div style={S_.meansText}>
                That <strong>{FMT(r.S)}</strong> is what she'd need to receive, after tax. To deliver it and still
                fund your own life, you'd have to earn roughly{" "}
                <strong>{FMT(r.grossToKeep)}/yr</strong> gross income. You're paying for two lives at
                once, not grossing up one number.
              </div>
              <div style={S_.meansDivide} />
              <div style={S_.meansText}>
                {r.inPool
                  ? <>You're in her suitor pool: your income sits <strong>{Math.max(0, Math.round(r.compPct - r.entryPct))} points</strong> above the line just to be considered. That is a different, lower bar than keeping her. {r.keepPct != null && <>Actually meeting her retention price takes about the <strong>{Math.round(r.keepPct)}{ordinal(Math.round(r.keepPct))} percentile</strong> of local men{r.keepPct >= r.compPct ? <>, above where you land, which is why the price card shows a shortfall even though you clear the pool</> : null}.</>}</>
                  : <>Your income lands <strong>{Math.round(r.entryPct - r.compPct)} points below</strong> the line to even be considered here. Keeping her is a still-higher bar{r.keepPct != null ? <>, around the {Math.round(r.keepPct)}{ordinal(Math.round(r.keepPct))} percentile of local men</> : null}.</>}
              </div>
            </div>
          </div>

          <div style={S_.fwQuad} className="rpm-fwquad">
            <Term label="B · upkeep floor" val={FMT(r.B)} note="from local income" />
            <Term label="C · comparison intensity" val={"×" + r.C.toFixed(2)} note="network-driven" hot={r.C >= 2.0} />
            <Term label="M · mobility" val={"×" + r.M.toFixed(2)} note="reach × age" />
            <Term label="k · history discount" val={"×" + r.k.toFixed(2)} note="on relational value" />
          </div>

          <div style={S_.fwDuo} className="rpm-fwduo">
            <div style={S_.vCard}>
              <div style={S_.cardTitle}>Your delivered value · V − F</div>
              <VRow label="Provider value (Vp)" val={FMT(r.Vp)} pos />
              <VRow label="Relational value after discount" val={"+ " + FMT(r.loverOffset)} pos />
              <VRow label="Friction she absorbs (F)" val={"− " + FMT(r.F)} />
              <div style={S_.vTotal}>
                <span>Net delivered</span>
                <span>{FMT(r.delivered)}</span>
              </div>
            </div>

            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>What this means</div>
              <div style={S_.meansText}>
                {!r.inPool
                  ? <><strong>Priced out, not just outbid.</strong> Your income sits below the entry line for the men competing for her here. Whether you can keep her is the second question; the first is whether you're in the pool at all, and at her comparison intensity you're not yet.</>
                  : r.importLevel === 1
                  ? <><strong>Import is ambiguous.</strong> The single most decisive variable is unresolved. Until it reads zero under real exclusivity, treat the price as unpayable regardless of margin, because the gate sits before the inequality.</>
                  : r.vClass === "clear"
                  ? <><strong>Clears with margin.</strong> Your value exceeds her price and the import gate is open. The remaining risk is verification: the soft terms confirm only with time under real friction, not at the start.</>
                  : r.vClass === "marginal"
                  ? <><strong>Clears, but only just.</strong> You're over her price with little room. A bad month, a richer entrant in her network, or any rise in her benchmark erases the margin. A hold, not a lock.</>
                  : <><strong>Below what it takes.</strong> The shortfall is structural, not effort. Turning up relational value won't close it, because that value is capped and discounted.</>}
              </div>
              <div style={S_.meansDivide} />
              <div style={S_.meansText}>
                {!r.inPool
                  ? <>To improve your odds, the lever is income relative to local male competition, not anything inside the relationship. Worth asking honestly: are the women you're pursuing a realistic match for the life you lead today, or are you fishing in a pool priced above you?</>
                  : r.importLevel === 1
                  ? <>Resolve the ambiguity before spending another dollar of effort. Get to real exclusivity and re-run this; nothing else you do counts until that gate reads zero.</>
                  : r.vClass === "clear"
                  ? <>Hold the line you're on. Don't overpay to a benchmark you already clear, and let time under real friction confirm the soft terms rather than buying them upfront.</>
                  : r.vClass === "marginal"
                  ? <>Protect the thin margin: reduce friction in your life where you can, and don't anchor to a woman whose benchmark is still climbing. A small shift in her network closes the gap against you.</>
                  : <>The real levers are a woman who isn't comparing you to a richer field, less friction in your life, or materially more income. Ask whether this tier of woman fits the life you actually lead, or whether you're competing for a price you're not built to pay today.</>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIVIDER before already-full-width sections */}
      {r && (
        <div style={S_.fwDivider}><div style={S_.fwDividerLine} /></div>
      )}

      {/* AVAILABILITY FUNNEL */}
      {availability && r && (
        <div style={S_.ladderWrap}>
          <div style={S_.ladderHead}>
            <h2 style={S_.ladderTitle}>How many like her are actually around</h2>
            <p style={{ ...S_.ladderSub, maxWidth: "none" }}>
              Starting from every woman in your age range within {availability.radius} miles of ZIP{" "}
              {targetZip} ({availability.zipsInRange.toLocaleString()} ZIPs, {availability.popInRange.toLocaleString()} people),
              each filter narrows the pool. Race, marital, and age come from the Census; they are
              published separately, so the combined count is a modeled estimate, not a single
              cross-tabulated figure.
            </p>
          </div>
          <div style={S_.availBox}>
            <div style={S_.availBoxNum}>{availability.final.toLocaleString()}<span style={S_.availBoxNumLbl}>potential matches</span></div>
            <div style={S_.availBoxText}>
              Estimated women within {availability.radius} miles who match the age, race,
              single status, attractiveness, education, and openness filters you set.
              {availability.singleWomenAll > 0 && (
                <> That is <strong>{fmtTinyPct(availability.final, availability.singleWomenAll)}</strong> of
                the {availability.singleWomenAll.toLocaleString()} single women (18-64)
                in the radius.</>
              )}
            </div>
          </div>
          <div style={S_.funnelWrap}>
            {availability.steps.map((s, i) => {
              const top = availability.steps[0].n || 1;
              const pct = Math.max(1, Math.round((s.n / top) * 100));
              return (
                <div key={i} style={S_.funnelRow}>
                  <div style={S_.funnelLabel}>{s.label}</div>
                  <div style={S_.funnelBarTrack}>
                    <div style={{ ...S_.funnelBar, width: pct + "%" }} />
                  </div>
                  <div style={S_.funnelNum}>{s.n.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
          <div style={S_.ladderNote}>
            Single status, race, and age are real Census shares for ZIP {targetZip}, combined
            proportionally. Attractiveness uses the local obesity rate and your looks and fitness
            inputs. Openness to a partner with children is a modeled assumption applied only
            because you indicated you have children. Treat the final number as an order-of-magnitude
            estimate, not a roster.
          </div>
        </div>
      )}

      {/* FAMILY OF FOUR OUTLOOK */}
      {ladder && r && (
        <div style={S_.ladderWrap}>
          <div style={S_.ladderHead}>
            <h2 style={S_.ladderTitle}>Family of four outlook</h2>
            <p style={{ ...S_.ladderSub, maxWidth: "none" }}>
              The class bands are national household-income thresholds, shown next to what the
              same standing costs in this ZIP once cost of living is weighted in. Discretionary
              spending is a modeled estimate for a family of four: after-tax income minus local
              housing (real ACS data) and COL-weighted childcare, transport, food, healthcare,
              K-12, and college savings. The vacation markers show what's left over.
            </p>
          </div>
          <div style={S_.ladderTableWrap}>
            <table style={S_.ladderTable}>
              <thead>
                <tr>
                  <th style={S_.ladderTh}>Class</th>
                  <th style={S_.ladderThR}>National income</th>
                  <th style={S_.ladderThR}>Local income</th>
                  <th style={S_.ladderThR}>Discretionary spending</th>
                  <th style={S_.ladderThC}>Staycation</th>
                  <th style={S_.ladderThC}>Domestic trip</th>
                  <th style={S_.ladderThC}>Int'l trip</th>
                </tr>
              </thead>
              <tbody>
                {ladder.bands.map((b) => (
                  <tr key={b.name}>
                    <td style={S_.ladderTdName}>{b.name}</td>
                    <td style={S_.ladderTdR}>
                      {FMT(b.natLow)}{b.natHigh ? "–" + FMT(b.natHigh) : "+"}
                    </td>
                    <td style={S_.ladderTdR}>
                      {FMT(Math.round(b.localLow))}{b.localHigh ? "–" + FMT(Math.round(b.localHigh)) : "+"}
                    </td>
                    <td style={{ ...S_.ladderTdR, color: b.net < 0 ? ACCENT : "#1a6b4a", fontWeight: 600 }}>
                      {b.net < 0 ? "−" + FMT(Math.abs(Math.round(b.net))) : FMT(Math.round(b.net))}
                    </td>
                    <td style={S_.ladderTdC}>{b.canStaycation ? "✓" : "—"}</td>
                    <td style={S_.ladderTdC}>{b.canDomestic ? "✓" : "—"}</td>
                    <td style={S_.ladderTdC}>{b.canIntl ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={S_.ladderNote}>
            Modeled annual cost of living for a family of four in this ZIP: housing{" "}
            <strong>{FMT(Math.round(ladder.lines.housing))}</strong>, plus childcare, transport,
            food, healthcare, K-12, and college savings, totaling about{" "}
            <strong>{FMT(Math.round(ladder.baseExpenses))}</strong> before any discretionary
            spending. A negative net means that income can't cover a family-of-four life here
            without cutting into it.
          </div>
        </div>
      )}

      {/* DIVORCE REALITY CHECK */}
      {r && (
      <div style={S_.divorceWrap}>
        <div style={S_.ladderHead}>
          <h2 style={S_.ladderTitle}>And if you clear her price, the other half of the math</h2>
          <p style={{ ...S_.ladderSub, maxWidth: "none" }}>
            Winning her is one number. Keeping the marriage is another. Public data on who ends
            marriages, and why, is the part most men never price in.
          </p>
        </div>
        <div style={S_.divorceGrid}>
          <div style={S_.divorceCard}>
            <div style={S_.divorceStat}>≈ 69–70%</div>
            <div style={S_.divorceLabel}>of US divorces are initiated by women</div>
            <div style={S_.divorceSrc}>
              American Sociological Association (2015) and Stanford research (Rosenfeld) both put
              it near 69–70%, higher among college-educated couples and as high as 75% in some
              years.
            </div>
          </div>
          <div style={S_.divorceCard}>
            <div style={S_.divorceStat}>≈ 30%</div>
            <div style={S_.divorceLabel}>of divorces are driven by money</div>
            <div style={S_.divorceSrc}>
              The Institute for Divorce Financial Analysts ranks money issues a leading cause. A
              TD Bank study found 41% of Gen X and 29% of Boomers ended their marriages over
              financial disagreements. Income and debt are central, not incidental.
            </div>
          </div>
          <div style={S_.divorceCard}>
            <div style={S_.divorceStat}>$84.9k vs $118.6k</div>
            <div style={S_.divorceLabel}>median household income, divorced vs first-married</div>
            <div style={S_.divorceSrc}>
              Pew Research (2025). Divorced working-age adults hold lower household income and less
              wealth than those in a first marriage, before child support and split assets.
            </div>
          </div>
        </div>
      </div>
      )}

      {r && (
        <div style={S_.explore}>
          <div style={S_.exploreHead}>
            <h2 style={S_.exploreTitle}>Explore the 40 largest metros</h2>
            <div style={S_.exploreSub}>
              Same woman, same you. Only the metro changes. Real Census and CDC data for each
              market's principal county. Ranked by single women 18-64 in the area.
            </div>
          </div>
          <div style={S_.ladderTableWrap}>
            <table style={S_.ladderTable}>
              <thead>
                <tr>
                  <th style={S_.ladderTh}>Metro</th>
                  <th style={S_.ladderThR}>Single women 18-64</th>
                  <th style={S_.ladderThR}>Median household income</th>
                  <th style={S_.ladderThR}>Price to keep her</th>
                  <th style={S_.ladderThR}>Your income rank</th>
                  <th style={S_.ladderThC}>In her pool</th>
                </tr>
              </thead>
              <tbody>
                {exploreRows.map((row) => (
                  <tr key={row.name}>
                    <td style={S_.ladderTdName}>{row.name}</td>
                    <td style={S_.ladderTdR}>{row.singleWomen.toLocaleString()}</td>
                    <td style={S_.ladderTdR}>{FMT(row.medHH)}</td>
                    <td style={{ ...S_.ladderTdR, fontWeight: 600 }}>{FMT(row.S)}</td>
                    <td style={S_.ladderTdR}>{Math.round(row.compPct)}{ordinal(Math.round(row.compPct))}</td>
                    <td style={{ ...S_.ladderTdC, color: row.inPool ? "#1a6b4a" : ACCENT, fontWeight: 600 }}>
                      {row.inPool ? "in" : "priced out"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={S_.exploreNote}>
            Price to keep her moves with local income, the cost of her presentation tier, and
            local fitness scarcity. Your income rank moves with each metro's male earner
            distribution. The verdict can flip from priced out to in across markets on identical
            inputs, which is the geographic reality the model is built to show.
          </div>
        </div>
      )}

      <footer style={S_.footer}>
        <div style={S_.footerInner}>
        <div className={"rpm-glide" + (explainOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              This is a calculator that does something we train men never to do out loud: it
              assigns a number to what it would take to attract and keep a high-status woman in
              today's market. Not a vibe, not a pep talk, a figure, in dollars. It runs in two
              movements. First it prices her, using three inputs that actually govern the outcome:
              how she looks and what that presentation costs to maintain, how wealthy the men in
              her orbit are, since they are your real competitive set rather than the men you
              imagine you're beating, and how many options she perceives she has, which in the
              current environment is close to unlimited. Then it prices you, your income and the
              partner you are, less the weight she takes on by choosing you, your children, the
              distance, the support, the occasional matter of height. The output is the income
              you'd need to be a credible bid.
              <br /><br />
              What makes the number high is not that women have changed. It's that the market has.
              A generation ago a woman's pool was geographic, the men within driving distance.
              Today it's algorithmic. Every man who can reach her phone is a candidate, and the
              wealthiest among them is one notification away at all hours. Dating apps, social
              platforms, and a culture that recodes trading up as personal growth have
              simultaneously expanded her field and raised her reference point. She is pricing
              herself against that global field, not against the man in the room, and any of us with
              the same options would do precisely the same thing. The error men make is to price
              themselves against the world that existed when they formed their expectations, while
              competing in the one that exists now.
              <br /><br />
              The cost compounds because upkeep has migrated from luxury to baseline. The gym
              membership becomes the Pilates studio, the sculpting class, the sauna, the spa, then
              the longevity regimen. The annual vacation becomes a calendar of trips that are
              themselves a form of social production. Skincare, aesthetics, the maintained body, the
              curated life: these are no longer discretionary, they are recurring line items, and
              they escalate every year. The man who can underwrite that life advances to the front
              of her consideration set, and the man who cannot is quietly removed from it, usually
              without ever being told that's what happened. The uncomfortable mechanics are these:
              the standard rises each cycle while real wages do not, so the distance between what is
              expected and what most men can provide grows on its own, structurally, while the
              culture pretends the line hasn't moved.
              <br /><br />
              The logic of the tool is simple. Clear her price and you are a live contender. Fall
              short and you are not. There is also a gate that sits above the math entirely: if she
              is still drawing attention or resources from wealthier men on the side, the
              calculation is moot, because the position was never genuinely open. None of this is
              editorial. It is built on public data from the Census Bureau, the CDC, and the
              observable behavior of the modern dating economy. I am not arguing the market should
              operate this way. I am showing you that it does. The beginning of competence in any
              arena is an honest description of the game you are actually playing. This is yours,
              rendered in numbers. Read it, and then go do the unglamorous work of becoming the man
              she wants. And if those opportunities don't present themselves to earn more, you need
              to lower your expectations in the type of woman you can attract and keep.
            </div>
          </div>
        </div>
        <div className={"rpm-glide" + (formulaOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              Her price to keep (<strong>S</strong>) is her maintenance floor (<strong>B</strong>),
              set by local cost of living and how she presents: her desirability, her fitness, and
              the upkeep her body and beauty routine actually cost, multiplied by the intensity of
              who she compares you to (<strong>C</strong>), driven by the money in her circle, her own
              income and education, and how educated her market is, multiplied by how freely she can
              reach alternatives (<strong>M</strong>), her age, her mobility, and whether children
              anchor her in place. Against that price you put your delivered value: what you provide
              as a partner plus your relational value, discounted by how much her past and your
              standing weigh on a serious match (<strong>k</strong>), minus the friction she has to
              absorb (<strong>F</strong>), chiefly your children, the distance, and support. You keep
              her only if delivered value clears S, and only if she is genuinely all in rather than
              sourcing attention or money from higher-tier men elsewhere, a gate that fails before
              price is even counted. Enter the ZIP where you hope to meet her to run it on real local
              data.
            </div>
          </div>
        </div>
        <div className={"rpm-glide" + (footerOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              This is a pricing model, not a judgment of anyone's worth. The structure and direction
              come from recent mate-preference literature, along with dollar, regional trends, and
              prevalence anchors as real data. Hypergamy, the tendency to seek a partner of equal or
              higher status, is a well-documented pattern, and researchers tie its spread into nearly
              every local market to social media and dating apps, which widen the field of higher-status
              men a woman can see and compare against far beyond the people she actually meets.
            </div>
          </div>
        </div>
        <div className={"rpm-glide" + (matchesOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              The availability count estimates how many women near a ZIP actually fit the profile
              you built, not just how many live there. It starts from the real female population in
              your age range across every ZIP inside your radius, then applies each filter in turn:
              race or ethnicity, relationship status, her own income band, the desirability and
              fitness tier you set, education, and an openness adjustment for whether she has
              children. Every cut except the children adjustment reads off a real federal share for
              that ZIP, so the final number is a grounded estimate of the local pool, not a guess.
              It is deliberately strict. A small count is the point, not an error.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={() => { setExplainOpen((v) => !v); setFormulaOpen(false); setFooterOpen(false); setMatchesOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={explainOpen}
          >
            <span style={{ ...S_.collapseChev, transform: explainOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            About the calculator
          </button>
          <button
            onClick={() => { setFormulaOpen((v) => !v); setExplainOpen(false); setFooterOpen(false); setMatchesOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={formulaOpen}
          >
            <span style={{ ...S_.collapseChev, transform: formulaOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            Our algorithm
          </button>
          <button
            onClick={() => { setFooterOpen((v) => !v); setMatchesOpen(false); setExplainOpen(false); setFormulaOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={footerOpen}
          >
            <span style={{ ...S_.collapseChev, transform: footerOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            Our pricing model
          </button>
          <button
            onClick={() => { setMatchesOpen((v) => !v); setFooterOpen(false); setExplainOpen(false); setFormulaOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={matchesOpen}
          >
            <span style={{ ...S_.collapseChev, transform: matchesOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            Available local matches
          </button>
          <button
            onClick={() => setOliveTheme((v) => !v)}
            style={{ ...S_.collapseLink, marginLeft: "auto", gap: 6 }}
            aria-pressed={oliveTheme}
            aria-label={oliveTheme ? "Switch to default theme" : "Switch to greyscale theme"}
            title={oliveTheme ? "Default theme" : "Greyscale theme"}
          >
            <PaintBrushIcon />
            Theme
          </button>
        </div>
        </div>
      </footer>
    </div>
  );
}

// ---- Small components -----------------------------------------------------

function Field({ label, hint, children }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0, arrowLeft: 0, ready: false });

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btnRef.current && btnRef.current.focus(); } };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  // place the popover ABOVE the icon so it never covers the control below. Measure the rendered
  // popover height, then sit its bottom just above the icon, arrow on the bottom edge pointing down.
  useEffect(() => {
    if (!open || !btnRef.current || !wrapRef.current) return;
    const POP_W = 260;
    const wrap = wrapRef.current.getBoundingClientRect();
    const btn = btnRef.current.getBoundingClientRect();
    const iconCenter = btn.left - wrap.left + btn.width / 2;
    let left = iconCenter - 18;
    const maxLeft = wrap.width - POP_W;
    if (left > maxLeft) left = maxLeft;
    if (left < 0) left = 0;
    const arrowLeft = Math.max(10, Math.min(POP_W - 18, iconCenter - left - 5));
    const popH = popRef.current ? popRef.current.offsetHeight : 0;
    const top = (btn.top - wrap.top) - popH - 9; // gap above the icon
    setPos({ left, top, arrowLeft, ready: true });
  }, [open]);

  return (
    <div style={{ ...S_.field, position: "relative" }} className="rpm-field" ref={wrapRef}>
      <div style={S_.fieldLabelRow}>
        <span style={S_.fieldLabel}>{label}{hint && " "}
        {hint && (
          <button
            type="button"
            ref={btnRef}
            style={{ ...S_.infoBtn, verticalAlign: "middle", marginLeft: 1, position: "relative", top: -1 }}
            aria-label="More information"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="7.5" x2="12" y2="7.6" />
            </svg>
          </button>
        )}
        </span>
      </div>
      {children}
      {hint && open && (
        <div
          ref={popRef}
          style={{ ...S_.pop, left: pos.left, top: pos.top, visibility: pos.ready ? "visible" : "hidden" }}
          role="tooltip"
        >
          {hint}
          <span style={{ ...S_.popArrow, left: pos.arrowLeft, bottom: -6, borderLeft: "none", borderTop: "none", borderRight: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }} />
        </div>
      )}
    </div>
  );
}
function Checks({ opts, selected, setSelected }) {
  // opts may be plain strings (label === id) or {id, label} records. Normalize.
  const items = opts.map((o) => (typeof o === "string" ? { id: o, label: o } : o));
  const toggle = (id) => {
    const has = selected.includes(id);
    if (id === "any") { setSelected(["any"]); return; }
    let next = has ? selected.filter((x) => x !== id) : [...selected.filter((x) => x !== "any"), id];
    if (!next.length) next = items.some((i) => i.id === "any") ? ["any"] : [];
    setSelected(next);
  };
  return (
    <div style={S_.checksWrap}>
      {items.map((it) => {
        const on = selected.includes(it.id);
        return (
          <button key={it.id} type="button" onClick={() => toggle(it.id)}
            style={{ ...S_.checkChip, ...(on ? S_.checkChipOn : {}) }}>
            <span style={S_.checkBox}>{on ? "✓" : ""}</span>{it.label}
          </button>
        );
      })}
    </div>
  );
}
// Custom, non-native dropdown. Same props as before (v, set, opts). Fully keyboard
// accessible (Enter/Space/Arrows/Home/End/Esc/type-ahead), ARIA listbox roles, click-outside
// to close. Renders identically across browsers and platforms; no OS-native list.
function Sel({ v, set, opts }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1); // highlighted index while open
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const btnRef = useRef(null);
  const typeBuf = useRef({ str: "", t: 0 });

  // opts may be plain strings (label === id) or {id, label} records. Normalize.
  const items = opts.map((o) => (typeof o === "string" ? { id: o, label: o } : o));
  const selectedIdx = items.findIndex((it) => it.id === v);
  const selectedLabel = selectedIdx >= 0 ? items[selectedIdx].label : "";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // keep the active option scrolled into view
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    const el = listRef.current.children[active];
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = (toIdx) => {
    setActive(toIdx != null ? toIdx : (selectedIdx >= 0 ? selectedIdx : 0));
    setOpen(true);
  };
  const choose = (i) => { set(items[i].id); setOpen(false); btnRef.current && btnRef.current.focus(); };

  const onBtnKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault(); openList(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); openList(Math.max(0, (selectedIdx < 0 ? items.length : selectedIdx) - 1));
    }
  };
  const onListKey = (e) => {
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); btnRef.current && btnRef.current.focus(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(items.length - 1, a + 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); return; }
    if (e.key === "Home") { e.preventDefault(); setActive(0); return; }
    if (e.key === "End") { e.preventDefault(); setActive(items.length - 1); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (active >= 0) choose(active); return; }
    if (e.key === "Tab") { setOpen(false); return; }
    if (e.key.length === 1) {
      const now = Date.now();
      typeBuf.current.str = (now - typeBuf.current.t < 700 ? typeBuf.current.str : "") + e.key.toLowerCase();
      typeBuf.current.t = now;
      const hit = items.findIndex((it) => it.label.toLowerCase().startsWith(typeBuf.current.str));
      if (hit >= 0) setActive(hit);
    }
  };

  return (
    <div className="rpm-dd" ref={rootRef}>
      <button
        type="button"
        ref={btnRef}
        className="rpm-dd-btn"
        data-placeholder={v ? "false" : "true"}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openList(null))}
        onKeyDown={onBtnKey}
      >
        {selectedLabel || "Pick one…"}
        <svg className="rpm-dd-chev" viewBox="0 0 24 24" fill="none" stroke="var(--warm2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          className="rpm-dd-list"
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKey}
          ref={(el) => { listRef.current = el; if (el) el.focus(); }}
        >
          {items.map((it, i) => (
            <li
              key={it.id}
              role="option"
              aria-selected={it.id === v}
              data-active={i === active}
              className="rpm-dd-opt"
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
            >
              {it.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function Num({ v, set, step, min, max }) {
  return (
    <input
      type="number" value={v} step={step} min={min} max={max}
      onChange={(e) => set(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
      style={S_.numInput}
    />
  );
}
function RangeDual({ lo, hi, setLo, setHi, min = 0, max = 100, step = 1, unit = "" }) {
  const pct = (x) => ((x - min) / (max - min)) * 100;
  const onLo = (e) => { const x = Math.min(Number(e.target.value), hi - step); setLo(x); };
  const onHi = (e) => { const x = Math.max(Number(e.target.value), lo + step); setHi(x); };
  return (
    <div style={S_.rangeWrap}>
      <div style={S_.dualWrap}>
        <div style={S_.dualTrack}>
          <div style={{ ...S_.dualFill, left: pct(lo) + "%", right: (100 - pct(hi)) + "%" }} />
        </div>
        <input type="range" className="rpm-dual" min={min} max={max} step={step} value={lo} onChange={onLo}
          style={{ ...S_.dualInput, zIndex: lo > max - (max - min) * 0.1 ? 5 : 3 }} />
        <input type="range" className="rpm-dual" min={min} max={max} step={step} value={hi} onChange={onHi}
          style={{ ...S_.dualInput, zIndex: 4 }} />
      </div>
      <span style={S_.rangeVal}>{lo}{unit}–{hi}{unit}</span>
    </div>
  );
}
function Range({ v, set, min = 0, max = 100, step = 1, unit = "" }) {
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <div style={S_.rangeWrap}>
      <div style={S_.dualWrap}>
        <div style={S_.dualTrack}>
          <div style={{ ...S_.dualFill, left: 0, right: (100 - pct) + "%" }} />
        </div>
        <input type="range" className="rpm-dual" min={min} max={max} step={step} value={v}
          onChange={(e) => set(Number(e.target.value))} style={{ ...S_.dualInput, zIndex: 4 }} />
      </div>
      <span style={S_.rangeVal}>{v}{unit}</span>
    </div>
  );
}
function Term({ label, val, note, hot }) {
  return (
    <div style={{ ...S_.term, ...(hot ? S_.termHot : {}) }}>
      <div style={S_.termVal}>{val}</div>
      <div style={S_.termLabel}>{label}</div>
      <div style={S_.termNote}>{note}</div>
    </div>
  );
}
function VRow({ label, val, pos }) {
  return (
    <div style={S_.vRow}>
      <span style={S_.vRowLabel}>{label}</span>
      <span style={{ ...S_.vRowVal, color: pos ? "#1a6b4a" : "var(--accent-neg)" }}>{val}</span>
    </div>
  );
}
function BandBar({ low, mid, high, delivered }) {
  const span = high - low || 1;
  const dPos = Math.max(0, Math.min(100, ((delivered - low) / span) * 100));
  return (
    <div style={S_.barTrack}>
      <div style={S_.barBand} />
      <div style={{ ...S_.barMid, left: "50%" }} />
      <div
        style={{
          ...S_.barDeliver,
          left: `${dPos}%`,
          background: delivered >= mid ? "#1a6b4a" : "var(--accent-neg)",
        }}
        title={`delivered ${FMT(delivered)}`}
      />
    </div>
  );
}

// Competition tier bar: a 0–100 percentile track with the cohort's entry line marked
// and the man's own placement. Green when inside the pool, red when priced out.
function TierBar({ entry, you, inPool }) {
  const ePos = Math.max(0, Math.min(100, entry));
  const yPos = Math.max(0, Math.min(100, you));
  return (
    <div>
      <div style={S_.tierTrack}>
        {/* competitive zone: from entry line to the top */}
        <div style={{ ...S_.tierZone, left: `${ePos}%`, right: 0 }} />
        {/* entry line */}
        <div style={{ ...S_.tierEntry, left: `${ePos}%` }} title={`entry ${Math.round(entry)}th`} />
        {/* you */}
        <div
          style={{ ...S_.tierYou, left: `${yPos}%`, background: inPool ? "#1a6b4a" : ACCENT }}
          title={`you ${Math.round(you)}th`}
        />
      </div>
      <div style={S_.tierScale}>
        <span>0</span><span>median</span><span>top 20%</span><span>top 5%</span><span>1%</span>
      </div>
      <div style={S_.tierLegend}>
        <span><i style={{ background: ACCENT }} /> entry line · top of her suitor pool</span>
        <span><i style={{ background: inPool ? "#1a6b4a" : ACCENT }} /> you</span>
      </div>
    </div>
  );
}

// Error boundary so a single bad value shows a readable message instead of a white screen,
// and a mount key forces a clean remount when the code reloads.
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 32, color: "#16181d", background: "#f3f1ec", minHeight: "100vh" }}>
          <h2 style={{ fontWeight: 600 }}>Something failed to render.</h2>
          <p style={{ color: "var(--warm1)" }}>The calculator hit an error. The message below says where.</p>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff", border: "1px solid #d8d3c8", padding: 16, fontSize: 13 }}>
            {String(this.state.err && this.state.err.message || this.state.err)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function RetentionCalculator() {
  return (
    <ErrorBoundary>
      <RetentionCalculatorInner />
    </ErrorBoundary>
  );
}
