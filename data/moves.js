exports.BattleMovedex = {
	// Eternal Moves Start
	"wrathofnature": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "This move combines Fighting in its type effectiveness against the target.",
		shortDesc: "Combines Fighting in its type effectiveness.",
		id: "wrathofnature",
		name: "Wrath Of Nature",
		pp: 10,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1
		},
		onEffectiveness: function(typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fighting', type);
		},
		priority: 0,
		secondary: false,
		target: "normal",
		type: "Grass",
		zMovePower: 180,
		contestType: "Tough",
	},
		"volcaniceruption": {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Has a 50% chance to burn the target.",
		shortDesc: "50% chance to burn the target.",
		id: "volcaniceruption",
		name: "Volcanic Eruption",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Fire",
		zMovePower: 200,
		contestType: "Cool",
	},
      "seenoevil": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the foe(s) accuracy by 1.",
		id: "seenoevil",
		name: "See No Evil",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Clever",
	},
      "gigavoltimpact": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		id: "gigavoltimpact",
		name: "Gigavolt Impact",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Electric",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"evolutionblast": { /* Evolution Blast (Special, 15 BP, 10 PP, 100 Acc, Hits 8 times. Changes type after each hit (Water -> Electric -> Fire -> Psychic -> Dark -> Grass -> Ice -> Fairy))
