const faker = require('faker');
const fs = require('fs');
const algorytm = require('./algorytm.js');

const path = "data.csv";


if(fs.existsSync(path)) {
    // true
    algorytm();
} else { 

    // pola: produkt, opis, waga, uzytecznosc // 
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: path,
    header: [
        {id: 'item', title: 'ITEM'},
        {id: 'description', title: 'DESCRIPTION'},
        {id: 'weight', title: 'WEIGHT [g]'},
        {id: 'usefulness', title: 'USEFULNESS [1-100]'}
    ]
});


// nazwy do generowania danych //
const clothes = ['Skirt'
    ,'Bikini'
    ,'Dress pants'
    ,'Jumper'
    ,'Sneakers'
    ,'Hoodie'
    ,'Vest'
    ,'High heels'
    ,'Flip flops'
    ,'Handbag'
    ,'Tank top'
    ,'Singlet'
    ,'Boots'
    ,'Shorts'
    ,'Polo shirt'
    ,'Dress'
    ,'Hawaiian shirt'
    ,'Socks'
    ,'Swimsuit'
    ,'Trench coat'
    ,'Winter coat'
    ,'Straw hat'
    ,'Cap'
    ,'Necklace'
    ,'Watch'
    ,'Tie'
    ,'Purse'
    ,'Boots'
    ,'Mittens'
    ,'Stockings'
    ,'Beanie'
    ,'Beret'
    ,'Derby hat'
    ,'Top hat'
    ,'Sweater'
    ,'Shirt'
    ,'Jeans'
    ,'Suit'
    ,'Hawaiian shirt'
    ,'Singlet'
    ,'Business shoes'
    ,'Flip flops'
    ,'Jacket'
    ,'Sport shoes'
    ,'Bow tie'
    ,'Sleeveless shirt'
    ,'Long-sleeve top'
    ,'Polo shirt'
    ,'Jumper'
    ,'Trench coat'
    ,'Bathrobe'
    ,'Cargo pants'
    ,'Swimsuit'
    ,'Blazer'
    ,'T-shirt'
    ,'Belt'
    ,'Underpants'
    ,'Waistcoat'
    ,'Socks'
    ,'Tie'
    ,'Pullover'
    ,'Scarf'
    ,'Glasses'
    ,'Boots'
    ,'Wallet'
    ,'Handbag'
    ,'Sweater'
    ,'T-shirt'
    ,'Sheath dress'
    ,"Formal dress"
    ,'Gym clothes'
    ,'Bra'
    ,'Hoodie'
    ,'Long coat'
    ,'Uniform'
    ,'Coat'
    ,'Dress pants'
    ,'Swimsuit'
    ,'Long-sleeve top'
    ,'Skirt'
    ,'Thong'
    ,'Hat'
    ,'Ring'
    ,'Earrings'
    ,'Perfume'
    ,'Mittens'
    ,'Sunglasses'
    ,'Bracelet'
    ,'Purse'
    ,'Watch'
    ,'Slip'
    ,'High-heeled shoes'
    ,'Boots'
    ,'Gloves'
    ,'Jeans'
    ,'Scarf'
    ,'Socks'
    ,'Trench coat'
    ,'Jacket'
    ,'Long coat'
    ,'Earmuffs'
    ,'Cardigan'
    ,'T-shirt'
    ,'Dress'
    ,'Singlet'
    ,'Cap'
    ,"Capri trousers"
    ,'One-piece bathing suit'
    ,'Swim trunks'
    ,'Polo shirt'
    ,'Tank top'
    ,'monokini'
];

const cosmetics = ["Toner" 
        ,"Mirror" 
        ,"Brightener"
        , "Makeup kit"
        ,"Nail polish"
        ,'Lip gloss'
        ,'Lip liner'
        ,'Foundation'
        ,'Eyeliner'
        ,'Eye shadow'
        ,'Lipstick'
        ,'Mascara'
        ,'Cleanser'
        ,'Tanning lotion'
        ,'Bronzer'
        ,'Moisturizer'
        ,'Face cream'
        ,'Concealer'
        ,'Primer'
        ,'Blush'
        ,'Brush', 'Perfume'
        ,'Hand lotion'
        ,'Razor'
        ,'Tissues'
        ,'Sunglasses'
        ,"Hand mirror"
        ,"Wet wipe"
        ,"Toothbrush"
        ,"Sunscreen"
        ,"Deodorant"
        ,"Toothpaste"
        ,"Tweezers"
        ,"Scissors"
        ,"Mouthwash"
        ,"Dental floss"
        ,"Comb"
        ,"Hair spray"
        ,"Hair clip"
        ,"Hair band"
        ,"Hairbrush"
        ,"Bobby pin"
        ,"hair dryer"
        ,"hair gel"
        ,"soap"
    ]

const fabrics = ["canvas" 
        ,"cashmere"
        ,"Chenille"
        ,"Chiffon"
        ,"Cotton"
        ,"Crepe"
        ,"Damask"
        ,"Georgette"
        ,"Gingham"
        ,"Jersey"
        ,"Lace"
        ,"Jersey"
        ,"Leather"
        ,"Linen"
        ,"Merino Wool"
        ,"Modal"
        ,"Muslin"
        ,"Organza"
        ,"Polyester"
        ,"Satin"
        ,"Silk"
        ,"Spandex"
        ,"Suede"
        ,"Taffeta"
        ,"Toile"
        ,"Tweed"
        ,"Twill"
        ,"Velvet"
        ,"Viscose"
]


let records = [];

        for(let i=0; i<1000; i++) { 
            let clothNumber= faker.datatype.number(111);
            let materialNumber = faker.datatype.number(28)
            let cosmeticNumber= faker.datatype.number(44);
            let randomColor = faker.commerce.color();
            let randmonUsefulness = faker.datatype.number({
                'min': 1,
                'max': 100});
    
                if(i%3===0) {
                    records.push({item: cosmetics[cosmeticNumber],  
                        description: faker.company.companyName(), 
                        weight: faker.datatype.float({
                            'min': 10,
                            'max': 200}),
                        usefulness: randmonUsefulness })
                } else { 
                    records.push({item: clothes[clothNumber],  
                        description: randomColor + " " + fabrics[materialNumber], 
                        weight: faker.datatype.float({
                            'min': 10,
                            'max': 1000}),
                        usefulness: randmonUsefulness })
                }
        }



    csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
        algorytm();
    });
}