var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
},
width = 870 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

var y = d3.scale.linear().rangeRound([height, 0]);

var totbarcolor = d3.scale.ordinal().range(['#ffff53','#ffffad','#ffff84','#deff84','#9aff84','#bcebae','#99ebae','#00db97','#69e275','#34ed5c','#6da16e','#c3a16e','#ffa16e','#00c9bb','#00ffd5','#89d1c5','#6eccdc','#a8b1c0','#9fd8ef','#b7d2ee','#a4eeda','#b9ff53','#daf741','#d25d00','#ff5a3b','#c55a3b','#ffd1c5','#ffb762','#ff8400','#ff804f','#ffb486','#ffbdac','#ff6b02','#007b75','#00a48d']);

var totbarXaxis = d3.svg.axis().scale(x).orient("bottom");

var totbarYaxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".2s"));

var svg = d3.select("body #total_stack").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

data = [{
    "State": "AL",
        "Under 5 Years": "310504",
        "5 to 13 Years": "552339",
        "14 to 17 Years": "259034",
        "18 to 24 Years": "450818",
        "25 to 44 Years": "1231572",
        "45 to 64 Years": "1215966",
        "65 Years and Over": "641667"
}, {
    "State": "AK",
        "Under 5 Years": "52083",
        "5 to 13 Years": "85640",
        "14 to 17 Years": "42153",
        "18 to 24 Years": "74257",
        "25 to 44 Years": "198724",
        "45 to 64 Years": "183159",
        "65 Years and Over": "50277"
}, {
    "State": "AZ",
        "Under 5 Years": "515910",
        "5 to 13 Years": "828669",
        "14 to 17 Years": "362642",
        "18 to 24 Years": "601943",
        "25 to 44 Years": "1804762",
        "45 to 64 Years": "1523681",
        "65 Years and Over": "862573"
}, {
    "State": "AR",
        "Under 5 Years": "202070",
        "5 to 13 Years": "343207",
        "14 to 17 Years": "157204",
        "18 to 24 Years": "264160",
        "25 to 44 Years": "754420",
        "45 to 64 Years": "727124",
        "65 Years and Over": "407205"
}, {
    "State": "CA",
        "Under 5 Years": "2704659",
        "5 to 13 Years": "4499890",
        "14 to 17 Years": "2159981",
        "18 to 24 Years": "3853788",
        "25 to 44 Years": "10604510",
        "45 to 64 Years": "8819342",
        "65 Years and Over": "4114496"
}, {
    "State": "CO",
        "Under 5 Years": "358280",
        "5 to 13 Years": "587154",
        "14 to 17 Years": "261701",
        "18 to 24 Years": "466194",
        "25 to 44 Years": "1464939",
        "45 to 64 Years": "1290094",
        "65 Years and Over": "511094"
}, {
    "State": "CT",
        "Under 5 Years": "211637",
        "5 to 13 Years": "403658",
        "14 to 17 Years": "196918",
        "18 to 24 Years": "325110",
        "25 to 44 Years": "916955",
        "45 to 64 Years": "968967",
        "65 Years and Over": "478007"
}, {
    "State": "DE",
        "Under 5 Years": "59319",
        "5 to 13 Years": "99496",
        "14 to 17 Years": "47414",
        "18 to 24 Years": "84464",
        "25 to 44 Years": "230183",
        "45 to 64 Years": "230528",
        "65 Years and Over": "121688"
}, {
    "State": "DC",
        "Under 5 Years": "36352",
        "5 to 13 Years": "50439",
        "14 to 17 Years": "25225",
        "18 to 24 Years": "75569",
        "25 to 44 Years": "193557",
        "45 to 64 Years": "140043",
        "65 Years and Over": "70648"
}, {
    "State": "FL",
        "Under 5 Years": "1140516",
        "5 to 13 Years": "1938695",
        "14 to 17 Years": "925060",
        "18 to 24 Years": "1607297",
        "25 to 44 Years": "4782119",
        "45 to 64 Years": "4746856",
        "65 Years and Over": "3187797"
}, {
    "State": "GA",
        "Under 5 Years": "740521",
        "5 to 13 Years": "1250460",
        "14 to 17 Years": "557860",
        "18 to 24 Years": "919876",
        "25 to 44 Years": "2846985",
        "45 to 64 Years": "2389018",
        "65 Years and Over": "981024"
}, {
    "State": "HI",
        "Under 5 Years": "87207",
        "5 to 13 Years": "134025",
        "14 to 17 Years": "64011",
        "18 to 24 Years": "124834",
        "25 to 44 Years": "356237",
        "45 to 64 Years": "331817",
        "65 Years and Over": "190067"
}, {
    "State": "ID",
        "Under 5 Years": "121746",
        "5 to 13 Years": "201192",
        "14 to 17 Years": "89702",
        "18 to 24 Years": "147606",
        "25 to 44 Years": "406247",
        "45 to 64 Years": "375173",
        "65 Years and Over": "182150"
}, {
    "State": "IL",
        "Under 5 Years": "894368",
        "5 to 13 Years": "1558919",
        "14 to 17 Years": "725973",
        "18 to 24 Years": "1311479",
        "25 to 44 Years": "3596343",
        "45 to 64 Years": "3239173",
        "65 Years and Over": "1575308"
}, {
    "State": "IN",
        "Under 5 Years": "443089",
        "5 to 13 Years": "780199",
        "14 to 17 Years": "361393",
        "18 to 24 Years": "605863",
        "25 to 44 Years": "1724528",
        "45 to 64 Years": "1647881",
        "65 Years and Over": "813839"
}, {
    "State": "IA",
        "Under 5 Years": "201321",
        "5 to 13 Years": "345409",
        "14 to 17 Years": "165883",
        "18 to 24 Years": "306398",
        "25 to 44 Years": "750505",
        "45 to 64 Years": "788485",
        "65 Years and Over": "444554"
}, {
    "State": "KS",
        "Under 5 Years": "202529",
        "5 to 13 Years": "342134",
        "14 to 17 Years": "155822",
        "18 to 24 Years": "293114",
        "25 to 44 Years": "728166",
        "45 to 64 Years": "713663",
        "65 Years and Over": "366706"
}, {
    "State": "KY",
        "Under 5 Years": "284601",
        "5 to 13 Years": "493536",
        "14 to 17 Years": "229927",
        "18 to 24 Years": "381394",
        "25 to 44 Years": "1179637",
        "45 to 64 Years": "1134283",
        "65 Years and Over": "565867"
}, {
    "State": "LA",
        "Under 5 Years": "310716",
        "5 to 13 Years": "542341",
        "14 to 17 Years": "254916",
        "18 to 24 Years": "471275",
        "25 to 44 Years": "1162463",
        "45 to 64 Years": "1128771",
        "65 Years and Over": "540314"
}, {
    "State": "ME",
        "Under 5 Years": "71459",
        "5 to 13 Years": "133656",
        "14 to 17 Years": "69752",
        "18 to 24 Years": "112682",
        "25 to 44 Years": "331809",
        "45 to 64 Years": "397911",
        "65 Years and Over": "199187"
}, {
    "State": "MD",
        "Under 5 Years": "371787",
        "5 to 13 Years": "651923",
        "14 to 17 Years": "316873",
        "18 to 24 Years": "543470",
        "25 to 44 Years": "1556225",
        "45 to 64 Years": "1513754",
        "65 Years and Over": "679565"
}, {
    "State": "MA",
        "Under 5 Years": "383568",
        "5 to 13 Years": "701752",
        "14 to 17 Years": "341713",
        "18 to 24 Years": "665879",
        "25 to 44 Years": "1782449",
        "45 to 64 Years": "1751508",
        "65 Years and Over": "871098"
}, {
    "State": "MI",
        "Under 5 Years": "625526",
        "5 to 13 Years": "1179503",
        "14 to 17 Years": "585169",
        "18 to 24 Years": "974480",
        "25 to 44 Years": "2628322",
        "45 to 64 Years": "2706100",
        "65 Years and Over": "1304322"
}, {
    "State": "MN",
        "Under 5 Years": "358471",
        "5 to 13 Years": "606802",
        "14 to 17 Years": "289371",
        "18 to 24 Years": "507289",
        "25 to 44 Years": "1416063",
        "45 to 64 Years": "1391878",
        "65 Years and Over": "650519"
}, {
    "State": "MS",
        "Under 5 Years": "220813",
        "5 to 13 Years": "371502",
        "14 to 17 Years": "174405",
        "18 to 24 Years": "305964",
        "25 to 44 Years": "764203",
        "45 to 64 Years": "730133",
        "65 Years and Over": "371598"
}, {
    "State": "MO",
        "Under 5 Years": "399450",
        "5 to 13 Years": "690476",
        "14 to 17 Years": "331543",
        "18 to 24 Years": "560463",
        "25 to 44 Years": "1569626",
        "45 to 64 Years": "1554812",
        "65 Years and Over": "805235"
}, {
    "State": "MT",
        "Under 5 Years": "61114",
        "5 to 13 Years": "106088",
        "14 to 17 Years": "53156",
        "18 to 24 Years": "95232",
        "25 to 44 Years": "236297",
        "45 to 64 Years": "278241",
        "65 Years and Over": "137312"
}, {
    "State": "NE",
        "Under 5 Years": "132092",
        "5 to 13 Years": "215265",
        "14 to 17 Years": "99638",
        "18 to 24 Years": "186657",
        "25 to 44 Years": "457177",
        "45 to 64 Years": "451756",
        "65 Years and Over": "240847"
}, {
    "State": "NV",
        "Under 5 Years": "199175",
        "5 to 13 Years": "325650",
        "14 to 17 Years": "142976",
        "18 to 24 Years": "212379",
        "25 to 44 Years": "769913",
        "45 to 64 Years": "653357",
        "65 Years and Over": "296717"
}, {
    "State": "NH",
        "Under 5 Years": "75297",
        "5 to 13 Years": "144235",
        "14 to 17 Years": "73826",
        "18 to 24 Years": "119114",
        "25 to 44 Years": "345109",
        "45 to 64 Years": "388250",
        "65 Years and Over": "169978"
}, {
    "State": "NJ",
        "Under 5 Years": "557421",
        "5 to 13 Years": "1011656",
        "14 to 17 Years": "478505",
        "18 to 24 Years": "769321",
        "25 to 44 Years": "2379649",
        "45 to 64 Years": "2335168",
        "65 Years and Over": "1150941"
}, {
    "State": "NM",
        "Under 5 Years": "148323",
        "5 to 13 Years": "241326",
        "14 to 17 Years": "112801",
        "18 to 24 Years": "203097",
        "25 to 44 Years": "517154",
        "45 to 64 Years": "501604",
        "65 Years and Over": "260051"
}, {
    "State": "NY",
        "Under 5 Years": "1208495",
        "5 to 13 Years": "2141490",
        "14 to 17 Years": "1058031",
        "18 to 24 Years": "1999120",
        "25 to 44 Years": "5355235",
        "45 to 64 Years": "5120254",
        "65 Years and Over": "2607672"
}, {
    "State": "NC",
        "Under 5 Years": "652823",
        "5 to 13 Years": "1097890",
        "14 to 17 Years": "492964",
        "18 to 24 Years": "883397",
        "25 to 44 Years": "2575603",
        "45 to 64 Years": "2380685",
        "65 Years and Over": "1139052"
}, {
    "State": "ND",
        "Under 5 Years": "41896",
        "5 to 13 Years": "67358",
        "14 to 17 Years": "33794",
        "18 to 24 Years": "82629",
        "25 to 44 Years": "154913",
        "45 to 64 Years": "166615",
        "65 Years and Over": "94276"
}, {
    "State": "OH",
        "Under 5 Years": "743750",
        "5 to 13 Years": "1340492",
        "14 to 17 Years": "646135",
        "18 to 24 Years": "1081734",
        "25 to 44 Years": "3019147",
        "45 to 64 Years": "3083815",
        "65 Years and Over": "1570837"
}, {
    "State": "OK",
        "Under 5 Years": "266547",
        "5 to 13 Years": "438926",
        "14 to 17 Years": "200562",
        "18 to 24 Years": "369916",
        "25 to 44 Years": "957085",
        "45 to 64 Years": "918688",
        "65 Years and Over": "490637"
}, {
    "State": "OR",
        "Under 5 Years": "243483",
        "5 to 13 Years": "424167",
        "14 to 17 Years": "199925",
        "18 to 24 Years": "338162",
        "25 to 44 Years": "1044056",
        "45 to 64 Years": "1036269",
        "65 Years and Over": "503998"
}, {
    "State": "PA",
        "Under 5 Years": "737462",
        "5 to 13 Years": "1345341",
        "14 to 17 Years": "679201",
        "18 to 24 Years": "1203944",
        "25 to 44 Years": "3157759",
        "45 to 64 Years": "3414001",
        "65 Years and Over": "1910571"
}, {
    "State": "RI",
        "Under 5 Years": "60934",
        "5 to 13 Years": "111408",
        "14 to 17 Years": "56198",
        "18 to 24 Years": "114502",
        "25 to 44 Years": "277779",
        "45 to 64 Years": "282321",
        "65 Years and Over": "147646"
}, {
    "State": "SC",
        "Under 5 Years": "303024",
        "5 to 13 Years": "517803",
        "14 to 17 Years": "245400",
        "18 to 24 Years": "438147",
        "25 to 44 Years": "1193112",
        "45 to 64 Years": "1186019",
        "65 Years and Over": "596295"
}, {
    "State": "SD",
        "Under 5 Years": "58566",
        "5 to 13 Years": "94438",
        "14 to 17 Years": "45305",
        "18 to 24 Years": "82869",
        "25 to 44 Years": "196738",
        "45 to 64 Years": "210178",
        "65 Years and Over": "116100"
}, {
    "State": "TN",
        "Under 5 Years": "416334",
        "5 to 13 Years": "725948",
        "14 to 17 Years": "336312",
        "18 to 24 Years": "550612",
        "25 to 44 Years": "1719433",
        "45 to 64 Years": "1646623",
        "65 Years and Over": "819626"
}, {
    "State": "TX",
        "Under 5 Years": "2027307",
        "5 to 13 Years": "3277946",
        "14 to 17 Years": "1420518",
        "18 to 24 Years": "2454721",
        "25 to 44 Years": "7017731",
        "45 to 64 Years": "5656528",
        "65 Years and Over": "2472223"
}, {
    "State": "UT",
        "Under 5 Years": "268916",
        "5 to 13 Years": "413034",
        "14 to 17 Years": "167685",
        "18 to 24 Years": "329585",
        "25 to 44 Years": "772024",
        "45 to 64 Years": "538978",
        "65 Years and Over": "246202"
}, {
    "State": "VT",
        "Under 5 Years": "32635",
        "5 to 13 Years": "62538",
        "14 to 17 Years": "33757",
        "18 to 24 Years": "61679",
        "25 to 44 Years": "155419",
        "45 to 64 Years": "188593",
        "65 Years and Over": "86649"
}, {
    "State": "VA",
        "Under 5 Years": "522672",
        "5 to 13 Years": "887525",
        "14 to 17 Years": "413004",
        "18 to 24 Years": "768475",
        "25 to 44 Years": "2203286",
        "45 to 64 Years": "2033550",
        "65 Years and Over": "940577"
}, {
    "State": "WA",
        "Under 5 Years": "433119",
        "5 to 13 Years": "750274",
        "14 to 17 Years": "357782",
        "18 to 24 Years": "610378",
        "25 to 44 Years": "1850983",
        "45 to 64 Years": "1762811",
        "65 Years and Over": "783877"
}, {
    "State": "WV",
        "Under 5 Years": "105435",
        "5 to 13 Years": "189649",
        "14 to 17 Years": "91074",
        "18 to 24 Years": "157989",
        "25 to 44 Years": "470749",
        "45 to 64 Years": "514505",
        "65 Years and Over": "285067"
}, {
    "State": "WI",
        "Under 5 Years": "362277",
        "5 to 13 Years": "640286",
        "14 to 17 Years": "311849",
        "18 to 24 Years": "553914",
        "25 to 44 Years": "1487457",
        "45 to 64 Years": "1522038",
        "65 Years and Over": "750146"
}, {
    "State": "WY",
        "Under 5 Years": "38253",
        "5 to 13 Years": "60890",
        "14 to 17 Years": "29314",
        "18 to 24 Years": "53980",
        "25 to 44 Years": "137338",
        "45 to 64 Years": "147279",
        "65 Years and Over": "65614"
}]
totbarcolor.domain(d3.keys(data[0]).filter(function (key) {
    return key !== "State";
}));