Z-Move Effect: Does a 25BP Z-Move for all 8 attacks. (E.g, Hydro Vortex -> Gigavolt Havoc...) */
		accuracy: 100,
		basePower: 15,
		category: "Special",
		id: "evolutionblast",
		isViable: true,
		name: "Evolution Blast",
		pp: 10,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extreme Speed", target);
		},
		multihit: 8,
		target: "normal",
		type: "Ice",
		zMovePower: 25,
	},
	"darkcrowdive": {
		accuracy: 95,
		basePower: 150,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "tackle",
		name: "Tackle",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Flying', type);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Tough",
	},
	"mysticwraith": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Deals damage to the target based on its Defense instead of Special Defense.",
		shortDesc: "Damages target based on Defense ,not Sp. Def.",
		id: "mysticwraith",
		name: "Mystic Wraith",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"wispburst": {
		accuracy: 80,
		basePower: 130,
		category: "Special",
		desc: "30% to burn the opponent, bypasses immunities, hitting for neutral damage.",
		shortDesc: "30% to burn the opponent, bypasses immunities, hitting for neutral damage.",
		id: "wispburst",
		isViable: true,
		name: "Wisp Burst",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Normal') return 1;
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 195,
		contestType: "Beautiful",
	},
		"doubleswordstrike": {
		accuracy: 50,
		basePower: 60,
		category: "Physical",
		desc: "Hits twice.",
		shortDesc: "Hits 2 times in one turn.",
		id: "doubleswordstrike",
		name: "Double Swordstrike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 120,
		contestType: "Tough",
	},
	"brainfreeze": {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "brainfreeze",
		isViable: true,
		name: "Brain Freeze",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Ice",
		zMovePower: 140,
		contestType: "Cool",
	},
	"mettalicpunch": {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		desc: "Has a 70% chance to lower the target's Defense by 1 stage.",
		shortDesc: "70% chance to lower the target's Def by 1.",
		id: "mettalicpunch",
		isViable: true,
		name: "Metallic Punch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 70,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Clever",
	},
	"stonepalm": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the foe(s).",
		id: "stonepalm",
		isViable: true,
		name: "Stone Palm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Rock",
		zMovePower: 180,
		contestType: "Tough",
	},
	"spectrumbite": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the foe(s).",
		id: "spectrumbite",
		isViable: true,
		name: "Spectrum Bite",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		zMovePower: 175,
		contestType: "Tough",
	},
	"particlecannon": {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Has a 20% chance to either burn, badly poison, or paralyze the target.",
		shortDesc: "20% chance to paralyze or burn or freeze target.",
		id: "particlecannon",
		isViable: true,
		name: "Particle Cannon",
		pp: 2,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			onHit: function (target, source) {
				let result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('tox', source);
				}
			},
		},
		target: "normal",
		type: "Normal",
		zMovePower: 190,
		contestType: "Beautiful",
	},
		"relicrejuvenation": {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "relicrejuvenation",
		isViable: true,
		name: "Relic Rejuvenation",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, punch: 1, heal: 1},
		drain: [1, 2],
		secondary: false,
		target: "normal",
		type: "Psychic",
		zMovePower: 150,
		contestType: "Tough",
	},
		"batteryoverload": {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "Raises user's Attack stat, but also raises foe's Special Attack stat",
		shortDesc: "Raises user's Attack stat, but also raises foe's Special Attack stat",
		id: "batteryoverload",
		isViable: true,
		name: "Battery Overload",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
			boosts: {
				spa: 1,
			},
		},
		target: "normal",
		type: "Electric",
		zMovePower: 185,
		contestType: "Cool",
	},
	
	"magikarpsrevenge": {
		accuracy: true,
		basePower: 120,
		category: "Physical",
		desc: "Has a 100% chance to confuse the target and lower its Defense and Special Attack by 1 stage. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. The user steals the foe's boosts. If this move is successful, the weather changes to rain unless it is already in effect, and the user gains the effects of Aqua Ring and Magic Coat.",
		shortDesc: "Does many things turn 1. Can't move turn 2.",
		id: "magikarpsrevenge",
		isNonstandard: true,
		name: "Magikarp's Revenge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, recharge: 1, protect: 1, mirror: 1},
		noSketch: true,
		drain: [1, 2],
		onTry: function (pokemon) {
			if (pokemon.template.name !== 'Magikarp') {
				this.add('-fail', pokemon, 'move: Magikarp\'s Revenge');
				return null;
			}
		},
		self: {
			onHit: function (source) {
				this.setWeather('raindance');
				source.addVolatile('magiccoat');
				source.addVolatile('aquaring');
			},
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
			boosts: {
				def: -1,
				spa: -1,
			},
		},
		stealsBoosts: true,
		target: "normal",
		type: "Water",
		zMovePower: 190,
		contestType: "Cute",
	},
	"hitandrun": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "hitandrun",
		isViable: true,
		name: "Hit and Run",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Bug",
		zMovePower: 180,
		contestType: "Cute",
	},
	"darttricks": {
		accuracy: 90,
		basePower: 30,
		category: "Special",
		desc: "Hits 3 times, with each hit having its own accuracy check and a high critical hit ratio",
		shortDesc: "Hits 3 times, with each hit having its own accuracy check and a high critical hit ratio",
		id: "darttricks",
		name: "Dart Tricks",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 3,
		critRatio: 2,
		secondary: false,
		target: "normal",
		type: "Rock",
		zMovePower: 175,
		contestType: "Cool",
	},
   "highnoonclaw": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Deals 1.5* damage if the weather is Sunny.",
		shortDesc: "Deals 1.5* damage if the weather is Sunny.",
		id: "highnoonclaw",
		isViable: true,
		name: "High Noon Claw",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
		zMovePower: 175,
		contestType: "Cute",
	},
	"kineticblow": {
		accuracy: 90,
		basePower: 90,
		category: "Special",
		desc: "15% chance to raise the user's Special Attack stat by 1 stage.",
		shortDesc: "15% chance to raise the user's Sp. Atk by 1.",
		id: "kineticblow",
		name: "Kinetic Blow",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 15,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"paragongift": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The teammate that switches in gains +1 to Defense and Special Defense. User faints.",
		shortDesc: "The teammate that switches in gains +1 to Defense and Special Defense. User faints.",
		id: "paragongift",
		isViable: true,
		name: "Paragon Gift",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		selfdestruct: "ifHit",
		boosts: {
			self: {
			def: 1,
			spd: 1,
			},
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
		zMoveEffect: 'healreplacement',
		contestType: "Cool",
	},
"magicalegg": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon) {
			if (!pokemon.volatiles['metalburst']) return 0;
			return pokemon.volatiles['metalburst'].damage || 1;
		},
		category: "Physical",
		desc: "Deals damage to the last foe to hit the user with an attack this turn equal to 1.5 times the HP lost by the user from that attack. If the user did not lose HP from the attack, this move deals damage with a Base Power of 1 instead. If that foe's position is no longer in use, the damage is done to a random foe in range. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by a foe's attack this turn.",
		shortDesc: "If hit by an attack, returns 1.5x damage.",
		id: "magicalegg",
		name: "Magical Egg",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('metalburst');
		},
		onTryHit: function (target, source, move) {
			if (!source.volatiles['metalburst']) return false;
			if (source.volatiles['metalburst'].position === null) return false;
		},
		effect: {
			duration: 1,
			noCopy: true,
			onStart: function (target, source, source2, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget: function (target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagePriority: -101,
			onDamage: function (damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && source.side !== target.side) {
					this.effectData.position = source.position;
					this.effectData.damage = 1.5 * damage;
				}
			},
		},
		secondary: false,
		target: "scripted",
		type: "Fairy",
		zMovePower: 100,
		contestType: "Cool",
	},
	"brutaltrick": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button.",
		shortDesc: "User switches out after damaging the target.",
		id: "brutaltrick",
		isViable: true,
		name: "Brutal Trick",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cute",
	},
	"eeirewhiteout": {
		accuracy: true,
		basePower: 90,
		category: "Special",
		desc: " Sets up Hail. Reduces the target's Special Defense by two stages. 10% chance to freeze the target.",
		shortDesc: " Sets up Hail. Reduces the target's Special Defense by two stages. 10% chance to freeze the target.",
		id: "eeirewhiteout",
		isViable: true,
		name: "Eeire Whiteout",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
				spd: -2,
			},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		weather: 'hail',
		target: "normal",
		type: "Ghost",
		zMovePower: 175,
		contestType: "Clever",
	},
	"protostarburst": {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Sets up Gravity. User takes 1/3 recoil",
		shortDesc: "Sets up Gravity. User takes 1/3 recoil",
		id: "protostarburst",
		name: "Gravity",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		pseudoWeather: 'gravity',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 7;
				}
				return 5;
			},
			onStart: function () {
				this.add('-fieldstart', 'move: Gravity');
				const allActivePokemon = this.sides[0].active.concat(this.sides[1].active);
				for (let pokemon of allActivePokemon) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy: function (accuracy) {
				if (typeof accuracy !== 'number') return;
				return accuracy * 5 / 3;
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['gravity']) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd: function () {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: false,
		recoil: [1, 3],
		target: "all",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Clever",
	},
	"despoilingvines": {
		num: 73,
		accuracy: 90,
		basePower: 35,
		category: "Physical",
		desc: "Traps the target, leeching 1/8 of their HP per turn. Lasts 4-5 turns.",
		shortDesc: "Traps the target, leeching 1/8 of their HP per turn. Lasts 4-5 turns.",
		id: "despoilingvines",
		isViable: true,
		name: "Despoiling Vines",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'leechseed',
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'move: Despoiling Vines');
			},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				let target = this.effectData.source.side.active[pokemon.volatiles['despoilingvines'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				let damage = this.damage(pokemon.maxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		secondary: false,
		volatileStatus: 'partiallytrapped',
		target: "normal",
		type: "Dark",
		zMovePower: 1000,
		contestType: "Clever",
	},
	"blindingiridescence": {
		accuracy: 75,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the foe.",
		id: "blindingiridescence",
		isViable: true,
		name: "Blinding Iridescence",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 180,
		contestType: "Tough",
	},
		"pileup": {
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "The user gathers nutrients from the ground, restoring 50% of its maximum HP. This move has a 25% chance to raise the user's Attack, Defense, Special Attack, Special Defense, or Speed by 1 stage (basically 5% for each).",
		shortDesc: "The user gathers nutrients from the ground, restoring 50% of its maximum HP. This move has a 25% chance to raise the user's Attack, Defense, Special Attack, Special Defense, or Speed by 1 stage (basically 5% for each).",
		id: "pileup",
		name: "Pile Up",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: {
			chance: 25,
		   onHit: function (target) {
			let stats = [];
			for (let stat in target.boosts) {
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = stats[this.random(stats.length)];
				let boost = {};
				boost[randomStat] = 1;
				this.boost(boost);
			} 
				else {
				return false;
			}
		},
		},
		target: "self",
		type: "Ground",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"ardentstrike": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Ignores immunities while attacking",
		shortDesc: "Ignores immunities while attacking",
		id: "ardentstrike",
		isViable: true,
		name: "Ardent Strike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: false,
		onEffectiveness: function (typeMod, type) {
			if (type === 'Fairy') return 1;
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 160,
		contestType: "Beautiful",
	},
		/*"spikestorm": {
		accuracy: 90,
		basePower: 20,
		category: "Physical",
		desc: "Hits 2-5 times, each hit has a 70% chance to set up a Layer of Spikes.",
		shortDesc: "Hits 2-5 times in one turn, each hit has a 70% chance to set up a Layer of Spikes.",
		id: "spikestorm",
		isViable: true,
		name: "Spike Storm",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: {
			chance: 70,
			onHit: function (target, source) {
			target.side.addSideCondition('spikes', source);
			},
		},
		target: "normal",
		type: "Ground",
		zMovePower: 80,
		contestType: "Tough",
	},*/
	
	"metalliccharge": {
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. 75% recoil.",
		shortDesc: "30% chance to flinch the target. 75% recoil.",
		id: "metalliccharge",
		isViable: true,
		name: "Metallic Charge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [3, 4],
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
		zMovePower: 200,
		contestType: "Tough",
	},
	"rapidcascade": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "rapidcascade",
		isViable: true,
		name: "Rapid Cascade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"deadonstrike": {
		accuracy: true,
		basePower: 120,
		category: "Physical",
		desc: "+1 Acc, ignores acc check. 33% recoil.",
		shortDesc: "+1 Acc, ignores acc check. 33% recoil.",
		id: "deadonstrike",
		isViable: true,
		name: "Dead-On Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 3],
		secondary: {
			chance: 100,
			self: {
				boosts: {
					accuracy: 1,
				},
			},
		},
		target: "normal",
		type: "Dark",
		zMovePower: 200,
		contestType: "Cool",
	},
		"tectonicfault": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Protect + Stealth Rock",
		shortDesc: "Protect + Stealth Rock",
		id: "tectonicfault",
		isViable: true,
		name: "Tectonic Fault",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1},
		onPrepareHit: function (pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				source.moveThisTurnResult = true;
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return null;
			},
		},
		sideCondition: 'stealthrock',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn: function (pokemon) {
				let typeMod = this.clampIntRange(pokemon.runEffectiveness('Rock'), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: false,
		target: "foeSide",
		type: "Rock",
		zMoveEffect: 'heal',
		contestType: "Cool",
	},
		"biteerfragarance": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Drops target defense and special defense by one level, then returns to the player. 20% of chance to paralyze target.",
		shortDesc: "Drops target defense and special defense by one level, then returns to the player. 20% of chance to paralyze target.",
		id: "biteerfragarance",
		isViable: true,
		name: "Bitter Fragarance",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		selfSwitch: true,
		boosts: {
			def: -1,
			spd: -1,
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Dark",
		zMoveEffect: 'healreplacement',
		contestType: "Cool",
	},
	"mistbath": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user summons Misty Terrain, and then recovers half of its health.",
		shortDesc: "The user summons Misty Terrain, and then recovers half of its health.",
		id: "mistbath",
		name: "Mist Bath",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		heal: [1, 2],
		terrain: 'mistyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus: function (status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && effect.status) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile: function (status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function (side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Water",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	   "bamboobash": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Deals 1.5* damage if the weather is Rainy.",
		shortDesc: "Deals 1.5* damage if the weather is Rainy.",
		id: "bamboobash",
		isViable: true,
		name: "Bamboo Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon) {
			if (this.isWeather(['rainyday', 'primodialsea'])) {
				return this.chainModify(1.5);
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Grass",
		zMovePower: 175,
		contestType: "Cute",
	},
		"holedig": {
		accuracy: 100,
		basePower: 135,
		category: "Physical",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Hits adjacent foes. Prevents them from switching.",
		id: "holedig",
		name: "Hole Dig",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onHit: function (target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Ground",
		zMovePower: 200,
		contestType: "Tough",
	},
	"highwaymansstrike": {
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Abilities Battle Armor or Shell Armor.",
		shortDesc: "Always results in a critical hit.",
		id: "highwaymansstrike",
		isViable: true,
		name: "Highway Mans Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 150,
		contestType: "Cool",
	},
	"cascade": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Power doubles if the user is burned, paralyzed, or poisoned. The physical damage halving effect from the user's burn is ignored.",
		shortDesc: "Power doubles if user is burn/poison/paralyzed.",
		id: "cascade",
		isViable: true,
		name: "Cascade",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 4,
		onBasePower: function (basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
		},
		secondary: false,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cute",
	},
	"shipwreckedgale": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Steals the opponent's stat changes before attacking, and then switches out, passing on the stolen stat changes on to the switch-in.",
		shortDesc: "Steals the opponent's stat changes before attacking, and then switches out, passing on the stolen stat changes on to the switch-in.",
		id: "shipwreckedgale",
		isViable: true,
		name: "Shipwrecked Gale",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, authentic: 1},
		stealsBoosts: true,
		selfSwitch: 'copyvolatile',
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMovePower: 140,
		contestType: "Cool",
	},
		"gorgeousstrike": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "1/9 Recoil.",
		shortDesc: "1/9 Recoil.",
		id: "gorgeousstrike",
		isViable: true,
		name: "Gorgeous Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 9],
		target: "normal",
		type: "Fairy",
		zMovePower: 195,
		contestType: "Cute",
	},
		"woodpeckerbarrage": {
		accuracy: 100,
		basePower: 10,
		category: "Physical",
		desc: "Multihit move: 1-15, doesn't make contact.",
		shortDesc: "Multihit move: 1-15, doesn't make contact.",
		id: "woodpeckerbarrage",
		isViable: true,
		name: "Woodpecker Barrage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [1, 15],
		secondary: false,
		target: "normal",
		type: "Flying",
		zMovePower: 190,
		contestType: "Tough",
	},
		"meteoriteimpact": {
		accuracy: 95,
		basePower: 45,
		category: "Special",
		desc: "+2 Priority.",
		shortDesc: "+2 Priority.",
		id: "meteoriteimpact",
		name: "Meteorite Impact",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 170,
		contestType: "Cool",
	},
		"brawlingball": {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "Raises Spe by one stage. Ignores immunities. Removes hazards from the user's side of the field, gets rid of binding moves and Leech Seed as well.",
		shortDesc: "Raises Spe by one stage. Ignores immunities. Removes hazards from the user's side of the field, gets rid of binding moves and Leech Seed as well.",
		id: "brawlingball",
		isViable: true,
		name: "Brawling Ball",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
				self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Ghost') return 1;
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 190,
		contestType: "Cool",
	},
		"razzledazzle": {
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. 30% chance to burn the target.",
		shortDesc: "Hits 2 times in one turn. 30% chance to burn the target.",
		id: "razzledazzle",
		name: "Razzle Dazzle",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 100,
		contestType: "Tough",
	},
		"soulstamp": {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		desc: "If the target is KOed by this move, Yamask transforms into the target and heals 50% of its max HP.",
		shortDesc: "If the target is KOed by this move, Yamask transforms into the target and heals 50% of its max HP.",
		id: "soulstamp",
		isViable: true,
		name: "Soul Stamp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
			onSourceFaint: function (source) {
			this.useMove('Transform', source);
			this.useMove('Recover', source);
		},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 185,
		contestType: "Beautiful",
	},
		"fleastorm": {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "The user recovers 100% the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 100% of the damage dealt.",
		id: "fleastorm",
		isViable: true,
		name: "Flea Storm",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1},
		drain: [1, 1],
		secondary: false,
		target: "normal",
		type: "Bug",
		zMovePower: 140,
		contestType: "Tough",
	},
	"beautydrain": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's SpD by 1 stage. The user restores its HP equal to the target's SpD stat calculated with its stat stage before this move was used. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. Fails if the target's Attack stat stage is -6.",
		shortDesc: "User heals HP=target's SpD stat. Lowers SpD by 1.",
		id: "strengthsap",
		isViable: true,
		name: "Beauty Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onHit: function (target, source) {
			if (target.boosts.spd === -6) return false;
			let spd = target.getStat('spd', false, true);
			let success = this.boost({spd: -1}, target, source, null, null, true);
			return this.heal(spd, source, target) || success;
		},
		secondary: false,
		target: "normal",
		type: "Water",
		zMoveBoost: {def: 1},
		contestType: "Cute",
	},
	"ultrawarp": {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 100% chance to poison the target.",
		shortDesc: "100% chance to poison the target.",
		id: "ultrawarp",
		isViable: true,
		name: "Ultra Warp",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 160,
	},
	"nightslash": {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. Hits 2-5 times.",
		id: "nightslash",
		isViable: true,
		name: "Night Slash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		multihit: [2, 5],
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cool",
	},
	// Eternal Moves End
};
