exports.BattleItems = {
// Sylvemons Start
       "roomextender": {
       	id: "roomextender",
       	name: "Room Extender",
       	fling: {
       		basePower: 60,
       	},
       	desc: "Holder's use of Electric/Grassy/Misty/Psychic Terrain lasts 8 turns instead of 5.",
       }, "assaultshield": {
       	id: "assaultshieldt",
       	name: "Assault Shield",
       	spritenum: 581,
       	fling: {
       		basePower: 80,
       	},
       	onModifySpDPriority: 1,
       	onModifySpD: function(def) {
       		return this.chainModify(1.5);
       	},
       	onDisableMove: function(pokemon) {
       		let moves = pokemon.moveset;
       		for (let i = 0; i < moves.length; i++) {
       			if (this.getMove(moves[i].move).category === 'Status') {
       				pokemon.disableMove(moves[i].id);
       			}
       		}
       	},
       	desc: "Holder's Def is 1.5x, but it can only select damaging moves.",
       }, "eviolith": {
       	id: "eviolith",
       	name: "Eviolith",
       	spritenum: 130,
       	fling: {
       		basePower: 40,
       	},
       	onModifyAtkPriority: 2,
       	onModifyAtk: function(atk, pokemon) {
       		if (pokemon.baseTemplate.nfe) {
       			return this.chainModify(1.5);
       		}
       	},
       	onModifySpAPriority: 2,
       	onModifySpA: function(spa, pokemon) {
       		if (pokemon.baseTemplate.nfe) {
       			return this.chainModify(1.5);
       		}
       	},
       	gen: 5,
       	desc: "If holder's species can evolve, its Atk and Sp. Atk are 1.5x.",
       }, "trickyseed": {
       	id: "trickyseed",
       	name: "Tricky Seed",
       	spritenum: 664,
       	fling: {
       		basePower: 10,
       	},
       	onUpdate: function(pokemon) {
       		if (this.isTerrain('trickroom') && pokemon.useItem()) {
       			this.boost({
       				spe: -1
       			});
       		}
       	},
       	gen: 7,
       	desc: "If the terrain is Trick Room, lowers holder's Speed by 1 stage. Single use.",
       }, "stunorb": {
       	id: "stunorb",
       	name: "Stun Orb",
       	spritenum: 515,
       	fling: {
       		basePower: 30,
       		status: 'par',
       	},
       	onResidualOrder: 26,
       	onResidualSubOrder: 2,
       	onResidual: function(pokemon) {
       		pokemon.trySetStatus('par', pokemon);
       	},
       	gen: 4,
       	desc: "At the end of every turn, this item attempts to paralyze the holder.",
       }, "shellbell": {
       	id: "shellbell",
       	name: "Shell Bell",
       	spritenum: 438,
       	fling: {
       		basePower: 30,
       	},
       	onAfterMoveSecondarySelfPriority: -1,
       	onAfterMoveSecondarySelf: function(pokemon, target, move) {
       		if (move.category !== 'Status') {
       			this.heal(pokemon.lastDamage / 4, pokemon);
       		}
       	},
       	num: 253,
       	gen: 3,
       	desc: "After an attack, holder gains 1/4 of the damage in HP dealt to other Pokemon.",
       },
// Sylvemons End
	// Eeveed Start
	buzzasoarite: {
		id: "buzzasoarite",
		name: "Buzzasoarite",
		megaStone: "Buzzasoar-Mega",
		megaEvolves: "Buzzasoar",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 6,
		desc: "If holder is a Buzzasoar, this item allows it to Mega Evolve in battle.",
	},
	"magzorite": {
		id: "magzorite",
		name: "magzorite",
		megaStone: "Magzor-Mega",
		megaEvolves: "Magzor",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 6,
		desc: "If holder is a Magzor, this item allows it to Mega Evolve in battle.",
	},
	"reaptherite": {
		id: "reaptherite",
		name: "Reaptherite",
		megaStone: "Reapther-Mega",
		megaEvolves: "Reapther",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Reapther, this item allows it to Mega Evolve in battle.",
	},
	"scyanideite": {
		id: "scyanideite",
		name: "Scyanideite",
		megaStone: "Scyanide-Mega",
		megaEvolves: "Scyanide",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Scyanide, this item allows it to Mega Evolve in battle.",
	},
	"scypsyite": {
		id: "scypsyite",
		name: "Scypsyite",
		megaStone: "Scypsy-Mega",
		megaEvolves: "Scypsy",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Scypsy, this item allows it to Mega Evolve in battle.",
	},
	"alunixite": {
		id: "alunixite",
		name: "Alunixite",
		megaStone: "Alunix-Mega",
		megaEvolves: "Alunix",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Alunix, this item allows it to Mega Evolve in battle.",
	},
	"coffilixite": {
		id: "coffilixite",
		name: "Coffilixite",
		megaStone: "Coffilix-Mega",
		megaEvolves: "Coffilix",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Coffilix, this item allows it to Mega Evolve in battle.",
	},
	"crystixite": {
		id: "crystixite",
		name: "Crystixite",
		megaStone: "Crystix-Mega",
		megaEvolves: "Crystix",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Crystix, this item allows it to Mega Evolve in battle.",
	},
	"gemelixite": {
		id: "gemelixite",
		name: "Gemelixite",
		megaStone: "Gemelix-Mega",
		megaEvolves: "Gemelix",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Gemelix, this item allows it to Mega Evolve in battle.",
	},
	"scarixite": {
		id: "scarixite",
		name: "Scarixite",
		megaStone: "Scarix-Mega",
		megaEvolves: "Scarix",
		onTakeItem: function(item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Scarix, this item allows it to Mega Evolve in battle.",
	},
	// Eeveed End
	abomasite: {
		id: "abomasite",
		name: "Abomasite",
		spritenum: 575,
		megaStone: "Abomasnow-Mega",
		megaEvolves: "Abomasnow",
		num: 674,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle."
	},
	absolite: {
		id: "absolite",
		name: "Absolite",
		spritenum: 576,
		megaStone: "Absol-Mega",
		megaEvolves: "Absol",
		num: 677,
		gen: 6,
		desc: "If held by an Absol, this item allows it to Mega Evolve in battle."
	},
	absorbbulb: {
		id: "absorbbulb",
		name: "Absorb Bulb",
		spritenum: 2,
		fling: {
			basePower: 30
		},
		num: 545,
		gen: 5,
		desc: "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack. Single use."
	},
	adamantorb: {
		id: "adamantorb",
		name: "Adamant Orb",
		spritenum: 4,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 6,
		num: 135,
		gen: 4,
		desc: "If held by a Dialga, its Steel- and Dragon-type attacks have 1.2x power."
	},
	adrenalineorb: {
		id: "adrenalineorb",
		name: "Adrenaline Orb",
		spritenum: 660,
		fling: {
			basePower: 30
		},
		num: 846,
		gen: 7,
		desc: "Raises holder's Speed by 1 stage if it gets affected by Intimidate. Single use."
	},
	aerodactylite: {
		id: "aerodactylite",
		name: "Aerodactylite",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega",
		megaEvolves: "Aerodactyl",
		num: 672,
		gen: 6,
		desc: "If held by an Aerodactyl, this item allows it to Mega Evolve in battle."
	},
	aggronite: {
		id: "aggronite",
		name: "Aggronite",
		spritenum: 578,
		megaStone: "Aggron-Mega",
		megaEvolves: "Aggron",
		num: 667,
		gen: 6,
		desc: "If held by an Aggron, this item allows it to Mega Evolve in battle."
	},
	aguavberry: {
		id: "aguavberry",
		name: "Aguav Berry",
		spritenum: 5,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon"
		},
		num: 162,
		gen: 3,
		desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use."
	},
	airballoon: {
		id: "airballoon",
		name: "Air Balloon",
		spritenum: 6,
		fling: {
			basePower: 10
		},
		num: 541,
		gen: 5,
		desc: "Holder is immune to Ground-type attacks. Pops when holder is hit."
	},
	alakazite: {
		id: "alakazite",
		name: "Alakazite",
		spritenum: 579,
		megaStone: "Alakazam-Mega",
		megaEvolves: "Alakazam",
		num: 679,
		gen: 6,
		desc: "If held by an Alakazam, this item allows it to Mega Evolve in battle."
	},
	aloraichiumz: {
		id: "aloraichiumz",
		name: "Aloraichium Z",
		spritenum: 655,
		onTakeItem: false,
		zMove: "Stoked Sparksurfer",
		zMoveFrom: "Thunderbolt",
		zMoveUser: ["Raichu-Alola"],
		num: 803,
		gen: 7,
		desc: "If held by an Alolan Raichu with Thunderbolt, it can use Stoked Sparksurfer."
	},
	altarianite: {
		id: "altarianite",
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Altaria-Mega",
		megaEvolves: "Altaria",
		num: 755,
		gen: 6,
		desc: "If held by an Altaria, this item allows it to Mega Evolve in battle."
	},
	ampharosite: {
		id: "ampharosite",
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Ampharos-Mega",
		megaEvolves: "Ampharos",
		num: 658,
		gen: 6,
		desc: "If held by an Ampharos, this item allows it to Mega Evolve in battle."
	},
	apicotberry: {
		id: "apicotberry",
		name: "Apicot Berry",
		spritenum: 10,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ground"
		},
		num: 205,
		gen: 3,
		desc: "Raises holder's Sp. Def by 1 stage when at 1/4 max HP or less. Single use."
	},
	armorfossil: {
		id: "armorfossil",
		name: "Armor Fossil",
		spritenum: 12,
		fling: {
			basePower: 100
		},
		num: 104,
		gen: 4,
		desc: "Can be revived into Shieldon."
	},
	aspearberry: {
		id: "aspearberry",
		name: "Aspear Berry",
		spritenum: 13,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice"
		},
		num: 153,
		gen: 3,
		desc: "Holder is cured if it is frozen. Single use."
	},
	assaultvest: {
		id: "assaultvest",
		name: "Assault Vest",
		spritenum: 581,
		fling: {
			basePower: 80
		},
		onModifySpDPriority: 1,
		num: 640,
		gen: 6,
		desc: "Holder's Sp. Def is 1.5x, but it can only select damaging moves."
	},
	audinite: {
		id: "audinite",
		name: "Audinite",
		spritenum: 617,
		megaStone: "Audino-Mega",
		megaEvolves: "Audino",
		num: 757,
		gen: 6,
		desc: "If held by an Audino, this item allows it to Mega Evolve in battle."
	},
	babiriberry: {
		id: "babiriberry",
		name: "Babiri Berry",
		spritenum: 17,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Steel"
		},
		num: 199,
		gen: 4,
		desc: "Halves damage taken from a supereffective Steel-type attack. Single use."
	},
	banettite: {
		id: "banettite",
		name: "Banettite",
		spritenum: 582,
		megaStone: "Banette-Mega",
		megaEvolves: "Banette",
		num: 668,
		gen: 6,
		desc: "If held by a Banette, this item allows it to Mega Evolve in battle."
	},
	beastball: {
		id: "beastball",
		name: "Beast Ball",
		spritenum: 661,
		num: 851,
		gen: 7,
		desc: "A special Poke Ball designed to catch Ultra Beasts."
	},
	beedrillite: {
		id: "beedrillite",
		name: "Beedrillite",
		spritenum: 628,
		megaStone: "Beedrill-Mega",
		megaEvolves: "Beedrill",
		num: 770,
		gen: 6,
		desc: "If held by a Beedrill, this item allows it to Mega Evolve in battle."
	},
	belueberry: {
		id: "belueberry",
		name: "Belue Berry",
		isUnreleased: true,
		spritenum: 21,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Electric"
		},
		onEat: false,
		num: 183,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	berryjuice: {
		id: "berryjuice",
		name: "Berry Juice",
		spritenum: 22,
		fling: {
			basePower: 30
		},
		num: 43,
		gen: 2,
		desc: "Restores 20 HP when at 1/2 max HP or less. Single use."
	},
	bigroot: {
		id: "bigroot",
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10
		},
		onTryHealPriority: 1,
		num: 296,
		gen: 4,
		desc: "Holder gains 1.3x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap."
	},
	bindingband: {
		id: "bindingband",
		name: "Binding Band",
		spritenum: 31,
		fling: {
			basePower: 30
		},
		num: 544,
		gen: 5,
		desc: "Holder's partial-trapping moves deal 1/6 max HP per turn instead of 1/8."
	},
	blackbelt: {
		id: "blackbelt",
		name: "Black Belt",
		spritenum: 32,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 241,
		gen: 2,
		desc: "Holder's Fighting-type attacks have 1.2x power."
	},
	blacksludge: {
		id: "blacksludge",
		name: "Black Sludge",
		spritenum: 34,
		fling: {
			basePower: 30
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		num: 281,
		gen: 4,
		desc: "Each turn, if holder is a Poison type, restores 1/16 max HP; loses 1/8 if not."
	},
	blackglasses: {
		id: "blackglasses",
		name: "Black Glasses",
		spritenum: 35,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 240,
		gen: 2,
		desc: "Holder's Dark-type attacks have 1.2x power."
	},
	blastoisinite: {
		id: "blastoisinite",
		name: "Blastoisinite",
		spritenum: 583,
		megaStone: "Blastoise-Mega",
		megaEvolves: "Blastoise",
		num: 661,
		gen: 6,
		desc: "If held by a Blastoise, this item allows it to Mega Evolve in battle."
	},
	blazikenite: {
		id: "blazikenite",
		name: "Blazikenite",
		spritenum: 584,
		megaStone: "Blaziken-Mega",
		megaEvolves: "Blaziken",
		num: 664,
		gen: 6,
		desc: "If held by a Blaziken, this item allows it to Mega Evolve in battle."
	},
	blueorb: {
		id: "blueorb",
		name: "Blue Orb",
		spritenum: 41,
		num: 535,
		gen: 6,
		desc: "If held by a Kyogre, this item triggers its Primal Reversion in battle."
	},
	blukberry: {
		id: "blukberry",
		name: "Bluk Berry",
		spritenum: 44,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Fire"
		},
		onEat: false,
		num: 165,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	brightpowder: {
		id: "brightpowder",
		name: "BrightPowder",
		spritenum: 51,
		fling: {
			basePower: 10
		},
		num: 213,
		gen: 2,
		desc: "The accuracy of attacks against the holder is 0.9x."
	},
	buggem: {
		id: "buggem",
		name: "Bug Gem",
		isUnreleased: true,
		spritenum: 53,
		isGem: true,
		num: 558,
		gen: 5,
		desc: "Holder's first successful Bug-type attack will have 1.3x power. Single use."
	},
	bugmemory: {
		id: "bugmemory",
		name: "Bug Memory",
		spritenum: 673,
		onMemory: "Bug",
		forcedForme: "Silvally-Bug",
		num: 909,
		gen: 7,
		desc: "Holder's Multi-Attack is Bug type."
	},
	buginiumz: {
		id: "buginiumz",
		name: "Buginium Z",
		spritenum: 642,
		onPlate: "Bug",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Bug",
		forcedForme: "Arceus-Bug",
		num: 787,
		gen: 7,
		desc: "If holder has a Bug move, this item allows it to use a Bug Z-Move."
	},
	burndrive: {
		id: "burndrive",
		name: "Burn Drive",
		spritenum: 54,
		onDrive: "Fire",
		forcedForme: "Genesect-Burn",
		num: 118,
		gen: 5,
		desc: "Holder's Techno Blast is Fire type."
	},
	cameruptite: {
		id: "cameruptite",
		name: "Cameruptite",
		spritenum: 625,
		megaStone: "Camerupt-Mega",
		megaEvolves: "Camerupt",
		num: 767,
		gen: 6,
		desc: "If held by a Camerupt, this item allows it to Mega Evolve in battle."
	},
	cellbattery: {
		id: "cellbattery",
		name: "Cell Battery",
		spritenum: 60,
		fling: {
			basePower: 30
		},
		num: 546,
		gen: 5,
		desc: "Raises holder's Attack by 1 if hit by an Electric-type attack. Single use."
	},
	charcoal: {
		id: "charcoal",
		name: "Charcoal",
		spritenum: 61,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 249,
		gen: 2,
		desc: "Holder's Fire-type attacks have 1.2x power."
	},
	charizarditex: {
		id: "charizarditex",
		name: "Charizardite X",
		spritenum: 585,
		megaStone: "Charizard-Mega-X",
		megaEvolves: "Charizard",
		num: 660,
		gen: 6,
		desc: "If held by a Charizard, this item allows it to Mega Evolve in battle."
	},
	charizarditey: {
		id: "charizarditey",
		name: "Charizardite Y",
		spritenum: 586,
		megaStone: "Charizard-Mega-Y",
		megaEvolves: "Charizard",
		num: 678,
		gen: 6,
		desc: "If held by a Charizard, this item allows it to Mega Evolve in battle."
	},
	chartiberry: {
		id: "chartiberry",
		name: "Charti Berry",
		spritenum: 62,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock"
		},
		num: 195,
		gen: 4,
		desc: "Halves damage taken from a supereffective Rock-type attack. Single use."
	},
	cheriberry: {
		id: "cheriberry",
		name: "Cheri Berry",
		spritenum: 63,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire"
		},
		num: 149,
		gen: 3,
		desc: "Holder cures itself if it is paralyzed. Single use."
	},
	cherishball: {
		id: "cherishball",
		name: "Cherish Ball",
		spritenum: 64,
		num: 16,
		gen: 4,
		desc: "A rare Poke Ball that has been crafted to commemorate an occasion."
	},
	chestoberry: {
		id: "chestoberry",
		name: "Chesto Berry",
		spritenum: 65,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water"
		},
		num: 150,
		gen: 3,
		desc: "Holder wakes up if it is asleep. Single use."
	},
	chilanberry: {
		id: "chilanberry",
		name: "Chilan Berry",
		spritenum: 66,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Normal"
		},
		num: 200,
		gen: 4,
		desc: "Halves damage taken from a Normal-type attack. Single use."
	},
	chilldrive: {
		id: "chilldrive",
		name: "Chill Drive",
		spritenum: 67,
		onDrive: "Ice",
		forcedForme: "Genesect-Chill",
		num: 119,
		gen: 5,
		desc: "Holder's Techno Blast is Ice type."
	},
	choiceband: {
		id: "choiceband",
		name: "Choice Band",
		spritenum: 68,
		fling: {
			basePower: 10
		},
		onModifyAtkPriority: 1,
		isChoice: true,
		num: 220,
		gen: 3,
		desc: "Holder's Attack is 1.5x, but it can only select the first move it executes."
	},
	choicescarf: {
		id: "choicescarf",
		name: "Choice Scarf",
		spritenum: 69,
		fling: {
			basePower: 10
		},
		isChoice: true,
		num: 287,
		gen: 4,
		desc: "Holder's Speed is 1.5x, but it can only select the first move it executes."
	},
	choicespecs: {
		id: "choicespecs",
		name: "Choice Specs",
		spritenum: 70,
		fling: {
			basePower: 10
		},
		onModifySpAPriority: 1,
		isChoice: true,
		num: 297,
		gen: 4,
		desc: "Holder's Sp. Atk is 1.5x, but it can only select the first move it executes."
	},
	chopleberry: {
		id: "chopleberry",
		name: "Chople Berry",
		spritenum: 71,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting"
		},
		num: 189,
		gen: 4,
		desc: "Halves damage taken from a supereffective Fighting-type attack. Single use."
	},
	clawfossil: {
		id: "clawfossil",
		name: "Claw Fossil",
		spritenum: 72,
		fling: {
			basePower: 100
		},
		num: 100,
		gen: 3,
		desc: "Can be revived into Anorith."
	},
	cobaberry: {
		id: "cobaberry",
		name: "Coba Berry",
		spritenum: 76,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying"
		},
		num: 192,
		gen: 4,
		desc: "Halves damage taken from a supereffective Flying-type attack. Single use."
	},
	colburberry: {
		id: "colburberry",
		name: "Colbur Berry",
		spritenum: 78,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark"
		},
		num: 198,
		gen: 4,
		desc: "Halves damage taken from a supereffective Dark-type attack. Single use."
	},
	cornnberry: {
		id: "cornnberry",
		name: "Cornn Berry",
		isUnreleased: true,
		spritenum: 81,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Bug"
		},
		onEat: false,
		num: 175,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	coverfossil: {
		id: "coverfossil",
		name: "Cover Fossil",
		spritenum: 85,
		fling: {
			basePower: 100
		},
		num: 572,
		gen: 5,
		desc: "Can be revived into Tirtouga."
	},
	custapberry: {
		id: "custapberry",
		name: "Custap Berry",
		isUnreleased: true,
		spritenum: 86,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ghost"
		},
		onModifyPriorityPriority: -1,
		num: 210,
		gen: 4,
		desc: "Holder moves first in its priority bracket when at 1/4 max HP or less. Single use."
	},
	damprock: {
		id: "damprock",
		name: "Damp Rock",
		spritenum: 88,
		fling: {
			basePower: 60
		},
		num: 285,
		gen: 4,
		desc: "Holder's use of Rain Dance lasts 8 turns instead of 5."
	},
	darkgem: {
		id: "darkgem",
		name: "Dark Gem",
		isUnreleased: true,
		spritenum: 89,
		isGem: true,
		num: 562,
		gen: 5,
		desc: "Holder's first successful Dark-type attack will have 1.3x power. Single use."
	},
	darkmemory: {
		id: "darkmemory",
		name: "Dark Memory",
		spritenum: 683,
		onMemory: "Dark",
		forcedForme: "Silvally-Dark",
		num: 919,
		gen: 7,
		desc: "Holder's Multi-Attack is Dark type."
	},
	darkiniumz: {
		id: "darkiniumz",
		name: "Darkinium Z",
		spritenum: 646,
		onPlate: "Dark",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Dark",
		forcedForme: "Arceus-Dark",
		num: 791,
		gen: 7,
		desc: "If holder has a Dark move, this item allows it to use a Dark Z-Move."
	},
	decidiumz: {
		id: "decidiumz",
		name: "Decidium Z",
		spritenum: 650,
		onTakeItem: false,
		zMove: "Sinister Arrow Raid",
		zMoveFrom: "Spirit Shackle",
		zMoveUser: ["Decidueye"],
		num: 798,
		gen: 7,
		desc: "If held by a Decidueye with Spirit Shackle, it can use Sinister Arrow Raid."
	},
	deepseascale: {
		id: "deepseascale",
		name: "Deep Sea Scale",
		spritenum: 93,
		fling: {
			basePower: 30
		},
		onModifySpDPriority: 2,
		num: 227,
		gen: 3,
		desc: "If held by a Clamperl, its Sp. Def is doubled."
	},
	deepseatooth: {
		id: "deepseatooth",
		name: "Deep Sea Tooth",
		spritenum: 94,
		fling: {
			basePower: 90
		},
		onModifySpAPriority: 1,
		num: 226,
		gen: 3,
		desc: "If held by a Clamperl, its Sp. Atk is doubled."
	},
	destinyknot: {
		id: "destinyknot",
		name: "Destiny Knot",
		spritenum: 95,
		fling: {
			basePower: 10
		},
		onAttractPriority: -100,
		num: 280,
		gen: 4,
		desc: "If holder becomes infatuated, the other Pokemon also becomes infatuated."
	},
	diancite: {
		id: "diancite",
		name: "Diancite",
		spritenum: 624,
		megaStone: "Diancie-Mega",
		megaEvolves: "Diancie",
		num: 764,
		gen: 6,
		desc: "If held by a Diancie, this item allows it to Mega Evolve in battle."
	},
	diveball: {
		id: "diveball",
		name: "Dive Ball",
		spritenum: 101,
		num: 7,
		gen: 3,
		desc: "A Poke Ball that works especially well on Pokemon that live underwater."
	},
	domefossil: {
		id: "domefossil",
		name: "Dome Fossil",
		spritenum: 102,
		fling: {
			basePower: 100
		},
		num: 102,
		gen: 3,
		desc: "Can be revived into Kabuto."
	},
	dousedrive: {
		id: "dousedrive",
		name: "Douse Drive",
		spritenum: 103,
		onDrive: "Water",
		forcedForme: "Genesect-Douse",
		num: 116,
		gen: 5,
		desc: "Holder's Techno Blast is Water type."
	},
	dracoplate: {
		id: "dracoplate",
		name: "Draco Plate",
		spritenum: 105,
		onPlate: "Dragon",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Dragon",
		num: 311,
		gen: 4,
		desc: "Holder's Dragon-type attacks have 1.2x power. Judgment is Dragon type."
	},
	dragonfang: {
		id: "dragonfang",
		name: "Dragon Fang",
		spritenum: 106,
		fling: {
			basePower: 70
		},
		onBasePowerPriority: 6,
		num: 250,
		gen: 2,
		desc: "Holder's Dragon-type attacks have 1.2x power."
	},
	dragongem: {
		id: "dragongem",
		name: "Dragon Gem",
		isUnreleased: true,
		spritenum: 107,
		isGem: true,
		num: 561,
		gen: 5,
		desc: "Holder's first successful Dragon-type attack will have 1.3x power. Single use."
	},
	dragonmemory: {
		id: "dragonmemory",
		name: "Dragon Memory",
		spritenum: 682,
		onMemory: "Dragon",
		forcedForme: "Silvally-Dragon",
		num: 918,
		gen: 7,
		desc: "Holder's Multi-Attack is Dragon type."
	},
	dragoniumz: {
		id: "dragoniumz",
		name: "Dragonium Z",
		spritenum: 645,
		onPlate: "Dragon",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Dragon",
		forcedForme: "Arceus-Dragon",
		num: 790,
		gen: 7,
		desc: "If holder has a Dragon move, this item allows it to use a Dragon Z-Move."
	},
	dreadplate: {
		id: "dreadplate",
		name: "Dread Plate",
		spritenum: 110,
		onPlate: "Dark",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Dark",
		num: 312,
		gen: 4,
		desc: "Holder's Dark-type attacks have 1.2x power. Judgment is Dark type."
	},
	dreamball: {
		id: "dreamball",
		name: "Dream Ball",
		spritenum: 111,
		num: 576,
		gen: 5,
		desc: "A special Poke Ball that appears out of nowhere in a bag at the Entree Forest."
	},
	durinberry: {
		id: "durinberry",
		name: "Durin Berry",
		isUnreleased: true,
		spritenum: 114,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Water"
		},
		onEat: false,
		num: 182,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	duskball: {
		id: "duskball",
		name: "Dusk Ball",
		spritenum: 115,
		num: 13,
		gen: 4,
		desc: "A Poke Ball that makes it easier to catch wild Pokemon at night or in caves."
	},
	earthplate: {
		id: "earthplate",
		name: "Earth Plate",
		spritenum: 117,
		onPlate: "Ground",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Ground",
		num: 305,
		gen: 4,
		desc: "Holder's Ground-type attacks have 1.2x power. Judgment is Ground type."
	},
	eeviumz: {
		id: "eeviumz",
		name: "Eevium Z",
		spritenum: 657,
		onTakeItem: false,
		zMove: "Extreme Evoboost",
		zMoveFrom: "Last Resort",
		zMoveUser: ["Eevee"],
		num: 805,
		gen: 7,
		desc: "If held by an Eevee with Last Resort, it can use Extreme Evoboost."
	},
	ejectbutton: {
		id: "ejectbutton",
		name: "Eject Button",
		spritenum: 118,
		fling: {
			basePower: 30
		},
		onAfterMoveSecondaryPriority: 2,
		num: 547,
		gen: 5,
		desc: "If holder survives a hit, it immediately switches out to a chosen ally. Single use."
	},
	electirizer: {
		id: "electirizer",
		name: "Electirizer",
		spritenum: 119,
		fling: {
			basePower: 80
		},
		num: 322,
		gen: 4,
		desc: "Evolves Electabuzz into Electivire when traded."
	},
	electricgem: {
		id: "electricgem",
		name: "Electric Gem",
		isUnreleased: true,
		spritenum: 120,
		isGem: true,
		num: 550,
		gen: 5,
		desc: "Holder's first successful Electric-type attack will have 1.3x power. Single use."
	},
	electricmemory: {
		id: "electricmemory",
		name: "Electric Memory",
		spritenum: 679,
		onMemory: "Electric",
		forcedForme: "Silvally-Electric",
		num: 915,
		gen: 7,
		desc: "Holder's Multi-Attack is Electric type."
	},
	electricseed: {
		id: "electricseed",
		name: "Electric Seed",
		spritenum: 664,
		fling: {
			basePower: 10
		},
		num: 881,
		gen: 7,
		desc: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use."
	},
	electriumz: {
		id: "electriumz",
		name: "Electrium Z",
		spritenum: 634,
		onPlate: "Electric",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Electric",
		forcedForme: "Arceus-Electric",
		num: 779,
		gen: 7,
		desc: "If holder has an Electric move, this item allows it to use an Electric Z-Move."
	},
	energypowder: {
		id: "energypowder",
		name: "Energy Powder",
		spritenum: 123,
		fling: {
			basePower: 30
		},
		num: 34,
		gen: 2,
		desc: "Restores 50 HP to one Pokemon but lowers Happiness."
	},
	enigmaberry: {
		id: "enigmaberry",
		name: "Enigma Berry",
		isUnreleased: true,
		spritenum: 124,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Bug"
		},
		num: 208,
		gen: 3,
		desc: "Restores 1/4 max HP after holder is hit by a supereffective move. Single use."
	},
	eviolite: {
		id: "eviolite",
		name: "Eviolite",
		spritenum: 130,
		fling: {
			basePower: 40
		},
		onModifyDefPriority: 2,
		onModifySpDPriority: 2,
		num: 538,
		gen: 5,
		desc: "If holder's species can evolve, its Defense and Sp. Def are 1.5x."
	},
	expertbelt: {
		id: "expertbelt",
		name: "Expert Belt",
		spritenum: 132,
		fling: {
			basePower: 10
		},
		num: 268,
		gen: 4,
		desc: "Holder's attacks that are super effective against the target do 1.2x damage."
	},
	fairiumz: {
		id: "fairiumz",
		name: "Fairium Z",
		spritenum: 648,
		onPlate: "Fairy",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Fairy",
		forcedForme: "Arceus-Fairy",
		num: 793,
		gen: 7,
		desc: "If holder has a Fairy move, this item allows it to use a Fairy Z-Move."
	},
	fairygem: {
		id: "fairygem",
		name: "Fairy Gem",
		isUnreleased: true,
		spritenum: 611,
		isGem: true,
		num: 715,
		gen: 6,
		desc: "Holder's first successful Fairy-type attack will have 1.3x power. Single use."
	},
	fairymemory: {
		id: "fairymemory",
		name: "Fairy Memory",
		spritenum: 684,
		onMemory: "Fairy",
		forcedForme: "Silvally-Fairy",
		num: 920,
		gen: 7,
		desc: "Holder's Multi-Attack is Fairy type."
	},
	fastball: {
		id: "fastball",
		name: "Fast Ball",
		spritenum: 137,
		num: 492,
		gen: 2,
		desc: "A Poke Ball that makes it easier to catch Pokemon which are quick to run away."
	},
	fightinggem: {
		id: "fightinggem",
		name: "Fighting Gem",
		isUnreleased: true,
		spritenum: 139,
		isGem: true,
		num: 553,
		gen: 5,
		desc: "Holder's first successful Fighting-type attack will have 1.3x power. Single use."
	},
	fightingmemory: {
		id: "fightingmemory",
		name: "Fighting Memory",
		spritenum: 668,
		onMemory: "Fighting",
		forcedForme: "Silvally-Fighting",
		num: 904,
		gen: 7,
		desc: "Holder's Multi-Attack is Fighting type."
	},
	fightiniumz: {
		id: "fightiniumz",
		name: "Fightinium Z",
		spritenum: 637,
		onPlate: "Fighting",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Fighting",
		forcedForme: "Arceus-Fighting",
		num: 782,
		gen: 7,
		desc: "If holder has a Fighting move, this item allows it to use a Fighting Z-Move."
	},
	figyberry: {
		id: "figyberry",
		name: "Figy Berry",
		spritenum: 140,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug"
		},
		num: 159,
		gen: 3,
		desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use."
	},
	firegem: {
		id: "firegem",
		name: "Fire Gem",
		isUnreleased: true,
		spritenum: 141,
		isGem: true,
		num: 548,
		gen: 5,
		desc: "Holder's first successful Fire-type attack will have 1.3x power. Single use."
	},
	firememory: {
		id: "firememory",
		name: "Fire Memory",
		spritenum: 676,
		onMemory: "Fire",
		forcedForme: "Silvally-Fire",
		num: 912,
		gen: 7,
		desc: "Holder's Multi-Attack is Fire type."
	},
	firiumz: {
		id: "firiumz",
		name: "Firium Z",
		spritenum: 632,
		onPlate: "Fire",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Fire",
		forcedForme: "Arceus-Fire",
		num: 777,
		gen: 7,
		desc: "If holder has a Fire move, this item allows it to use a Fire Z-Move."
	},
	fistplate: {
		id: "fistplate",
		name: "Fist Plate",
		spritenum: 143,
		onPlate: "Fighting",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Fighting",
		num: 303,
		gen: 4,
		desc: "Holder's Fighting-type attacks have 1.2x power. Judgment is Fighting type."
	},
	flameorb: {
		id: "flameorb",
		name: "Flame Orb",
		spritenum: 145,
		fling: {
			basePower: 30,
			status: "brn"
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		num: 273,
		gen: 4,
		desc: "At the end of every turn, this item attempts to burn the holder."
	},
	flameplate: {
		id: "flameplate",
		name: "Flame Plate",
		spritenum: 146,
		onPlate: "Fire",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Fire",
		num: 298,
		gen: 4,
		desc: "Holder's Fire-type attacks have 1.2x power. Judgment is Fire type."
	},
	floatstone: {
		id: "floatstone",
		name: "Float Stone",
		spritenum: 147,
		fling: {
			basePower: 30
		},
		num: 539,
		gen: 5,
		desc: "Holder's weight is halved."
	},
	flyinggem: {
		id: "flyinggem",
		name: "Flying Gem",
		isUnreleased: true,
		spritenum: 149,
		isGem: true,
		num: 556,
		gen: 5,
		desc: "Holder's first successful Flying-type attack will have 1.3x power. Single use."
	},
	flyingmemory: {
		id: "flyingmemory",
		name: "Flying Memory",
		spritenum: 669,
		onMemory: "Flying",
		forcedForme: "Silvally-Flying",
		num: 905,
		gen: 7,
		desc: "Holder's Multi-Attack is Flying type."
	},
	flyiniumz: {
		id: "flyiniumz",
		name: "Flyinium Z",
		spritenum: 640,
		onPlate: "Flying",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Flying",
		forcedForme: "Arceus-Flying",
		num: 785,
		gen: 7,
		desc: "If holder has a Flying move, this item allows it to use a Flying Z-Move."
	},
	focusband: {
		id: "focusband",
		name: "Focus Band",
		spritenum: 150,
		fling: {
			basePower: 10
		},
		num: 230,
		gen: 2,
		desc: "Holder has a 10% chance to survive an attack that would KO it with 1 HP."
	},
	focussash: {
		id: "focussash",
		name: "Focus Sash",
		spritenum: 151,
		fling: {
			basePower: 10
		},
		num: 275,
		gen: 4,
		desc: "If holder's HP is full, will survive an attack that would KO it with 1 HP. Single use."
	},
	friendball: {
		id: "friendball",
		name: "Friend Ball",
		spritenum: 153,
		num: 497,
		gen: 2,
		desc: "A Poke Ball that makes caught Pokemon more friendly."
	},
	fullincense: {
		id: "fullincense",
		name: "Full Incense",
		spritenum: 155,
		fling: {
			basePower: 10
		},
		num: 316,
		gen: 4,
		desc: "Holder moves last in its priority bracket."
	},
	galladite: {
		id: "galladite",
		name: "Galladite",
		spritenum: 616,
		megaStone: "Gallade-Mega",
		megaEvolves: "Gallade",
		num: 756,
		gen: 6,
		desc: "If held by a Gallade, this item allows it to Mega Evolve in battle."
	},
	ganlonberry: {
		id: "ganlonberry",
		name: "Ganlon Berry",
		spritenum: 158,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ice"
		},
		num: 202,
		gen: 3,
		desc: "Raises holder's Defense by 1 stage when at 1/4 max HP or less. Single use."
	},
	garchompite: {
		id: "garchompite",
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garchomp-Mega",
		megaEvolves: "Garchomp",
		num: 683,
		gen: 6,
		desc: "If held by a Garchomp, this item allows it to Mega Evolve in battle."
	},
	gardevoirite: {
		id: "gardevoirite",
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Gardevoir-Mega",
		megaEvolves: "Gardevoir",
		num: 657,
		gen: 6,
		desc: "If held by a Gardevoir, this item allows it to Mega Evolve in battle."
	},
	gengarite: {
		id: "gengarite",
		name: "Gengarite",
		spritenum: 588,
		megaStone: "Gengar-Mega",
		megaEvolves: "Gengar",
		num: 656,
		gen: 6,
		desc: "If held by a Gengar, this item allows it to Mega Evolve in battle."
	},
	ghostgem: {
		id: "ghostgem",
		name: "Ghost Gem",
		isUnreleased: true,
		spritenum: 161,
		isGem: true,
		num: 560,
		gen: 5,
		desc: "Holder's first successful Ghost-type attack will have 1.3x power. Single use."
	},
	ghostmemory: {
		id: "ghostmemory",
		name: "Ghost Memory",
		spritenum: 674,
		onMemory: "Ghost",
		forcedForme: "Silvally-Ghost",
		num: 910,
		gen: 7,
		desc: "Holder's Multi-Attack is Ghost type."
	},
	ghostiumz: {
		id: "ghostiumz",
		name: "Ghostium Z",
		spritenum: 644,
		onPlate: "Ghost",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Ghost",
		forcedForme: "Arceus-Ghost",
		num: 789,
		gen: 7,
		desc: "If holder has a Ghost move, this item allows it to use a Ghost Z-Move."
	},
	glalitite: {
		id: "glalitite",
		name: "Glalitite",
		spritenum: 623,
		megaStone: "Glalie-Mega",
		megaEvolves: "Glalie",
		num: 763,
		gen: 6,
		desc: "If held by a Glalie, this item allows it to Mega Evolve in battle."
	},
	grassgem: {
		id: "grassgem",
		name: "Grass Gem",
		isUnreleased: true,
		spritenum: 172,
		isGem: true,
		num: 551,
		gen: 5,
		desc: "Holder's first successful Grass-type attack will have 1.3x power. Single use."
	},
	grassmemory: {
		id: "grassmemory",
		name: "Grass Memory",
		spritenum: 678,
		onMemory: "Grass",
		forcedForme: "Silvally-Grass",
		num: 914,
		gen: 7,
		desc: "Holder's Multi-Attack is Grass type."
	},
	grassiumz: {
		id: "grassiumz",
		name: "Grassium Z",
		spritenum: 635,
		onPlate: "Grass",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Grass",
		forcedForme: "Arceus-Grass",
		num: 780,
		gen: 7,
		desc: "If holder has a Grass move, this item allows it to use a Grass Z-Move."
	},
	grassyseed: {
		id: "grassyseed",
		name: "Grassy Seed",
		spritenum: 667,
		fling: {
			basePower: 10
		},
		num: 884,
		gen: 7,
		desc: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use."
	},
	greatball: {
		id: "greatball",
		name: "Great Ball",
		spritenum: 174,
		num: 3,
		gen: 1,
		desc: "A high-performance Ball that provides a higher catch rate than a Poke Ball."
	},
	grepaberry: {
		id: "grepaberry",
		name: "Grepa Berry",
		spritenum: 178,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Flying"
		},
		onEat: false,
		num: 173,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	gripclaw: {
		id: "gripclaw",
		name: "Grip Claw",
		spritenum: 179,
		fling: {
			basePower: 90
		},
		num: 286,
		gen: 4,
		desc: "Holder's partial-trapping moves always last 7 turns."
	},
	griseousorb: {
		id: "griseousorb",
		name: "Griseous Orb",
		spritenum: 180,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 6,
		forcedForme: "Giratina-Origin",
		num: 112,
		gen: 4,
		desc: "If held by a Giratina, its Ghost- and Dragon-type attacks have 1.2x power."
	},
	groundgem: {
		id: "groundgem",
		name: "Ground Gem",
		isUnreleased: true,
		spritenum: 182,
		isGem: true,
		num: 555,
		gen: 5,
		desc: "Holder's first successful Ground-type attack will have 1.3x power. Single use."
	},
	groundmemory: {
		id: "groundmemory",
		name: "Ground Memory",
		spritenum: 671,
		onMemory: "Ground",
		forcedForme: "Silvally-Ground",
		num: 907,
		gen: 7,
		desc: "Holder's Multi-Attack is Ground type."
	},
	groundiumz: {
		id: "groundiumz",
		name: "Groundium Z",
		spritenum: 639,
		onPlate: "Ground",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Ground",
		forcedForme: "Arceus-Ground",
		num: 784,
		gen: 7,
		desc: "If holder has a Ground move, this item allows it to use a Ground Z-Move."
	},
	gyaradosite: {
		id: "gyaradosite",
		name: "Gyaradosite",
		spritenum: 589,
		megaStone: "Gyarados-Mega",
		megaEvolves: "Gyarados",
		num: 676,
		gen: 6,
		desc: "If held by a Gyarados, this item allows it to Mega Evolve in battle."
	},
	habanberry: {
		id: "habanberry",
		name: "Haban Berry",
		spritenum: 185,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon"
		},
		num: 197,
		gen: 4,
		desc: "Halves damage taken from a supereffective Dragon-type attack. Single use."
	},
	hardstone: {
		id: "hardstone",
		name: "Hard Stone",
		spritenum: 187,
		fling: {
			basePower: 100
		},
		onBasePowerPriority: 6,
		num: 238,
		gen: 2,
		desc: "Holder's Rock-type attacks have 1.2x power."
	},
	healball: {
		id: "healball",
		name: "Heal Ball",
		spritenum: 188,
		num: 14,
		gen: 4,
		desc: "A remedial Poke Ball that restores the caught Pokemon's HP and status problem."
	},
	heatrock: {
		id: "heatrock",
		name: "Heat Rock",
		spritenum: 193,
		fling: {
			basePower: 60
		},
		num: 284,
		gen: 4,
		desc: "Holder's use of Sunny Day lasts 8 turns instead of 5."
	},
	heavyball: {
		id: "heavyball",
		name: "Heavy Ball",
		spritenum: 194,
		num: 495,
		gen: 2,
		desc: "A Poke Ball for catching very heavy Pokemon."
	},
	helixfossil: {
		id: "helixfossil",
		name: "Helix Fossil",
		spritenum: 195,
		fling: {
			basePower: 100
		},
		num: 101,
		gen: 3,
		desc: "Can be revived into Omanyte."
	},
	heracronite: {
		id: "heracronite",
		name: "Heracronite",
		spritenum: 590,
		megaStone: "Heracross-Mega",
		megaEvolves: "Heracross",
		num: 680,
		gen: 6,
		desc: "If held by a Heracross, this item allows it to Mega Evolve in battle."
	},
	hondewberry: {
		id: "hondewberry",
		name: "Hondew Berry",
		spritenum: 213,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Ground"
		},
		onEat: false,
		num: 172,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	houndoominite: {
		id: "houndoominite",
		name: "Houndoominite",
		spritenum: 591,
		megaStone: "Houndoom-Mega",
		megaEvolves: "Houndoom",
		num: 666,
		gen: 6,
		desc: "If held by a Houndoom, this item allows it to Mega Evolve in battle."
	},
	iapapaberry: {
		id: "iapapaberry",
		name: "Iapapa Berry",
		spritenum: 217,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark"
		},
		num: 163,
		gen: 3,
		desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use."
	},
	icegem: {
		id: "icegem",
		name: "Ice Gem",
		isUnreleased: true,
		spritenum: 218,
		isGem: true,
		num: 552,
		gen: 5,
		desc: "Holder's first successful Ice-type attack will have 1.3x power. Single use."
	},
	icememory: {
		id: "icememory",
		name: "Ice Memory",
		spritenum: 681,
		onMemory: "Ice",
		forcedForme: "Silvally-Ice",
		num: 917,
		gen: 7,
		desc: "Holder's Multi-Attack is Ice type."
	},
	icicleplate: {
		id: "icicleplate",
		name: "Icicle Plate",
		spritenum: 220,
		onPlate: "Ice",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Ice",
		num: 302,
		gen: 4,
		desc: "Holder's Ice-type attacks have 1.2x power. Judgment is Ice type."
	},
	iciumz: {
		id: "iciumz",
		name: "Icium Z",
		spritenum: 636,
		onPlate: "Ice",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Ice",
		forcedForme: "Arceus-Ice",
		num: 781,
		gen: 7,
		desc: "If holder has an Ice move, this item allows it to use an Ice Z-Move."
	},
	icyrock: {
		id: "icyrock",
		name: "Icy Rock",
		spritenum: 221,
		fling: {
			basePower: 40
		},
		num: 282,
		gen: 4,
		desc: "Holder's use of Hail lasts 8 turns instead of 5."
	},
	inciniumz: {
		id: "inciniumz",
		name: "Incinium Z",
		spritenum: 651,
		onTakeItem: false,
		zMove: "Malicious Moonsault",
		zMoveFrom: "Darkest Lariat",
		zMoveUser: ["Incineroar"],
		num: 799,
		gen: 7,
		desc: "If held by an Incineroar with Darkest Lariat, it can use Malicious Moonsault."
	},
	insectplate: {
		id: "insectplate",
		name: "Insect Plate",
		spritenum: 223,
		onPlate: "Bug",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Bug",
		num: 308,
		gen: 4,
		desc: "Holder's Bug-type attacks have 1.2x power. Judgment is Bug type."
	},
	ironball: {
		id: "ironball",
		name: "Iron Ball",
		spritenum: 224,
		fling: {
			basePower: 130
		},
		num: 278,
		gen: 4,
		desc: "Holder is grounded, Speed halved. If Flying type, takes neutral Ground damage."
	},
	ironplate: {
		id: "ironplate",
		name: "Iron Plate",
		spritenum: 225,
		onPlate: "Steel",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Steel",
		num: 313,
		gen: 4,
		desc: "Holder's Steel-type attacks have 1.2x power. Judgment is Steel type."
	},
	jabocaberry: {
		id: "jabocaberry",
		name: "Jaboca Berry",
		isUnreleased: true,
		spritenum: 230,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dragon"
		},
		num: 211,
		gen: 4,
		desc: "If holder is hit by a physical move, attacker loses 1/8 of its max HP. Single use."
	},
	kasibberry: {
		id: "kasibberry",
		name: "Kasib Berry",
		spritenum: 233,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost"
		},
		num: 196,
		gen: 4,
		desc: "Halves damage taken from a supereffective Ghost-type attack. Single use."
	},
	kebiaberry: {
		id: "kebiaberry",
		name: "Kebia Berry",
		spritenum: 234,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison"
		},
		num: 190,
		gen: 4,
		desc: "Halves damage taken from a supereffective Poison-type attack. Single use."
	},
	keeberry: {
		id: "keeberry",
		name: "Kee Berry",
		spritenum: 593,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fairy"
		},
		num: 687,
		gen: 6,
		desc: "Raises holder's Defense by 1 stage after it is hit by a physical attack. Single use."
	},
	kelpsyberry: {
		id: "kelpsyberry",
		name: "Kelpsy Berry",
		spritenum: 235,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Fighting"
		},
		onEat: false,
		num: 170,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	kangaskhanite: {
		id: "kangaskhanite",
		name: "Kangaskhanite",
		spritenum: 592,
		megaStone: "Kangaskhan-Mega",
		megaEvolves: "Kangaskhan",
		num: 675,
		gen: 6,
		desc: "If held by a Kangaskhan, this item allows it to Mega Evolve in battle."
	},
	kingsrock: {
		id: "kingsrock",
		name: "King's Rock",
		spritenum: 236,
		fling: {
			basePower: 30,
			volatileStatus: "flinch"
		},
		onModifyMovePriority: -1,
		num: 221,
		gen: 2,
		desc: "Holder's attacks without a chance to flinch gain a 10% chance to flinch."
	},
	kommoniumz: {
		id: "kommoniumz",
		name: "Kommonium Z",
		spritenum: 690,
		onTakeItem: false,
		zMove: "Clangorous Soulblaze",
		zMoveFrom: "Clanging Scales",
		zMoveUser: ["Kommo-o", "Kommo-o-Totem"],
		num: 926,
		gen: 7,
		desc: "If held by a Kommo-o with Clanging Scales, it can use Clangorous Soulblaze."
	},
	laggingtail: {
		id: "laggingtail",
		name: "Lagging Tail",
		spritenum: 237,
		fling: {
			basePower: 10
		},
		num: 279,
		gen: 4,
		desc: "Holder moves last in its priority bracket."
	},
	lansatberry: {
		id: "lansatberry",
		name: "Lansat Berry",
		spritenum: 238,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Flying"
		},
		num: 206,
		gen: 3,
		desc: "Holder gains the Focus Energy effect when at 1/4 max HP or less. Single use."
	},
	latiasite: {
		id: "latiasite",
		name: "Latiasite",
		spritenum: 629,
		megaStone: "Latias-Mega",
		megaEvolves: "Latias",
		num: 684,
		gen: 6,
		desc: "If held by a Latias, this item allows it to Mega Evolve in battle."
	},
	latiosite: {
		id: "latiosite",
		name: "Latiosite",
		spritenum: 630,
		megaStone: "Latios-Mega",
		megaEvolves: "Latios",
		num: 685,
		gen: 6,
		desc: "If held by a Latios, this item allows it to Mega Evolve in battle."
	},
	laxincense: {
		id: "laxincense",
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 10
		},
		num: 255,
		gen: 3,
		desc: "The accuracy of attacks against the holder is 0.9x."
	},
	leftovers: {
		id: "leftovers",
		name: "Leftovers",
		spritenum: 242,
		fling: {
			basePower: 10
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		num: 234,
		gen: 2,
		desc: "At the end of every turn, holder restores 1/16 of its max HP."
	},
	leppaberry: {
		id: "leppaberry",
		name: "Leppa Berry",
		spritenum: 244,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting"
		},
		num: 154,
		gen: 3,
		desc: "Restores 10 PP to the first of the holder's moves to reach 0 PP. Single use."
	},
	levelball: {
		id: "levelball",
		name: "Level Ball",
		spritenum: 246,
		num: 493,
		gen: 2,
		desc: "A Poke Ball for catching Pokemon that are a lower level than your own."
	},
	liechiberry: {
		id: "liechiberry",
		name: "Liechi Berry",
		spritenum: 248,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Grass"
		},
		num: 201,
		gen: 3,
		desc: "Raises holder's Attack by 1 stage when at 1/4 max HP or less. Single use."
	},
	lifeorb: {
		id: "lifeorb",
		name: "Life Orb",
		spritenum: 249,
		fling: {
			basePower: 30
		},
		num: 270,
		gen: 4,
		desc: "Holder's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack."
	},
	lightball: {
		id: "lightball",
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: "par"
		},
		onModifyAtkPriority: 1,
		onModifySpAPriority: 1,
		num: 236,
		gen: 2,
		desc: "If held by a Pikachu, its Attack and Sp. Atk are doubled."
	},
	lightclay: {
		id: "lightclay",
		name: "Light Clay",
		spritenum: 252,
		fling: {
			basePower: 30
		},
		num: 269,
		gen: 4,
		desc: "Holder's use of Aurora Veil, Light Screen, or Reflect lasts 8 turns instead of 5."
	},
	lopunnite: {
		id: "lopunnite",
		name: "Lopunnite",
		spritenum: 626,
		megaStone: "Lopunny-Mega",
		megaEvolves: "Lopunny",
		num: 768,
		gen: 6,
		desc: "If held by a Lopunny, this item allows it to Mega Evolve in battle."
	},
	loveball: {
		id: "loveball",
		name: "Love Ball",
		spritenum: 258,
		num: 496,
		gen: 2,
		desc: "Poke Ball for catching Pokemon that are the opposite gender of your Pokemon."
	},
	lucarionite: {
		id: "lucarionite",
		name: "Lucarionite",
		spritenum: 594,
		megaStone: "Lucario-Mega",
		megaEvolves: "Lucario",
		num: 673,
		gen: 6,
		desc: "If held by a Lucario, this item allows it to Mega Evolve in battle."
	},
	luckypunch: {
		id: "luckypunch",
		name: "Lucky Punch",
		spritenum: 261,
		fling: {
			basePower: 40
		},
		num: 256,
		gen: 2,
		desc: "If held by a Chansey, its critical hit ratio is raised by 2 stages."
	},
	lumberry: {
		id: "lumberry",
		name: "Lum Berry",
		spritenum: 262,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying"
		},
		num: 157,
		gen: 3,
		desc: "Holder cures itself if it is confused or has a major status condition. Single use."
	},
	luminousmoss: {
		id: "luminousmoss",
		name: "Luminous Moss",
		spritenum: 595,
		fling: {
			basePower: 30
		},
		num: 648,
		gen: 6,
		desc: "Raises holder's Sp. Def by 1 stage if hit by a Water-type attack. Single use."
	},
	lunaliumz: {
		id: "lunaliumz",
		name: "Lunalium Z",
		spritenum: 686,
		onTakeItem: false,
		zMove: "Menacing Moonraze Maelstrom",
		zMoveFrom: "Moongeist Beam",
		zMoveUser: ["Lunala", "Necrozma-Dawn-Wings"],
		num: 922,
		gen: 7,
		desc: "Lunala or Dawn Wings Necrozma with Moongeist Beam can use a special Z-Move."
	},
	lureball: {
		id: "lureball",
		name: "Lure Ball",
		spritenum: 264,
		num: 494,
		gen: 2,
		desc: "A Poke Ball for catching Pokemon hooked by a Rod when fishing."
	},
	lustrousorb: {
		id: "lustrousorb",
		name: "Lustrous Orb",
		spritenum: 265,
		fling: {
			basePower: 60
		},
		onBasePowerPriority: 6,
		num: 136,
		gen: 4,
		desc: "If held by a Palkia, its Water- and Dragon-type attacks have 1.2x power."
	},
	luxuryball: {
		id: "luxuryball",
		name: "Luxury Ball",
		spritenum: 266,
		num: 11,
		gen: 3,
		desc: "A comfortable Poke Ball that makes a caught wild Pokemon quickly grow friendly."
	},
	lycaniumz: {
		id: "lycaniumz",
		name: "Lycanium Z",
		spritenum: 689,
		onTakeItem: false,
		zMove: "Splintered Stormshards",
		zMoveFrom: "Stone Edge",
		zMoveUser: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk"],
		num: 925,
		gen: 7,
		desc: "If held by a Lycanroc forme with Stone Edge, it can use Splintered Stormshards."
	},
	machobrace: {
		id: "machobrace",
		name: "Macho Brace",
		isUnreleased: true,
		spritenum: 269,
		ignoreKlutz: true,
		fling: {
			basePower: 60
		},
		num: 215,
		gen: 3,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	magnet: {
		id: "magnet",
		name: "Magnet",
		spritenum: 273,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 242,
		gen: 2,
		desc: "Holder's Electric-type attacks have 1.2x power."
	},
	magoberry: {
		id: "magoberry",
		name: "Mago Berry",
		spritenum: 274,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost"
		},
		num: 161,
		gen: 3,
		desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use."
	},
	magostberry: {
		id: "magostberry",
		name: "Magost Berry",
		isUnreleased: true,
		spritenum: 275,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Rock"
		},
		onEat: false,
		num: 176,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	mail: {
		id: "mail",
		name: "Mail",
		spritenum: 403,
		isUnreleased: true,
		gen: 2,
		desc: "Cannot be given to or taken from a Pokemon, except by Covet/Knock Off/Thief."
	},
	manectite: {
		id: "manectite",
		name: "Manectite",
		spritenum: 596,
		megaStone: "Manectric-Mega",
		megaEvolves: "Manectric",
		num: 682,
		gen: 6,
		desc: "If held by a Manectric, this item allows it to Mega Evolve in battle."
	},
	marangaberry: {
		id: "marangaberry",
		name: "Maranga Berry",
		spritenum: 597,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark"
		},
		num: 688,
		gen: 6,
		desc: "Raises holder's Sp. Def by 1 stage after it is hit by a special attack. Single use."
	},
	marshadiumz: {
		id: "marshadiumz",
		name: "Marshadium Z",
		spritenum: 654,
		onTakeItem: false,
		zMove: "Soul-Stealing 7-Star Strike",
		zMoveFrom: "Spectral Thief",
		zMoveUser: ["Marshadow"],
		num: 802,
		gen: 7,
		desc: "If held by Marshadow with Spectral Thief, it can use Soul-Stealing 7-Star Strike."
	},
	masterball: {
		id: "masterball",
		name: "Master Ball",
		spritenum: 276,
		num: 1,
		gen: 1,
		desc: "The best Ball with the ultimate performance. It will catch any wild Pokemon."
	},
	mawilite: {
		id: "mawilite",
		name: "Mawilite",
		spritenum: 598,
		megaStone: "Mawile-Mega",
		megaEvolves: "Mawile",
		num: 681,
		gen: 6,
		desc: "If held by a Mawile, this item allows it to Mega Evolve in battle."
	},
	meadowplate: {
		id: "meadowplate",
		name: "Meadow Plate",
		spritenum: 282,
		onPlate: "Grass",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Grass",
		num: 301,
		gen: 4,
		desc: "Holder's Grass-type attacks have 1.2x power. Judgment is Grass type."
	},
	medichamite: {
		id: "medichamite",
		name: "Medichamite",
		spritenum: 599,
		megaStone: "Medicham-Mega",
		megaEvolves: "Medicham",
		num: 665,
		gen: 6,
		desc: "If held by a Medicham, this item allows it to Mega Evolve in battle."
	},
	mentalherb: {
		id: "mentalherb",
		name: "Mental Herb",
		spritenum: 285,
		fling: {
			basePower: 10
		},
		num: 219,
		gen: 3,
		desc: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment. Single use."
	},
	metagrossite: {
		id: "metagrossite",
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Metagross-Mega",
		megaEvolves: "Metagross",
		num: 758,
		gen: 6,
		desc: "If held by a Metagross, this item allows it to Mega Evolve in battle."
	},
	metalcoat: {
		id: "metalcoat",
		name: "Metal Coat",
		spritenum: 286,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 233,
		gen: 2,
		desc: "Holder's Steel-type attacks have 1.2x power."
	},
	metalpowder: {
		id: "metalpowder",
		name: "Metal Powder",
		fling: {
			basePower: 10
		},
		spritenum: 287,
		onModifyDefPriority: 2,
		num: 257,
		gen: 2,
		desc: "If held by a Ditto that hasn't Transformed, its Defense is doubled."
	},
	metronome: {
		id: "metronome",
		name: "Metronome",
		spritenum: 289,
		fling: {
			basePower: 30
		},
		effect: {},
		num: 277,
		gen: 4,
		desc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns."
	},
	mewniumz: {
		id: "mewniumz",
		name: "Mewnium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Genesis Supernova",
		zMoveFrom: "Psychic",
		zMoveUser: ["Mew"],
		num: 806,
		gen: 7,
		desc: "If held by a Mew with Psychic, it can use Genesis Supernova."
	},
	mewtwonitex: {
		id: "mewtwonitex",
		name: "Mewtwonite X",
		spritenum: 600,
		megaStone: "Mewtwo-Mega-X",
		megaEvolves: "Mewtwo",
		num: 662,
		gen: 6,
		desc: "If held by a Mewtwo, this item allows it to Mega Evolve in battle."
	},
	mewtwonitey: {
		id: "mewtwonitey",
		name: "Mewtwonite Y",
		spritenum: 601,
		megaStone: "Mewtwo-Mega-Y",
		megaEvolves: "Mewtwo",
		num: 663,
		gen: 6,
		desc: "If held by a Mewtwo, this item allows it to Mega Evolve in battle."
	},
	micleberry: {
		id: "micleberry",
		name: "Micle Berry",
		isUnreleased: true,
		spritenum: 290,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Rock"
		},
		effect: {
			duration: 2
		},
		num: 209,
		gen: 4,
		desc: "Holder's next move has 1.2x accuracy when at 1/4 max HP or less. Single use."
	},
	mimikiumz: {
		id: "mimikiumz",
		name: "Mimikium Z",
		spritenum: 688,
		onTakeItem: false,
		zMove: "Let's Snuggle Forever",
		zMoveFrom: "Play Rough",
		zMoveUser: ["Mimikyu", "Mimikyu-Busted", "Mimikyu-Totem", "Mimikyu-Busted-Totem"],
		num: 924,
		gen: 7,
		desc: "If held by a Mimikyu with Play Rough, it can use Let's Snuggle Forever."
	},
	mindplate: {
		id: "mindplate",
		name: "Mind Plate",
		spritenum: 291,
		onPlate: "Psychic",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Psychic",
		num: 307,
		gen: 4,
		desc: "Holder's Psychic-type attacks have 1.2x power. Judgment is Psychic type."
	},
	miracleseed: {
		id: "miracleseed",
		name: "Miracle Seed",
		fling: {
			basePower: 30
		},
		spritenum: 292,
		onBasePowerPriority: 6,
		num: 239,
		gen: 2,
		desc: "Holder's Grass-type attacks have 1.2x power."
	},
	mistyseed: {
		id: "mistyseed",
		name: "Misty Seed",
		spritenum: 666,
		fling: {
			basePower: 10
		},
		num: 883,
		gen: 7,
		desc: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use."
	},
	moonball: {
		id: "moonball",
		name: "Moon Ball",
		spritenum: 294,
		num: 498,
		gen: 2,
		desc: "A Poke Ball for catching Pokemon that evolve using the Moon Stone."
	},
	muscleband: {
		id: "muscleband",
		name: "Muscle Band",
		spritenum: 297,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 266,
		gen: 4,
		desc: "Holder's physical attacks have 1.1x power."
	},
	mysticwater: {
		id: "mysticwater",
		name: "Mystic Water",
		spritenum: 300,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 243,
		gen: 2,
		desc: "Holder's Water-type attacks have 1.2x power."
	},
	nanabberry: {
		id: "nanabberry",
		name: "Nanab Berry",
		isUnreleased: true,
		spritenum: 302,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Water"
		},
		onEat: false,
		num: 166,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	nestball: {
		id: "nestball",
		name: "Nest Ball",
		spritenum: 303,
		num: 8,
		gen: 3,
		desc: "A Poke Ball that works especially well on weaker Pokemon in the wild."
	},
	netball: {
		id: "netball",
		name: "Net Ball",
		spritenum: 304,
		num: 6,
		gen: 3,
		desc: "A Poke Ball that works especially well on Water- and Bug-type Pokemon."
	},
	nevermeltice: {
		id: "nevermeltice",
		name: "Never-Melt Ice",
		spritenum: 305,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 246,
		gen: 2,
		desc: "Holder's Ice-type attacks have 1.2x power."
	},
	nomelberry: {
		id: "nomelberry",
		name: "Nomel Berry",
		isUnreleased: true,
		spritenum: 306,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Dragon"
		},
		onEat: false,
		num: 178,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	normalgem: {
		id: "normalgem",
		name: "Normal Gem",
		spritenum: 307,
		isGem: true,
		num: 564,
		gen: 5,
		desc: "Holder's first successful Normal-type attack will have 1.3x power. Single use."
	},
	normaliumz: {
		id: "normaliumz",
		name: "Normalium Z",
		spritenum: 631,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Normal",
		num: 776,
		gen: 7,
		desc: "If holder has a Normal move, this item allows it to use a Normal Z-Move."
	},
	occaberry: {
		id: "occaberry",
		name: "Occa Berry",
		spritenum: 311,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire"
		},
		num: 184,
		gen: 4,
		desc: "Halves damage taken from a supereffective Fire-type attack. Single use."
	},
	oddincense: {
		id: "oddincense",
		name: "Odd Incense",
		spritenum: 312,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 314,
		gen: 4,
		desc: "Holder's Psychic-type attacks have 1.2x power."
	},
	oldamber: {
		id: "oldamber",
		name: "Old Amber",
		spritenum: 314,
		fling: {
			basePower: 100
		},
		num: 103,
		gen: 3,
		desc: "Can be revived into Aerodactyl."
	},
	oranberry: {
		id: "oranberry",
		name: "Oran Berry",
		spritenum: 319,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison"
		},
		num: 155,
		gen: 3,
		desc: "Restores 10 HP when at 1/2 max HP or less. Single use."
	},
	pamtreberry: {
		id: "pamtreberry",
		name: "Pamtre Berry",
		isUnreleased: true,
		spritenum: 323,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Steel"
		},
		onEat: false,
		num: 180,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	parkball: {
		id: "parkball",
		name: "Park Ball",
		spritenum: 325,
		num: 500,
		gen: 4,
		desc: "A special Poke Ball for the Pal Park."
	},
	passhoberry: {
		id: "passhoberry",
		name: "Passho Berry",
		spritenum: 329,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water"
		},
		num: 185,
		gen: 4,
		desc: "Halves damage taken from a supereffective Water-type attack. Single use."
	},
	payapaberry: {
		id: "payapaberry",
		name: "Payapa Berry",
		spritenum: 330,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic"
		},
		num: 193,
		gen: 4,
		desc: "Halves damage taken from a supereffective Psychic-type attack. Single use."
	},
	pechaberry: {
		id: "pechaberry",
		name: "Pecha Berry",
		spritenum: 333,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric"
		},
		num: 151,
		gen: 3,
		desc: "Holder is cured if it is poisoned. Single use."
	},
	persimberry: {
		id: "persimberry",
		name: "Persim Berry",
		spritenum: 334,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground"
		},
		num: 156,
		gen: 3,
		desc: "Holder is cured if it is confused. Single use."
	},
	petayaberry: {
		id: "petayaberry",
		name: "Petaya Berry",
		spritenum: 335,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Poison"
		},
		num: 204,
		gen: 3,
		desc: "Raises holder's Sp. Atk by 1 stage when at 1/4 max HP or less. Single use."
	},
	pidgeotite: {
		id: "pidgeotite",
		name: "Pidgeotite",
		spritenum: 622,
		megaStone: "Pidgeot-Mega",
		megaEvolves: "Pidgeot",
		num: 762,
		gen: 6,
		desc: "If held by a Pidgeot, this item allows it to Mega Evolve in battle."
	},
	pikaniumz: {
		id: "pikaniumz",
		name: "Pikanium Z",
		spritenum: 649,
		onTakeItem: false,
		zMove: "Catastropika",
		zMoveFrom: "Volt Tackle",
		zMoveUser: ["Pikachu"],
		num: 794,
		gen: 7,
		desc: "If held by a Pikachu with Volt Tackle, it can use Catastropika."
	},
	pikashuniumz: {
		id: "pikashuniumz",
		name: "Pikashunium Z",
		spritenum: 659,
		onTakeItem: false,
		zMove: "10,000,000 Volt Thunderbolt",
		zMoveFrom: "Thunderbolt",
		zMoveUser: ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner"],
		num: 836,
		gen: 7,
		desc: "If held by cap Pikachu with Thunderbolt, it can use 10,000,000 Volt Thunderbolt."
	},
	pinapberry: {
		id: "pinapberry",
		name: "Pinap Berry",
		spritenum: 337,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Grass"
		},
		onEat: false,
		num: 168,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	pinsirite: {
		id: "pinsirite",
		name: "Pinsirite",
		spritenum: 602,
		megaStone: "Pinsir-Mega",
		megaEvolves: "Pinsir",
		num: 671,
		gen: 6,
		desc: "If held by a Pinsir, this item allows it to Mega Evolve in battle."
	},
	pixieplate: {
		id: "pixieplate",
		name: "Pixie Plate",
		spritenum: 610,
		onPlate: "Fairy",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Fairy",
		num: 644,
		gen: 6,
		desc: "Holder's Fairy-type attacks have 1.2x power. Judgment is Fairy type."
	},
	plumefossil: {
		id: "plumefossil",
		name: "Plume Fossil",
		spritenum: 339,
		fling: {
			basePower: 100
		},
		num: 573,
		gen: 5,
		desc: "Can be revived into Archen."
	},
	poisonbarb: {
		id: "poisonbarb",
		name: "Poison Barb",
		spritenum: 343,
		fling: {
			basePower: 70,
			status: "psn"
		},
		onBasePowerPriority: 6,
		num: 245,
		gen: 2,
		desc: "Holder's Poison-type attacks have 1.2x power."
	},
	poisongem: {
		id: "poisongem",
		name: "Poison Gem",
		isUnreleased: true,
		spritenum: 344,
		isGem: true,
		num: 554,
		gen: 5,
		desc: "Holder's first successful Poison-type attack will have 1.3x power. Single use."
	},
	poisonmemory: {
		id: "poisonmemory",
		name: "Poison Memory",
		spritenum: 670,
		onMemory: "Poison",
		forcedForme: "Silvally-Poison",
		num: 906,
		gen: 7,
		desc: "Holder's Multi-Attack is Poison type."
	},
	poisoniumz: {
		id: "poisoniumz",
		name: "Poisonium Z",
		spritenum: 638,
		onPlate: "Poison",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Poison",
		forcedForme: "Arceus-Poison",
		num: 783,
		gen: 7,
		desc: "If holder has a Poison move, this item allows it to use a Poison Z-Move."
	},
	pokeball: {
		id: "pokeball",
		name: "Poke Ball",
		spritenum: 345,
		num: 4,
		gen: 1,
		desc: "A device for catching wild Pokemon. It is designed as a capsule system."
	},
	pomegberry: {
		id: "pomegberry",
		name: "Pomeg Berry",
		spritenum: 351,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Ice"
		},
		onEat: false,
		num: 169,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	poweranklet: {
		id: "poweranklet",
		name: "Power Anklet",
		spritenum: 354,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		num: 293,
		gen: 4,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	powerband: {
		id: "powerband",
		name: "Power Band",
		spritenum: 355,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		num: 292,
		gen: 4,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	powerbelt: {
		id: "powerbelt",
		name: "Power Belt",
		spritenum: 356,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		num: 290,
		gen: 4,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	powerbracer: {
		id: "powerbracer",
		name: "Power Bracer",
		spritenum: 357,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		num: 289,
		gen: 4,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	powerherb: {
		id: "powerherb",
		name: "Power Herb",
		spritenum: 358,
		fling: {
			basePower: 10
		},
		num: 271,
		gen: 4,
		desc: "Holder's two-turn moves complete in one turn (except Sky Drop). Single use."
	},
	powerlens: {
		id: "powerlens",
		name: "Power Lens",
		spritenum: 359,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		num: 291,
		gen: 4,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	powerweight: {
		id: "powerweight",
		name: "Power Weight",
		spritenum: 360,
		ignoreKlutz: true,
		fling: {
			basePower: 70
		},
		num: 294,
		gen: 4,
		desc: "Holder's Speed is halved. The Ability Klutz does not ignore this effect."
	},
	premierball: {
		id: "premierball",
		name: "Premier Ball",
		spritenum: 363,
		num: 12,
		gen: 3,
		desc: "A rare Poke Ball that has been crafted to commemorate an event."
	},
	primariumz: {
		id: "primariumz",
		name: "Primarium Z",
		spritenum: 652,
		onTakeItem: false,
		zMove: "Oceanic Operetta",
		zMoveFrom: "Sparkling Aria",
		zMoveUser: ["Primarina"],
		num: 800,
		gen: 7,
		desc: "If held by a Primarina with Sparkling Aria, it can use Oceanic Operetta."
	},
	protectivepads: {
		id: "protectivepads",
		name: "Protective Pads",
		spritenum: 663,
		fling: {
			basePower: 30
		},
		onAttractPriority: -1,
		onBoostPriority: -1,
		onDamagePriority: -1,
		num: 880,
		gen: 7,
		desc: "Holder's moves are protected from adverse contact effects, except Pickpocket."
	},
	psychicgem: {
		id: "psychicgem",
		name: "Psychic Gem",
		isUnreleased: true,
		spritenum: 369,
		isGem: true,
		num: 557,
		gen: 5,
		desc: "Holder's first successful Psychic-type attack will have 1.3x power. Single use."
	},
	psychicmemory: {
		id: "psychicmemory",
		name: "Psychic Memory",
		spritenum: 680,
		onMemory: "Psychic",
		forcedForme: "Silvally-Psychic",
		num: 916,
		gen: 7,
		desc: "Holder's Multi-Attack is Psychic type."
	},
	psychicseed: {
		id: "psychicseed",
		name: "Psychic Seed",
		spritenum: 665,
		fling: {
			basePower: 10
		},
		num: 882,
		gen: 7,
		desc: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use."
	},
	psychiumz: {
		id: "psychiumz",
		name: "Psychium Z",
		spritenum: 641,
		onPlate: "Psychic",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Psychic",
		forcedForme: "Arceus-Psychic",
		num: 786,
		gen: 7,
		desc: "If holder has a Psychic move, this item allows it to use a Psychic Z-Move."
	},
	qualotberry: {
		id: "qualotberry",
		name: "Qualot Berry",
		spritenum: 371,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Poison"
		},
		onEat: false,
		num: 171,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	quickball: {
		id: "quickball",
		name: "Quick Ball",
		spritenum: 372,
		num: 15,
		gen: 4,
		desc: "A Poke Ball that provides a better catch rate at the start of a wild encounter."
	},
	quickclaw: {
		id: "quickclaw",
		onModifyPriorityPriority: -1,
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 80
		},
		num: 217,
		gen: 2,
		desc: "Each turn, holder has a 20% chance to move first in its priority bracket."
	},
	quickpowder: {
		id: "quickpowder",
		name: "Quick Powder",
		spritenum: 374,
		fling: {
			basePower: 10
		},
		num: 274,
		gen: 4,
		desc: "If held by a Ditto that hasn't Transformed, its Speed is doubled."
	},
	rabutaberry: {
		id: "rabutaberry",
		name: "Rabuta Berry",
		isUnreleased: true,
		spritenum: 375,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Ghost"
		},
		onEat: false,
		num: 177,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	rarebone: {
		id: "rarebone",
		name: "Rare Bone",
		spritenum: 379,
		fling: {
			basePower: 100
		},
		num: 106,
		gen: 4,
		desc: "No competitive use other than when used with Fling."
	},
	rawstberry: {
		id: "rawstberry",
		name: "Rawst Berry",
		spritenum: 381,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass"
		},
		num: 152,
		gen: 3,
		desc: "Holder is cured if it is burned. Single use."
	},
	razorclaw: {
		id: "razorclaw",
		name: "Razor Claw",
		spritenum: 382,
		fling: {
			basePower: 80
		},
		num: 326,
		gen: 4,
		desc: "Holder's critical hit ratio is raised by 1 stage."
	},
	razorfang: {
		id: "razorfang",
		name: "Razor Fang",
		spritenum: 383,
		fling: {
			basePower: 30,
			volatileStatus: "flinch"
		},
		onModifyMovePriority: -1,
		num: 327,
		gen: 4,
		desc: "Holder's attacks without a chance to flinch gain a 10% chance to flinch."
	},
	razzberry: {
		id: "razzberry",
		name: "Razz Berry",
		isUnreleased: true,
		spritenum: 384,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Steel"
		},
		onEat: false,
		num: 164,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	redcard: {
		id: "redcard",
		name: "Red Card",
		spritenum: 387,
		fling: {
			basePower: 10
		},
		num: 542,
		gen: 5,
		desc: "If holder survives a hit, attacker is forced to switch to a random ally. Single use."
	},
	redorb: {
		id: "redorb",
		name: "Red Orb",
		spritenum: 390,
		num: 534,
		gen: 6,
		desc: "If held by a Groudon, this item triggers its Primal Reversion in battle."
	},
	repeatball: {
		id: "repeatball",
		name: "Repeat Ball",
		spritenum: 401,
		num: 9,
		gen: 3,
		desc: "A Poke Ball that works well on Pokemon species that were previously caught."
	},
	rindoberry: {
		id: "rindoberry",
		name: "Rindo Berry",
		spritenum: 409,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass"
		},
		num: 187,
		gen: 4,
		desc: "Halves damage taken from a supereffective Grass-type attack. Single use."
	},
	ringtarget: {
		id: "ringtarget",
		name: "Ring Target",
		spritenum: 410,
		fling: {
			basePower: 10
		},
		onNegateImmunity: false,
		num: 543,
		gen: 5,
		desc: "The holder's type immunities granted solely by its typing are negated."
	},
	rockgem: {
		id: "rockgem",
		name: "Rock Gem",
		isUnreleased: true,
		spritenum: 415,
		isGem: true,
		num: 559,
		gen: 5,
		desc: "Holder's first successful Rock-type attack will have 1.3x power. Single use."
	},
	rockincense: {
		id: "rockincense",
		name: "Rock Incense",
		spritenum: 416,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 315,
		gen: 4,
		desc: "Holder's Rock-type attacks have 1.2x power."
	},
	rockmemory: {
		id: "rockmemory",
		name: "Rock Memory",
		spritenum: 672,
		onMemory: "Rock",
		forcedForme: "Silvally-Rock",
		num: 908,
		gen: 7,
		desc: "Holder's Multi-Attack is Rock type."
	},
	rockiumz: {
		id: "rockiumz",
		name: "Rockium Z",
		spritenum: 643,
		onPlate: "Rock",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Rock",
		forcedForme: "Arceus-Rock",
		num: 788,
		gen: 7,
		desc: "If holder has a Rock move, this item allows it to use a Rock Z-Move."
	},
	rockyhelmet: {
		id: "rockyhelmet",
		name: "Rocky Helmet",
		spritenum: 417,
		fling: {
			basePower: 60
		},
		onAfterDamageOrder: 2,
		num: 540,
		gen: 5,
		desc: "If holder is hit by a contact move, the attacker loses 1/6 of its max HP."
	},
	rootfossil: {
		id: "rootfossil",
		name: "Root Fossil",
		spritenum: 418,
		fling: {
			basePower: 100
		},
		num: 99,
		gen: 3,
		desc: "Can be revived into Lileep."
	},
	roseincense: {
		id: "roseincense",
		name: "Rose Incense",
		spritenum: 419,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 318,
		gen: 4,
		desc: "Holder's Grass-type attacks have 1.2x power."
	},
	roseliberry: {
		id: "roseliberry",
		name: "Roseli Berry",
		spritenum: 603,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fairy"
		},
		num: 686,
		gen: 6,
		desc: "Halves damage taken from a supereffective Fairy-type attack. Single use."
	},
	rowapberry: {
		id: "rowapberry",
		name: "Rowap Berry",
		isUnreleased: true,
		spritenum: 420,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Dark"
		},
		num: 212,
		gen: 4,
		desc: "If holder is hit by a special move, attacker loses 1/8 of its max HP. Single use."
	},
	sablenite: {
		id: "sablenite",
		name: "Sablenite",
		spritenum: 614,
		megaStone: "Sableye-Mega",
		megaEvolves: "Sableye",
		num: 754,
		gen: 6,
		desc: "If held by a Sableye, this item allows it to Mega Evolve in battle."
	},
	safariball: {
		id: "safariball",
		name: "Safari Ball",
		spritenum: 425,
		num: 5,
		gen: 1,
		desc: "A special Poke Ball that is used only in the Safari Zone and Great Marsh."
	},
	safetygoggles: {
		id: "safetygoggles",
		name: "Safety Goggles",
		spritenum: 604,
		fling: {
			basePower: 80
		},
		num: 650,
		gen: 6,
		desc: "Holder is immune to powder moves and damage from Sandstorm or Hail."
	},
	salacberry: {
		id: "salacberry",
		name: "Salac Berry",
		spritenum: 426,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fighting"
		},
		num: 203,
		gen: 3,
		desc: "Raises holder's Speed by 1 stage when at 1/4 max HP or less. Single use."
	},
	salamencite: {
		id: "salamencite",
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Salamence-Mega",
		megaEvolves: "Salamence",
		num: 769,
		gen: 6,
		desc: "If held by a Salamence, this item allows it to Mega Evolve in battle."
	},
	sceptilite: {
		id: "sceptilite",
		name: "Sceptilite",
		spritenum: 613,
		megaStone: "Sceptile-Mega",
		megaEvolves: "Sceptile",
		num: 753,
		gen: 6,
		desc: "If held by a Sceptile, this item allows it to Mega Evolve in battle."
	},
	scizorite: {
		id: "scizorite",
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Scizor-Mega",
		megaEvolves: "Scizor",
		num: 670,
		gen: 6,
		desc: "If held by a Scizor, this item allows it to Mega Evolve in battle."
	},
	scopelens: {
		id: "scopelens",
		name: "Scope Lens",
		spritenum: 429,
		fling: {
			basePower: 30
		},
		num: 232,
		gen: 2,
		desc: "Holder's critical hit ratio is raised by 1 stage."
	},
	seaincense: {
		id: "seaincense",
		name: "Sea Incense",
		spritenum: 430,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 254,
		gen: 3,
		desc: "Holder's Water-type attacks have 1.2x power."
	},
	sharpbeak: {
		id: "sharpbeak",
		name: "Sharp Beak",
		spritenum: 436,
		fling: {
			basePower: 50
		},
		onBasePowerPriority: 6,
		num: 244,
		gen: 2,
		desc: "Holder's Flying-type attacks have 1.2x power."
	},
	sharpedonite: {
		id: "sharpedonite",
		name: "Sharpedonite",
		spritenum: 619,
		megaStone: "Sharpedo-Mega",
		megaEvolves: "Sharpedo",
		num: 759,
		gen: 6,
		desc: "If held by a Sharpedo, this item allows it to Mega Evolve in battle."
	},
	shedshell: {
		id: "shedshell",
		name: "Shed Shell",
		spritenum: 437,
		fling: {
			basePower: 10
		},
		onTrapPokemonPriority: -10,
		num: 295,
		gen: 4,
		desc: "Holder may switch out even when trapped by another Pokemon, or by Ingrain."
	},
	shellbell: {
		id: "shellbell",
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 30
		},
		onAfterMoveSecondarySelfPriority: -1,
		num: 253,
		gen: 3,
		desc: "After an attack, holder gains 1/8 of the damage in HP dealt to other Pokemon."
	},
	shockdrive: {
		id: "shockdrive",
		name: "Shock Drive",
		spritenum: 442,
		onDrive: "Electric",
		forcedForme: "Genesect-Shock",
		num: 117,
		gen: 5,
		desc: "Holder's Techno Blast is Electric type."
	},
	shucaberry: {
		id: "shucaberry",
		name: "Shuca Berry",
		spritenum: 443,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground"
		},
		num: 191,
		gen: 4,
		desc: "Halves damage taken from a supereffective Ground-type attack. Single use."
	},
	silkscarf: {
		id: "silkscarf",
		name: "Silk Scarf",
		spritenum: 444,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 251,
		gen: 3,
		desc: "Holder's Normal-type attacks have 1.2x power."
	},
	silverpowder: {
		id: "silverpowder",
		name: "SilverPowder",
		spritenum: 447,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 222,
		gen: 2,
		desc: "Holder's Bug-type attacks have 1.2x power."
	},
	sitrusberry: {
		id: "sitrusberry",
		name: "Sitrus Berry",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic"
		},
		num: 158,
		gen: 3,
		desc: "Restores 1/4 max HP when at 1/2 max HP or less. Single use."
	},
	skullfossil: {
		id: "skullfossil",
		name: "Skull Fossil",
		spritenum: 449,
		fling: {
			basePower: 100
		},
		num: 105,
		gen: 4,
		desc: "Can be revived into Cranidos."
	},
	skyplate: {
		id: "skyplate",
		name: "Sky Plate",
		spritenum: 450,
		onPlate: "Flying",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Flying",
		num: 306,
		gen: 4,
		desc: "Holder's Flying-type attacks have 1.2x power. Judgment is Flying type."
	},
	slowbronite: {
		id: "slowbronite",
		name: "Slowbronite",
		spritenum: 620,
		megaStone: "Slowbro-Mega",
		megaEvolves: "Slowbro",
		num: 760,
		gen: 6,
		desc: "If held by a Slowbro, this item allows it to Mega Evolve in battle."
	},
	smoothrock: {
		id: "smoothrock",
		name: "Smooth Rock",
		spritenum: 453,
		fling: {
			basePower: 10
		},
		num: 283,
		gen: 4,
		desc: "Holder's use of Sandstorm lasts 8 turns instead of 5."
	},
	snorliumz: {
		id: "snorliumz",
		name: "Snorlium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Pulverizing Pancake",
		zMoveFrom: "Giga Impact",
		zMoveUser: ["Snorlax"],
		num: 804,
		gen: 7,
		desc: "If held by a Snorlax with Giga Impact, it can use Pulverizing Pancake."
	},
	snowball: {
		id: "snowball",
		name: "Snowball",
		spritenum: 606,
		fling: {
			basePower: 30
		},
		num: 649,
		gen: 6,
		desc: "Raises holder's Attack by 1 if hit by an Ice-type attack. Single use."
	},
	softsand: {
		id: "softsand",
		name: "Soft Sand",
		spritenum: 456,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 237,
		gen: 2,
		desc: "Holder's Ground-type attacks have 1.2x power."
	},
	solganiumz: {
		id: "solganiumz",
		name: "Solganium Z",
		spritenum: 685,
		onTakeItem: false,
		zMove: "Searing Sunraze Smash",
		zMoveFrom: "Sunsteel Strike",
		zMoveUser: ["Solgaleo", "Necrozma-Dusk-Mane"],
		num: 921,
		gen: 7,
		desc: "Solgaleo or Dusk Mane Necrozma with Sunsteel Strike can use a special Z-Move."
	},
	souldew: {
		id: "souldew",
		name: "Soul Dew",
		spritenum: 459,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 225,
		gen: 3,
		desc: "If held by a Latias/Latios, its Dragon- and Psychic-type moves have 1.2x power."
	},
	spelltag: {
		id: "spelltag",
		name: "Spell Tag",
		spritenum: 461,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 247,
		gen: 2,
		desc: "Holder's Ghost-type attacks have 1.2x power."
	},
	spelonberry: {
		id: "spelonberry",
		name: "Spelon Berry",
		isUnreleased: true,
		spritenum: 462,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Dark"
		},
		onEat: false,
		num: 179,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	splashplate: {
		id: "splashplate",
		name: "Splash Plate",
		spritenum: 463,
		onPlate: "Water",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Water",
		num: 299,
		gen: 4,
		desc: "Holder's Water-type attacks have 1.2x power. Judgment is Water type."
	},
	spookyplate: {
		id: "spookyplate",
		name: "Spooky Plate",
		spritenum: 464,
		onPlate: "Ghost",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Ghost",
		num: 310,
		gen: 4,
		desc: "Holder's Ghost-type attacks have 1.2x power. Judgment is Ghost type."
	},
	sportball: {
		id: "sportball",
		name: "Sport Ball",
		spritenum: 465,
		num: 499,
		gen: 2,
		desc: "A special Poke Ball for the Bug-Catching Contest."
	},
	starfberry: {
		id: "starfberry",
		name: "Starf Berry",
		spritenum: 472,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Psychic"
		},
		num: 207,
		gen: 3,
		desc: "Raises a random stat by 2 when at 1/4 max HP or less (not acc/eva). Single use."
	},
	steelixite: {
		id: "steelixite",
		name: "Steelixite",
		spritenum: 621,
		megaStone: "Steelix-Mega",
		megaEvolves: "Steelix",
		num: 761,
		gen: 6,
		desc: "If held by a Steelix, this item allows it to Mega Evolve in battle."
	},
	steelgem: {
		id: "steelgem",
		name: "Steel Gem",
		isUnreleased: true,
		spritenum: 473,
		isGem: true,
		num: 563,
		gen: 5,
		desc: "Holder's first successful Steel-type attack will have 1.3x power. Single use."
	},
	steelmemory: {
		id: "steelmemory",
		name: "Steel Memory",
		spritenum: 675,
		onMemory: "Steel",
		forcedForme: "Silvally-Steel",
		num: 911,
		gen: 7,
		desc: "Holder's Multi-Attack is Steel type."
	},
	steeliumz: {
		id: "steeliumz",
		name: "Steelium Z",
		spritenum: 647,
		onPlate: "Steel",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Steel",
		forcedForme: "Arceus-Steel",
		num: 792,
		gen: 7,
		desc: "If holder has a Steel move, this item allows it to use a Steel Z-Move."
	},
	stick: {
		id: "stick",
		name: "Stick",
		fling: {
			basePower: 60
		},
		spritenum: 475,
		num: 259,
		gen: 2,
		desc: "If held by a Farfetch'd, its critical hit ratio is raised by 2 stages."
	},
	stickybarb: {
		id: "stickybarb",
		name: "Sticky Barb",
		spritenum: 476,
		fling: {
			basePower: 80
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		num: 288,
		gen: 4,
		desc: "Each turn, holder loses 1/8 max HP. An attacker making contact can receive it."
	},
	stoneplate: {
		id: "stoneplate",
		name: "Stone Plate",
		spritenum: 477,
		onPlate: "Rock",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Rock",
		num: 309,
		gen: 4,
		desc: "Holder's Rock-type attacks have 1.2x power. Judgment is Rock type."
	},
	swampertite: {
		id: "swampertite",
		name: "Swampertite",
		spritenum: 612,
		megaStone: "Swampert-Mega",
		megaEvolves: "Swampert",
		num: 752,
		gen: 6,
		desc: "If held by a Swampert, this item allows it to Mega Evolve in battle."
	},
	tamatoberry: {
		id: "tamatoberry",
		name: "Tamato Berry",
		spritenum: 486,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Psychic"
		},
		onEat: false,
		num: 174,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	tangaberry: {
		id: "tangaberry",
		name: "Tanga Berry",
		spritenum: 487,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug"
		},
		num: 194,
		gen: 4,
		desc: "Halves damage taken from a supereffective Bug-type attack. Single use."
	},
	tapuniumz: {
		id: "tapuniumz",
		name: "Tapunium Z",
		spritenum: 653,
		onTakeItem: false,
		zMove: "Guardian of Alola",
		zMoveFrom: "Nature's Madness",
		zMoveUser: ["Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini"],
		num: 801,
		gen: 7,
		desc: "If held by a Tapu with Nature's Madness, it can use Guardian of Alola."
	},
	terrainextender: {
		id: "terrainextender",
		name: "Terrain Extender",
		spritenum: 662,
		fling: {
			basePower: 60
		},
		num: 879,
		gen: 7,
		desc: "Holder's use of Electric/Grassy/Misty/Psychic Terrain lasts 8 turns instead of 5."
	},
	thickclub: {
		id: "thickclub",
		name: "Thick Club",
		spritenum: 491,
		fling: {
			basePower: 90
		},
		onModifyAtkPriority: 1,
		num: 258,
		gen: 2,
		desc: "If held by a Cubone or a Marowak, its Attack is doubled."
	},
	timerball: {
		id: "timerball",
		name: "Timer Ball",
		spritenum: 494,
		num: 10,
		gen: 3,
		desc: "A Poke Ball that becomes better the more turns there are in a battle."
	},
	toxicorb: {
		id: "toxicorb",
		name: "Toxic Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: "tox"
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		num: 272,
		gen: 4,
		desc: "At the end of every turn, this item attempts to badly poison the holder."
	},
	toxicplate: {
		id: "toxicplate",
		name: "Toxic Plate",
		spritenum: 516,
		onPlate: "Poison",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Poison",
		num: 304,
		gen: 4,
		desc: "Holder's Poison-type attacks have 1.2x power. Judgment is Poison type."
	},
	twistedspoon: {
		id: "twistedspoon",
		name: "Twisted Spoon",
		spritenum: 520,
		fling: {
			basePower: 30
		},
		onBasePowerPriority: 6,
		num: 248,
		gen: 2,
		desc: "Holder's Psychic-type attacks have 1.2x power."
	},
	tyranitarite: {
		id: "tyranitarite",
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Tyranitar-Mega",
		megaEvolves: "Tyranitar",
		num: 669,
		gen: 6,
		desc: "If held by a Tyranitar, this item allows it to Mega Evolve in battle."
	},
	ultraball: {
		id: "ultraball",
		name: "Ultra Ball",
		spritenum: 521,
		num: 2,
		gen: 1,
		desc: "An ultra-performance Ball that provides a higher catch rate than a Great Ball."
	},
	ultranecroziumz: {
		id: "ultranecroziumz",
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem: false,
		zMove: "Light That Burns the Sky",
		zMoveFrom: "Photon Geyser",
		zMoveUser: ["Necrozma-Ultra"],
		num: 923,
		gen: 7,
		desc: "Dusk Mane/Dawn Wings Necrozma: Ultra Burst, then Z-Move w/ Photon Geyser."
	},
	venusaurite: {
		id: "venusaurite",
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venusaur-Mega",
		megaEvolves: "Venusaur",
		num: 659,
		gen: 6,
		desc: "If held by a Venusaur, this item allows it to Mega Evolve in battle."
	},
	wacanberry: {
		id: "wacanberry",
		name: "Wacan Berry",
		spritenum: 526,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric"
		},
		num: 186,
		gen: 4,
		desc: "Halves damage taken from a supereffective Electric-type attack. Single use."
	},
	watergem: {
		id: "watergem",
		name: "Water Gem",
		isUnreleased: true,
		spritenum: 528,
		isGem: true,
		num: 549,
		gen: 5,
		desc: "Holder's first successful Water-type attack will have 1.3x power. Single use."
	},
	watermemory: {
		id: "watermemory",
		name: "Water Memory",
		spritenum: 677,
		onMemory: "Water",
		forcedForme: "Silvally-Water",
		num: 913,
		gen: 7,
		desc: "Holder's Multi-Attack is Water type."
	},
	wateriumz: {
		id: "wateriumz",
		name: "Waterium Z",
		spritenum: 633,
		onPlate: "Water",
		onTakeItem: false,
		zMove: true,
		zMoveType: "Water",
		forcedForme: "Arceus-Water",
		num: 778,
		gen: 7,
		desc: "If holder has a Water move, this item allows it to use a Water Z-Move."
	},
	watmelberry: {
		id: "watmelberry",
		name: "Watmel Berry",
		isUnreleased: true,
		spritenum: 530,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fire"
		},
		onEat: false,
		num: 181,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	waveincense: {
		id: "waveincense",
		name: "Wave Incense",
		spritenum: 531,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 317,
		gen: 4,
		desc: "Holder's Water-type attacks have 1.2x power."
	},
	weaknesspolicy: {
		id: "weaknesspolicy",
		name: "Weakness Policy",
		spritenum: 609,
		fling: {
			basePower: 80
		},
		onHitPriority: 1,
		num: 639,
		gen: 6,
		desc: "If holder is hit super effectively, raises Attack, Sp. Atk by 2 stages. Single use."
	},
	wepearberry: {
		id: "wepearberry",
		name: "Wepear Berry",
		isUnreleased: true,
		spritenum: 533,
		isBerry: true,
		naturalGift: {
			basePower: 90,
			type: "Electric"
		},
		onEat: false,
		num: 167,
		gen: 3,
		desc: "Cannot be eaten by the holder. No effect when eaten with Bug Bite or Pluck."
	},
	whiteherb: {
		id: "whiteherb",
		name: "White Herb",
		spritenum: 535,
		fling: {
			basePower: 10
		},
		num: 214,
		gen: 3,
		desc: "Restores all lowered stat stages to 0 when one is less than 0. Single use."
	},
	widelens: {
		id: "widelens",
		name: "Wide Lens",
		spritenum: 537,
		fling: {
			basePower: 10
		},
		num: 265,
		gen: 4,
		desc: "The accuracy of attacks by the holder is 1.1x."
	},
	wikiberry: {
		id: "wikiberry",
		name: "Wiki Berry",
		spritenum: 538,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock"
		},
		num: 160,
		gen: 3,
		desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use."
	},
	wiseglasses: {
		id: "wiseglasses",
		name: "Wise Glasses",
		spritenum: 539,
		fling: {
			basePower: 10
		},
		onBasePowerPriority: 6,
		num: 267,
		gen: 4,
		desc: "Holder's special attacks have 1.1x power."
	},
	yacheberry: {
		id: "yacheberry",
		name: "Yache Berry",
		spritenum: 567,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice"
		},
		num: 188,
		gen: 4,
		desc: "Halves damage taken from a supereffective Ice-type attack. Single use."
	},
	zapplate: {
		id: "zapplate",
		name: "Zap Plate",
		spritenum: 572,
		onPlate: "Electric",
		onBasePowerPriority: 6,
		forcedForme: "Arceus-Electric",
		num: 300,
		gen: 4,
		desc: "Holder's Electric-type attacks have 1.2x power. Judgment is Electric type."
	},
	zoomlens: {
		id: "zoomlens",
		name: "Zoom Lens",
		spritenum: 574,
		fling: {
			basePower: 10
		},
		num: 276,
		gen: 4,
		desc: "The accuracy of attacks by the holder is 1.2x if it moves after its target."
	},
	berserkgene: {
		id: "berserkgene",
		name: "Berserk Gene",
		spritenum: 388,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) On switch-in, raises holder's Attack by 2 and confuses it. Single use."
	},
	berry: {
		id: "berry",
		name: "Berry",
		spritenum: 319,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Poison"
		},
		num: 155,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Restores 10 HP when at 1/2 max HP or less. Single use."
	},
	bitterberry: {
		id: "bitterberry",
		name: "Bitter Berry",
		spritenum: 334,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ground"
		},
		num: 156,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder is cured if it is confused. Single use."
	},
	burntberry: {
		id: "burntberry",
		name: "Burnt Berry",
		spritenum: 13,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ice"
		},
		num: 153,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder is cured if it is frozen. Single use."
	},
	dragonscale: {
		id: "dragonscale",
		name: "Dragon Scale",
		spritenum: 108,
		num: 250,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder's Dragon-type attacks have 1.1x power. Evolves Seadra (trade)."
	},
	goldberry: {
		id: "goldberry",
		name: "Gold Berry",
		spritenum: 448,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Psychic"
		},
		num: 158,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Restores 30 HP when at 1/2 max HP or less. Single use."
	},
	iceberry: {
		id: "iceberry",
		name: "Ice Berry",
		spritenum: 381,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Grass"
		},
		num: 152,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder is cured if it is burned. Single use."
	},
	mintberry: {
		id: "mintberry",
		name: "Mint Berry",
		spritenum: 65,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Water"
		},
		num: 150,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder wakes up if it is asleep. Single use."
	},
	miracleberry: {
		id: "miracleberry",
		name: "Miracle Berry",
		spritenum: 262,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Flying"
		},
		num: 157,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder cures itself if it is confused or has a status condition. Single use."
	},
	mysteryberry: {
		id: "mysteryberry",
		name: "Mystery Berry",
		spritenum: 244,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fighting"
		},
		num: 154,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Restores 5 PP to the first of the holder's moves to reach 0 PP. Single use."
	},
	pinkbow: {
		id: "pinkbow",
		name: "Pink Bow",
		spritenum: 444,
		num: 251,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder's Normal-type attacks have 1.1x power."
	},
	polkadotbow: {
		id: "polkadotbow",
		name: "Polkadot Bow",
		spritenum: 444,
		num: 251,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder's Normal-type attacks have 1.1x power."
	},
	przcureberry: {
		id: "przcureberry",
		name: "PRZ Cure Berry",
		spritenum: 63,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Fire"
		},
		num: 149,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder cures itself if it is paralyzed. Single use."
	},
	psncureberry: {
		id: "psncureberry",
		name: "PSN Cure Berry",
		spritenum: 333,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Electric"
		},
		num: 151,
		gen: 2,
		isNonstandard: "gen2",
		desc: "(Gen 2) Holder is cured if it is poisoned. Single use."
	},
	crucibellite: {
		id: "crucibellite",
		name: "Crucibellite",
		spritenum: 577,
		megaStone: "Crucibelle-Mega",
		megaEvolves: "Crucibelle",
		num: -1,
		gen: 6,
		isNonstandard: true,
		desc: "If held by a Crucibelle, this item allows it to Mega Evolve in battle."
	}
};