data.forEach(function (d) {
    var s0 = 0;
    //also storing state with the ages array
    d.ages = totbarcolor.domain().map(function (name) {
        d.height = 0;
        return {
            name: name,
            s0: s0,
            s1: s0 += +d[name],
            parent: d
        };
    });
    d.total = d.ages[d.ages.length - 1].s1;
});

//

x.domain(data.map(function (d) {
    return d.State;
}));
y.domain([0, d3.max(data, function (d) {
    return d.total;
})]);

svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(totbarXaxis);

svg.append("g").attr("class", "y axis").call(totbarYaxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Population");

//Now each g which holds a stack has a class for selection.
var state = svg.selectAll(".state").data(data).enter().append("g").attr("class", "g").attr("transform", function (d) {
    return "translate(" + x(d.State) + ",0)";
}).attr("id", function (d) {

    return d.State;
}).attr("class", "stack");

state.selectAll("rect").data(function (d) {
    return d.ages;
}).enter().append("rect").attr("width", x.rangeBand()).attr("y", function (d) {
    return y(d.s1);
}).attr("height", function (d) {
    //storing the height inside th states object for sorting
    d.parent.height += y(d.s0) - y(d.s1);
    return y(d.s0) - y(d.s1);
}).style("fill", function (d) {
    return totbarcolor(d.name);
});

var legend = svg.selectAll(".legend").data(totbarcolor.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
    return "translate(0," + i * 20 + ")";
});

legend.append("rect").attr("x", width - 18).attr("width", 18).attr("height", 18).style("fill", totbarcolor);

legend.append("text").attr("x", width - 24).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function (d) {
    return d;
});
var sort_val = false;
d3.select("input").on("change", change);

function change() {
    // alert("meow")
    sort_val = !sort_val;
    var t0 = x.domain(data.sort(sort_val ? function (a, b) {
        return b.height - a.height;
    } : function (a, b) {
        return d3.ascending(a.State, b.State);
    })
        .map(function (d) {
        return d.State;
    }))
        .copy();
    
    svg.selectAll(".stack")
        .sort(function (a, b) {
        return t0(a.State) - t0(b.State);
    });

    var transition = svg.transition().duration(750),
        delay = function (d, i) {
            return i * 50;
        };
    //translate the stack post sorting.
    transition.selectAll(".stack")
        .delay(delay)
        .attr("transform", function (d) {

        return "translate(" + t0(d.State) + ",0)";
    });

    transition.select(".x.axis")
        .call(totbarXaxis)
        .selectAll("g")
        .delay(delay);
}