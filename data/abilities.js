﻿exports.BattleAbilities = {
//FE Start
	"turnabouttorrent": {
		desc: "When this Pokemon has 1/3 or more of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage. Stat changes are reversed",
		onBoost: function(boost) {
			for (var i in boost) {
				boost[i] *= -1;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp >= attacker.maxhp / 3) {
				this.debug('Turnabout Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp >= attacker.maxhp / 3) {
				this.debug('Turnabout Torrent boost');
				return this.chainModify(1.5);
			}
		},
		id: "turnabouttorrent",
		name: "Turnabout Torrent",
		rating: 2,
		num: 192
	},
	"intimidatingscales": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
			}
			if (foeactive[i].volatiles['substitute']) {
				this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
			} else {
				this.boost({
					atk: -1
				}, foeactive[i], pokemon);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef: function(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "intimidatingscales",
		name: "Intimidating Scales",
		rating: 3.5,
		num: 193
	},
	"hugetorrent": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(2);
			}
		},
		id: "hugetorrent",
		name: "Huge Torrent",
		rating: 2,
		num: 194
	},
	"intenserivalry": {
		desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender or multiplied by 0.75 against targets of the opposite gender. There is no modifier if either this Pokemon or the target is genderless.",
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender.",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Intense Rivalry');
		},
		onModifyMove: function(move) {
			move.ignoreAbility = true;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Intense Rivalry boost');
					return this.chainModify(1.25);
				} else {
					this.debug('Intense Rivalry weaken');
					return this.chainModify(0.75);
				}
			}
		},
		id: "intenserivalry",
		name: "Intense Rivalry",
		rating: 0.5,
		num: 196
	},
	"intimidateveil": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
			}
			if (foeactive[i].volatiles['substitute']) {
				this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
			} else {
				this.boost({
					atk: -1
				}, foeactive[i], pokemon);
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracy: function(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.isWeather('sandstorm')) {
				this.debug('Sand Veil - decreasing accuracy');
				return accuracy * 0.8;
			}
		},
		id: "intimidateveil",
		name: "Intimidateveil",
		rating: 3.5,
		num: 197
	},
	"levipoison": {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		onImmunity: function(type) {
			if (type === 'Ground') return false;
			/* Levipoison (Levitate+Poison Point) - If this Pokémon is hit with a Ground-type attack, the attacker is poisoned. Grants the Pokémon with this ability an immunity to ground */
		},
		id: "levipoison",
		name: "Levipoison",
		rating: 3.5,
		num: 198,
	},
	"unburden": {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
		onAfterUseItem: function(item, pokemon) {
			if (pokemon !== this.effectData.target) return this.boost({
				atk: 2,
				spe: 2
			});
			return this.boost({
				def: -1,
				spd: -1
			});
		},
		onTakeItem: function(item, pokemon) {
			return this.boost({
				atk: 2,
				spe: 2
			});
			return this.boost({
				def: -1,
				spd: -1
			});
		},
		id: "armorcast",
		name: "Armor Cast",
		rating: 3.5,
		num: 199
	},
	"obliviousabsorb": {
		desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while affected cures it.",
		shortDesc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability cures it.",
		onUpdate: function(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'attract') {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Oblivious');
				return null;
			}
		},
		onTryHit: function(pokemon, target, move) {
			if (move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Oblivious');
				this.heal(target.maxhp / 8);
				return null;
			}
		},
		id: "obliviousabsorb",
		name: "Oblivious Absorb",
		rating: 1,
		num: 200
	},
	"fear": {
		desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
			}
			if (foeactive[i].volatiles['substitute']) {
				this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
			} else {
				this.boost({
					atk: -1
				}, foeactive[i], pokemon);
			}
		},
		id: "fear",
		name: "FEAR",
		rating: 3,
		num: 201,
	},
	"cactuspower": {
		shortDesc: "On switch-in, this Pokemon summons Sandstorm.",
		onStart: function(source) {
			this.setWeather('sandstorm');
		},
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		id: "cactuspower",
		name: "Cactus Power",
		rating: 4.5,
		num: 202
	},
	"snowforce": {
		desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon's Ice attacks do 1.3x in Hail; immunity to it.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (this.isWeather('hail')) {
				if (move.type === 'Ice') {
					this.debug('Snow Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
	},
	"sandyskin": {
		desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			if (pokemon.status && this.isWeather(['sandstorm'])) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		id: "sandyskin",
		name: "Sandy Skin",
		rating: 2,
		num: 203
	},
	"technicutter": {
		desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		onBoost: function(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost['atk'] && boost['atk'] < 0) {
				boost['atk'] = 0;
				if (!effect.secondaries) this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
			}
		},
		id: "technicutter",
		name: "Technicutter",
		rating: 4,
		num: 204
	},
	"chlorovolt": {
		shortDesc: "If Electric Terrain is active, this Pokemon's Speed is multiplied by 1.5.",
		onModifySpePriority: 6,
		onModifySpe: function(pokemon) {
			if (this.isTerrain('electricterrain')) return this.chainModify(1.5);
		},
		id: "chlorvolt",
		name: "Chloro Volt",
		rating: 0.5,
		num: 205
	},
	"healingfat": {
		desc: "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'brn' || effect.id === 'frz') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onUpdate: function(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		id: "healingfat",
		name: "Healing Fat",
		rating: 4,
		num: 206
	},
	"mummyfortitude": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (source.ability === 'mummy' && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-activate', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		id: "mummmyfortitude",
		name: "Mummy Fortitude",
		rating: 3,
		num: 207
	},
	"blazingbody": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		id: "blazingbody",
		name: "blazing body",
		rating: 3,
		num: 208
	},
	"staticstorm": {
		desc: "If Hail is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon heals 1/16 of its max HP each turn; immunity to Hail.",
		onWeather: function(target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.maxhp / 16);
			}
		},
		onAfterDamage: function(damage, target, source, effect) {
			if (this.random(10) < 3) {
				source.trySetStatus('par', target, effect);
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'hail') return false;
		},
		id: "staticstorm",
		name: "static storm",
		rating: 1.5,
		num: 209
	},
	"dreadedflames": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
			}
			if (foeactive[i].volatiles['substitute']) {
				this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
			} else {
				this.boost({
					atk: -1
				}, foeactive[i], pokemon);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		id: "dreadedflames",
		name: "Dreaded Flames",
		rating: 3.5,
		num: 210
	},
	"rockygrowth": {
		desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		id: "rockygrowth",
		name: "Rocky Growth",
		rating: 3,
		num: 211
	},
	"pristine": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onUpdate: function(pokemon) {
			if (pokemon.status === 'brn' || pokemon.status === 'frz' || pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'par' && target.hp === target.maxhp ) {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'brn' || type === 'frz' || type === 'psn' || type === 'tox' || type === 'par' && target.hp === target.maxhp) return false;
		},
		id: "pristine",
		name: "Pristine",
		rating: 3,
		num: 212
	},
	"innerbody": {
		shortDesc: "This Pokemon cannot be made to flinch.",
		onFlinch: false,
		onAfterDamage: function(damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('brn', target, move);
				}
			}
		},
		id: "innerbody",
		name: "Inner Body",
		rating: 1.5,
		num: 213
	},
	"intimidatingfangs": {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be poisoned.",
		onAfterDamage: function(damage, target, source, move) {
			if (move && move.flags['contact']) {
				{
					var foeactive = pokemon.side.foe.active;
					var activated = false;
					for (var i = 0; i < foeactive.length; i++) {
						if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Intimidate');
							activated = true;
						}
					}
					if (foeactive[i].volatiles['substitute']) {
						this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
					} else {
						this.boost({
							atk: -1
						}, foeactive[i], pokemon);
					}
				}
			}
		},
		id: "intimidatingfangs",
		name: "Intimidating Fangs",
		rating: 2,
		num: 214
	},
	"intimidatingabsorption": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function(pokemon) {
			var foeactive = pokemon.side.foe.active;
			var activated = false;
			for (var i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			}
		},
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		id: "intimidatingabsorption",
		name: "Intimidating Absorption",
		rating: 3.5,
		num: 215
	},
	"keenfeet": {
		desc: "This Pokemon's Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe.",
		onAfterEachBoost: function(boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			var statsLowered = false;
			for (var i in boost) {
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({
					evasion: 2
				});
			}
		},
		id: "keen feet",
		name: "keen feet",
		rating: 2.5,
		num: 216
	},
	"swiftabsorb": {
		desc: "This Pokemon is immune to water-type moves. The first time it is hit by a water-type move, its attacking stat is multiplied by 1.5 while using a water-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by water-type attacks.",
		shortDesc: "This Pokemon's water attacks do 1.5x damage if hit by one water move; water immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'water') {
				move.accuracy = true;
				if (!target.addVolatile('swiftabsorb')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash water');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('swiftabsorb');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Swift Absorb');
			},
			onModifySpePriority: 5,
			onModifySpe: function(atk, attacker, defender, move) {
				this.debug('Flash water boost');
				return this.chainModify(2);
			},
			onEnd: function(target) {
				this.add('-end', target, 'ability: Flash water', '[silent]');
			}
		},
		id: "swiftabsorb",
		name: "Swift Absorb",
		rating: 3,
		num: 217
	},
	"mathsurge": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Math surge');
				return this.chainModify(1.5);
			}
		},
		id: "mathsurge",
		name: "Math Surge",
		rating: 2,
		num: 218
	},
	"flameessence": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Flame Essence');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Flame Essence');
				return this.chainModify(1.5);
			}
		},
		id: "flameessence",
		name: "Flame Essence",
		rating: 2,
		num: 219
	},
	"naturalguard": {
		shortDesc: "Every move used by or against this Pokemon will always hit.",
		onAnyAccuracy: function(accuracy, target, source, move) {
			if (move && (source === this.effectData.target || pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'brn' || pokemon.status === 'frz' || pokemon.status === 'par')) {
				return true;
			}
			return accuracy;
		},
		onSwitchOut: function (pokemon) {
			pokemon.cureStatus();
		},
		id: "naturalguard",
		name: "Natural Guard",
		rating: 4,
		num: 220,
	},
	"stickylevitation": {
		shortDesc: "This Pokemon cannot lose its held item due to another Pokemon's attack.",
		onTakeItem: function(item, pokemon, source) {
			if (this.suppressingAttackEvents() && pokemon !== this.activePokemon) return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		onImmunity: function(type) {
			if (type === 'Ground') return false;
		},
		id: "stickylevitation",
		name: "Sticky Levitation",
		rating: 1.5,
		num: 221
	},
	"serenefire": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyMove: function(move) {
				if (!move || !move.type === 'Fire') return;
				if (!move.secondaries) {
					move.secondaries = [];
				}
				move.secondaries.push({
					chance: 100,
					status: 'brn'
				});
			},
			onEnd: function(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			}
		},
		id: "serenefire",
		name: "Serene Fire",
		rating: 3,
		num: 222,
	},
	"healingblaze": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
				pokemon.cureStatus();
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
				pokemon.cureStatus();
			}
		},
		id: "healingblaze",
		name: "Healing Blaze",
		rating: 2,
		num: 223,},
		"barbstance": {
			desc: "If this Pokemon is an Ferroslash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
			shortDesc: "If Ferroslash, changes Forme to Blade before attacks and Shield before King's Shield.",
			onBeforeMovePriority: 11,
			onBeforeMove: function(attacker, defender, move) {
				if (attacker.template.baseSpecies !== 'Ferroslash') return;
				if (move.category === 'Status' && move.id !== 'kingsshield') return;
				var targetSpecies = (move.id === 'kingsshield' ? 'Ferroslash' : 'Ferroslash-Blade');
				if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
					this.add('-formechange', attacker, targetSpecies);
				}
			},
			id: "barbstance",
			name: "Barb Stance",
			rating: 5,
			num: 224,
	},
	"poweruppinch": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 5) {
				this.debug('Blaze boost');
				return this.chainModify(1.25);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 5) {
				this.debug('Blaze boost');
				return this.chainModify(1.25);
			}
		},
		id: "poweruppinch",
		name: "Power Up Pinch",
		rating: 2,
		num: 225
	},
	"electrotechnic": {
		desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(spa, pokemon) {
			var allyActive = pokemon.side.active;
			if (allyActive.length === 1) {
				return;
			}
			for (var i = 0; i < allyActive.length; i++) {
				if (allyActive[i] && allyActive[i].position !== pokemon.position && !allyActive[i].fainted && allyActive[i].hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
		id: "electrotechnic",
		name: "ElectroTechnic",
		rating: 4,
		num: 226
	},
	"speedbreak": {
		shortDesc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
		onBoost: function(boost) {
			boost.spe *= -1;
		},
		id: "speedbreak",
		name: "Speed Break",
		rating: 4,
		num: 227
	},
	"justicepower": {
		shortDesc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move.",
		onAfterDamage: function(damage, target, source, effect) {
			if (effect && effect.type === 'Dark') {
				this.boost({
					atk: 1
				});
			}
		},
		onDeductPP: function(damage, target, source, effect) {
			if (effect && effect.type === 'Dark') return;
			return 1;
		},
		id: "justicepower",
		name: "Justice Power",
		rating: 2,
		num: 228
	},
	"cursedtrace": {
		desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, and Zen Mode.",
		shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
		onUpdate: function (pokemon) {
			if (!pokemon.isStarted) return;
			let possibleTargets = [];
			for (let i = 0; i < pokemon.side.foe.active.length; i++) {
				if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
			}
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				let target = possibleTargets[rand];
				let ability = this.getAbility(target.ability);
				let bannedAbilities = {comatose:1, disguise:1, flowergift:1, forecast:1, illusion:1, imposter:1, multitype:1, schooling:1, stancechange:1, trace:1, zenmode:1};
				if (bannedAbilities[target.ability]) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
				if (pokemon.setAbility(ability)) target.addVolatile('gastroacid');
				return;
			}
		},
		id: "cursedtrace",
		name: "cursed Trace",
		rating: 3,
		num: 229,
	},
	"sheerflight": {
		desc: "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed.",
		shortDesc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
		onImmunity: function(move, pokemon, type) {
			{
				if (move.secondaries) {
					if (type === 'Ground') return false;
				}
			}
		},
		onModifyMove: function(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "sheerflight",
		name: "Sheer Flight",
		rating: 4,
		num: 230
	},
	"evaporation": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Water') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			}
		},
	},
	"hardbody": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onBoost: function(boost, target, source, effect) {
			if (boost[i] < 0) {
				delete boost[i];
				showMsg = true;
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		onModifySpe: function(spe, pokemon) {
			if (pokemon.status === 'par') {
				return this.chainModify(1.5);
			}
		},
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		id: "hardbody",
		name: "Hard Body",
		rating: 2,
		num: 231
	},
	"gutbreaker": {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		stopAttackEvents: true,
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		id: "gutbreaker",
		name: "Gut Breaker",
		rating: 3.5,
		num: 232
	},
	"synchofloat": {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		onImmunity: function(type) {
			if (type === 'Ground') return false;
			let oldAbility = source.setAbility('levitate', source, 'levitate', true);
			if (oldAbility) {
				this.add('-activate', target, 'ability: Levitate', oldAbility, '[of] ' + source);
			}
		},
		id: "synchofloat",
		name: "Synchofloat",
		rating: 3.5,
		num: 233
	},
	"magicianswand": {
		desc: "This Pokemon is immune to Electric-type moves and raises its Special Attack by 1 stage when hit by an Electric-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
		shortDesc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
		onTryHit: function(target) {
			if (target.hasAbility('stickyhold')) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
		onHit: function(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				var yourItem = target.takeItem(source);
				var myItem = source.takeItem();
				if (target.item || source.item || (!yourItem && !myItem) || (myItem.onTakeItem && myItem.onTakeItem(myItem, target) === false)) {
					if (yourItem) target.item = yourItem;
					if (myItem) source.item = myItem;
					return false;
				}
				this.add('-activate', source, 'move: Trick', '[of] ' + target);
				if (myItem) {
					target.setItem(myItem);
					this.add('-item', target, myItem, '[from] Trick');
				}
				if (yourItem) {
					source.setItem(yourItem);
					this.add('-item', source, yourItem, '[from] Trick');
				}
			}
		},
		id: "magicianswand",
		name: "Magician's Wand",
		rating: 3.5,
		num: 234
	},
	"cleanmatch": {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
		onModifySpe: function(spe, pokemon) {
			if (!pokemon.item) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtk: function(atk, pokemon) {
			if (!pokemon.item) {
				return this.chainModify(1.5);
			}
		},
		id: "cleanmatch",
		name: "cleanmatch",
		rating: 3.5,
		num: 235
	},
	"positivegrowth": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
		onModifySpAPriority: 5,
		onModifySpA: function(atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 3) {
				this.debug('Math surge');
				return this.chainModify(1.5);
			}
		},
		id: "positive growth",
		name: "Positive Growth",
		rating: 2,
		num: 236
	},

	"errormacro": {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
		shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
		getCategory: function(move) {
			move = this.getMove(move);
			if (move.category === 'Status') return 'Status';
			if (move.category === 'Physical') return 'Special';
			return 'Physical';
		},
		onBeforeMovePriority: 11,
		onBeforeMove: function(attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash') return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			var targetSpecies = (move.id === 'kingsshield' ? 'Aegilene' : 'Aegislash-Saber');
			if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
				this.add('-formechange', attacker, targetSpecies);
			}
		},
		id: "errormacro",
		name: "Error Macro",
		rating: 5,
		num: 238
	},
	"latebloomer": {
		desc: "The power of this Pokemon's move is multiplied by 1.3 if it is the last to move in a turn. Does not affect Doom Desire and Future Sight.",
		shortDesc: "This Pokemon's attacks have 1.3x power if it is the last to move in a turn.",
		OnAfterDamagePriority: 8,
		onAfterDamage: function(damage, attacker, defender, move) {
			if (!this.willMove(defender)) {
				if (this.random(10) < 3) {
					source.addVolatile('attract', target);
				}
			}
		},
		id: "latebloomer",
		name: "Late Bloomer",
		rating: 2,
		num: 239
	},
	"sturdytempo": {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onUpdate: function(pokemon) {
			if (pokemon.volatiles['confusion']) {
				pokemon.removeVolatile('confusion');
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'confusion') {
				this.add('-immune', pokemon, 'confusion');
				return false;
			}
		},
		onTryHit: function(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		id: "sturdytempo",
		name: "Sturdy Tempo",
		rating: 3,
		num: 240
	},
	"tangledflames": {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		onTryHit: function(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd: function(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, target, attacker, defender, move) {
				if (move.type === 'Fire' || target && target.volatiles['confusion']) {
					this.debug('Flash Fire boost');
					return this.chainModify(2);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' || target && target.volatiles['confusion']) {
					this.debug('Flash Fire boost');
					return this.chainModify(2);
				}
			},
			onEnd: function(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			}
		},
		id: "tangledflames",
		name: "Tangled Flames",
		rating: 3,
		num: 241
	},
	"hydrostream": {
		shortDesc: "On switch-in, this Pokemon summons Rain Dance.",
		onStart: function(source) {
			this.setWeather('raindance');
		},
		id: "hydrostream",
		name: "Hydro Stream",
		rating: 4.5,
		num: 242
	},
	"hydrate": {
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Water';
				if (move.category !== 'Status') pokemon.addVolatile('refrigerate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "hydrate",
		name: "Hydrate",
		rating: 4,
		num: 243
	},
	"breaker": {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		stopAttackEvents: true,
		onBoost: function(boost, target, source, effect) {
			for (var i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		onAnyModifyBoost: function(boosts, target) {
			var source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		id: "breaker",
		name: "Breaker",
		rating: 2,
		num: 244
	},
	"hammerspace": {
		shortDesc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
		onSwitchOut: function(pokemon) {
			pokemon.setItem(pokemon.lastItem);
			this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Hammer Space');
		},
		id: "hammer space",
		name: "Hammer Space",
		rating: 4,
		num: 245
	},
	"sereneeyes": {
		shortDesc: "This Pokemon's moves have their secondary effect chance doubled.",
		onModifyMovePriority: -2,
		onModifyMove: function(move) {
			if (move.secondaries && move.id !== 'secretpower') {
				this.debug('doubling secondary chance');
				move.accuracy *= 2;
			}
		},
		id: "sereneeyes",
		name: "Serene Eyes",
		rating: 4,
		num: 246
	},
	"leafstream": {
		shortDesc: "On switch-in, this Pokemon summons Sunny Day.",
		onStart: function(source) {
			this.setWeather('sunnyday');
		},
		id: "leafstream",
		name: "LeafStream",
		rating: 4.5,
		num: 247
	},
	"cybercriminal": {
		desc: "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		onSourceFaint: function(target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1
				}, source);
			}
		},
		id: "cybercriminal",
		name: "Cyber Criminal",
		rating: 3.5,
		num: 248
	},

	"underpressure": {
		desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			if (pokemon.status) {
				this.debug('under pressure');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		onStart: function(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP: function(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		id: "underpressure",
		name: "Under Pressure",
		rating: 2,
		num: 250
	},
	"naturaleye": {
		desc: "All non-damaging moves that check accuracy have their accuracy changed to 50% when used on this Pokemon. This change is done before any other accuracy modifying effects.",
		shortDesc: "Status moves with accuracy checks are 50% accurate when used on this Pokemon.",
		onModifyAccuracyPriority: 10,
		onModifyAccuracy: function(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof move.accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 50');
				return 0;
			}
		},
		id: "naturaleye",
		name: "Natural Eye",
		rating: 2,
		num: 251
	},
	"overwhelmingpresence": {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		onStart: function(pokemon) {
			this.add('-start', pokemon, 'Embargo');
			this.add('-endability', pokemon);
			this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid')
		},
		// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
		// Ability suppression implemented in BattlePokemon.ignoringAbility() within battle-engine.js
		onResidualOrder: 18,
		onEnd: function(pokemon) {
			this.add('-end', pokemon, 'Embargo');
		},
		id: "overwhelmingpresence",
		name: "Overwhelming Presence",
		rating: 3.5,
		num: 252
	},
	"monsoon": {
		desc: "If this Pokemon is a Casting, its type changes to the current weather condition's type, except Sandstorm.",
		shortDesc: "Casting's secondary type changes to the current weather condition's type, except Sandstorm.",
		onUpdate: function(pokemon) {
			if (pokemon.baseTemplate.species !== 'Casting' || pokemon.transformed) return;
			var forme = null;
			switch (this.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.template.speciesid !== 'castingsunny') forme = 'Casting-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.template.speciesid !== 'castingrainy') forme = 'Casting-Rainy';
					break;
				case 'hail':
					if (pokemon.template.speciesid !== 'castingsnowy') forme = 'Casting-Snowy';
					break;
				default:
					if (pokemon.template.speciesid !== 'casting') forme = 'Casting';
					break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]');
			}
		},
		id: "monsoon",
		name: "Monsoon",
		rating: 3,
		num: 253
	},
	"monsoonaltered": {
		desc: "If this Pokemon is a Casting, its type changes to the current weather condition's type, except Sandstorm.",
		shortDesc: "Casting's secondary type changes to the current weather condition's type, except Sandstorm.",
		onUpdate: function(pokemon) {
			if (pokemon.baseTemplate.species !== 'Casting' || pokemon.transformed) return;
			var forme = null;
			switch (this.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.template.speciesid !== 'castingsunny') forme = 'Casting-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.template.speciesid !== 'castingrainy') forme = 'Casting-Rainy';
					break;
				case 'hail':
					if (pokemon.template.speciesid !== 'castingicy') forme = 'Casting-Icy';
					break;
				default:
					if (pokemon.template.speciesid !== 'casting') forme = 'Casting';
					break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]');
			}
		},
		onImmunity: function(type) {
			if (type === 'Ground') return false;
		},
		id: "monsoonaltered",
		name: "Monsoon-Altered",
		rating: 3,
		num: 254
	},
		"justifiedfire": {
		desc: "Raises user's Special Attack when hit with a Fire-type attack. Grants immunity to Fire.",
		shortDesc: "Raises user's Special Attack when hit with a Fire-type attack. Grants immunity to Fire.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[msg]', '[from] ability: Justified Fire');
				}
				return null;
			}
		},
		onAnyRedirectTarget: function (target, source, source2, move) {
			if (move.type !== 'Fire' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Justified Fire');
				}
				return this.effectData.target;
			}
		},
		id: "justifiedfire",
		name: "Justified Fire",
		rating: 3.5,
		num: 32,
	},

	"sturdytempo": {
		desc: "Sturdy + Own Tempo.",
		shortDesc: "Sturdy + Own Tempo",
		onTryHit: function (pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy Tempo');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Sturdy Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Sturdy Tempo');
			}
		},
		id: "sturdytempo",
		name: "Sturdy Tempo",
	},


	"hydrostream": {
		shortDesc: "On switch-in, this Pokemon summons Rain Dance.",
		onStart: function (source) {
			for (let i = 0; i < this.queue.length; i++) {
				if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'kyogre') return;
				if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
			}
			this.setWeather('raindance');
		},
		id: "hydrostream",
		name: "Hydro Stream",
	},
	"hydrate": {
		desc: "This Pokemon's Normal-type moves become Water-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Water type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Water';
				move.refrigerateBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "hydrate",
		name: "Hydrate",
		rating: 4,
		num: 174,
	},
	"leafstream": {
		shortDesc: "On switch-in, this Pokemon summons Sunny Day.",
		onStart: function (source) {
			for (let i = 0; i < this.queue.length; i++) {
				if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'groudon') return;
				if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
			}
			this.setWeather('sunnyday');
		},
		id: "leafstream",
		name: "Leaf Stream",
	},
	"cybercriminal": {
		desc: "This Pokemon's Special Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Special Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: 1}, source);
			}
		},
		id: "cybercriminal",
		name: "Cyber Criminal",
		rating: 3.5,
		num: 153,
	},
	"cleartempo": {
		shortDesc: "Immune to stat drops and confusion.",
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Clear Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Clear Tempo');
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Tempo", "[of] " + target);
		},
		id: "cleartempo",
		name: "Clear Tempo",
	},
	"sandyeyes": {
		desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.3x in Sandstorm; immunity to it.",
		onSourceModifyAccuracy: function (accuracy) {
			if (this.isWeather('sandstorm')) {
			if (typeof accuracy !== 'number') return;
			this.debug('sandyeyes - enhancing accuracy');
			return accuracy * 1.3;
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "sandyeyes",
		name: "Sandy Eyes",
	},
	"sharparmor": {
		shortDesc: "Atk is raised by 2 when hit by a Water-type move and lowered by 2 when hit by a Fire-type; gives immunity to Water-type moves.",
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.type === 'Water') {
				this.boost({atk: 2});
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.type === 'Fire') {
				this.boost({atk: -2});
			}
		},
				onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				move.accuracy = true;
				if (!target.addVolatile('sharparmor')) {
					this.add('-immune', target, '[msg]', '[from] ability: Sharp Armor');
				}
				return null;
			}
		},
		id: "sharparmor",
		name: "Sharp Armor",
	},
	"dreamcrusher": {
		shortDesc: "The user deals 2x damage to sleeping targets.",
		onModifyDamage: function (damage, source, target, move) {
			if (pokemon.status && pokemon.status == 'slp') {
				this.debug('Dream Crusher boost');
				return this.chainModify(2);
			}
		},
		id: "dreamcrusher",
		name: "Dream Crusher",
	},
	"desertsnow": {
		desc: "This pokemon's Ground/Rock/Steel/Ice attacks do 1.3x in Sandstorm and Hail, opposing attacks of those types heal by 1/16 under the same weather conditions.",
		shortDesc: "This pokemon's Ground/Rock/Steel/Ice attacks do 1.3x in Sandstorm and Hail, opposing attacks of those types heal by 1/16 under the same weather conditions.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.isWeather('hail')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel' || move.type === 'Ice') {
					this.debug('Desert Snow boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onTryHit: function (target, source, move) {
			if (this.isWeather('hail')) {
			if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel' || move.type === 'Ice') {
				if (!this.heal(target.maxhp / 16)) {
					this.add('-immune', target, '[msg]', '[from] ability: Desert Snow');
				}
			}
				return null;
			}
		},
		id: "desertsnow",
		name: "Desert Snow",
	},
	"magicbreak": {
		shortDesc: "This Pokemon's attacks ignore the effects of the opponent's items.",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Magic Break');
		},
		onModifyMove: function (move) {
			move.ignoreItem = true;
		},
		id: "magicbreak",
		name: "Magic Break",
	},
		"raptorhead": {
		desc: "Prevents recoil damage and Attack reduction.",
		shortDesc: "Prevents recoil damage and Attack reduction.",
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			if (boost['atk'] && boost['atk'] < 0) {
				delete boost['atk'];
				if (!effect.secondaries) this.add("-fail", target, "unboost", "Attack", "[from] ability: Raptor Head", "[of] " + target);
			}
		},
		id: "raptorhead",
		name: "Raptor Head",
	},
	"steadfastluck": {
		shortDesc: "When this Fusion Evolution flinches, its speed and critical hit ratio are raised by 1 stage.",
		onFlinch: function (pokemon) {
			this.boost({spe: 1, critRatio :1});
		},
		id: "steadfastluck",
		name: "Steadfast Luck",
	},
	"thunderousembers": {
		desc: "Raises Special Attack by 1.5x when hit by a fire attack move; immunity to fire attacks.",
		shortDesc: "Raises Special Attack by 1.5x when hit by a fire attack move; immunity to fire attacks.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[msg]', '[from] ability: Thunderous Embers');
				}
				return null;
			}
		},
		onAnyRedirectTarget: function (target, source, source2, move) {
			if (move.type !== 'Fire' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Thunderous Embers');
				}
				return this.effectData.target;
			}
		},
		id: "thunderousembers",
		name: "Thunderous Embers",
	},
	"torrentialvoltage": {
		desc: "Electric immunity, and when hit by an Electric-type move, this Pokemon's Electric moves gain a 50% power boost.",
		shortDesc: "Electric immunity, and when hit by an Electric-type move, this Pokemon's Electric moves gain a 50% power boost.",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Electric') {
				move.accuracy = true;
				if (!target.addVolatile('torrentialvoltage')) {
					this.add('-immune', target, '[msg]', '[from] ability: Torrential Voltage');
				}
				return null;
			}
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('torrentialvoltage');
		},
		effect: {
			noCopy: true,
			onStart: function (target) {
				this.add('-start', target, 'ability: Torrential Voltage');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('Torrential Voltage boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('Torrential Voltage boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Torrential Voltage', '[silent]');
			},
		},
		id: "torrentialvoltage",
		name: "Torrential Voltage",
	},
		"seamonster": {
		desc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
		shortDesc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Sea Monster', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: -1}, foeactive[i], pokemon);
				}
			}
		},
		onBasePower: function (basePower, user, target, move) {
			if (move.type === 'Water') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		id: "seamonster",
		name: "Sea Monster",
		},

	"sereneeyes": {
		shortDesc: "Moves with secondary effect chances have their accuracy doubled.",
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
			return accuracy * 1.3;
			}
		},
		id: "sereneeyes",
		name: "Serene Eyes",
	},
	"fromashes": {
		desc: "If the Pokémon is burned, it will gain 1/8 of its maximum HP at the end of each turn instead of taking damage. The Pokémon with this Ability does not lose Attack due to burn.",
		shortDesc: "If the Pokémon is burned, it will gain 1/8 of its maximum HP at the end of each turn instead of taking damage. The Pokémon with this Ability does not lose Attack due to burn.",
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		id: "fromashes",
		name: "From Ashes",
	},
	
	/*slowandsteady: {
		shortDesc: "This Pokemon takes 1/2 damage from attacks if it moves last.",
		onModifyDamage: function (damage, source, target, move) {
			if (target.lastDamage > 0 && source.lastAttackedBy && source.lastAttackedBy.thisTurn && source.lastAttackedBy.pokemon === target) {
				return this.chainModify(0.5);
			}
		},
		id: "slowandsteady",
		name: "Slow And Steady",
	},*/
	/*"seamonster": {
		desc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
		shortDesc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Sea Monster', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: -1}, foeactive[i], pokemon);
				}
			}
		},
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.1);
		},
	},
		id: "seamonster",
		name: "Sea Monster",
	},

	
	"torrenttempo": {
		shortDesc: "If this Pokemon is confused, it snaps out of that confusion and gains a 50% boost to its Water-moves.",
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Torrent Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Torrent Tempo');
			}
		},
		id: "torrenttempo",
		name: "Torrent Tempo",
	},

// FE End
		// Eeveed Start
		"miracledash": {
			shortDesc: "If Psychic Terrain is active, this Pokemon's Speed is doubled.",
			onModifySpe: function(spe) {
				if (this.isTerrain('psychicterrain')) {
					return this.chainModify(2);
				}
			},
			id: "miracledash",
			name: "Miracle Dash",
		},
		"bravery": {
			shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Dark move; Dark immunity.",
			onTryHitPriority: 1,
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Dark') {
					if (!this.boost({
							atk: 1
						})) {
						this.add('-immune', target, '[msg]', '[from] ability: Bravery');
					}
					return null;
				}
			},
			onAllyTryHitSide: function(target, source, move) {
				if (target === this.effectData.target || target.side !== source.side) return;
				if (move.type === 'Dark') {
					this.boost({
						atk: 1
					}, this.effectData.target);
				}
			},
			id: "bravery",
			name: "Bravery",
			rating: 3.5,
		},
		"hiddensoul": {
			shortDesc: "This Pokemon's Special Defense is raised by 1 stage after it is damaged by a move.",
			onAfterDamage: function(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
					this.boost({
						spd: 1
					});
				}
			},
			id: "hiddensoul",
			name: "Hidden Soul",
			rating: 2,
		},
		"frostborn": {
			shortDesc: "This Pokemon's Attack is raised 1 stage if hit by an Ice move; Ice immunity.",
			onTryHitPriority: 1,
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Ice') {
					if (!this.boost({
							atk: 1
						})) {
						this.add('-immune', target, '[msg]', '[from] ability: Frostborn');
					}
					return null;
				}
			},
			onAllyTryHitSide: function(target, source, move) {
				if (target === this.effectData.target || target.side !== source.side) return;
				if (move.type === 'Ice') {
					this.boost({
						atk: 1
					}, this.effectData.target);
				}
			},
			id: "frostborn",
			name: "Frostborn",
			rating: 3.5,
		},
		"lucky": {
			shortDesc: "This mons attacks always crit unless Lucky Shield, shell armour or battle armour are active.",
			onModifyCritRatio: function(critRatio) {
				return critRatio + 6;
			},
			id: "lucky",
			name: "Lucky",
			rating: 3.5,
		},
		"unbreakable": {
			shortDesc: "This Pokemon is immune to punch-based moves.",
			onTryHit: function(target, source, move) {
				if (move.flags['punch']) {
					this.add('-immune', target, '[msg]', '[from] ability: Unbreakable');
					return null;
				}
			},
			onAllyTryHitSide: function(target, source, move) {
				if (move.flags['punch']) {
					this.add('-immune', this.effectData.target, '[msg]', '[from] ability: Unbreakable');
				}
			},
			id: "unbreakable",
			name: "Unbreakable",
			rating: 2,
		},
		"lucky": {
			shortDesc: "This mons attacks always crit unless Lucky Shield, shell armour or battle armour are active.",
			onModifyCritRatio: function(critRatio) {
				return critRatio + 6;
			},
			id: "lucky",
			name: "Lucky",
		},
		"reaperslice": { /* Make the 1.2 somehow 1.3 + Add the infiltrating effect*/
			desc: "Ghost type moves can bypass Subsitutes, they have also x1.3 power",
			shortDesc: "Ghost type moves can bypass Subsitutes, they have also x1.3 power",
			onModifyMovePriority: -1,
			onModifyMove: function(move, pokemon) {
				if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
					move.type = 'Ghost';
					move.refrigerateBoosted = true;
				}
			},
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
			},
			id: "reaperslice",
			name: "Reaper Slice",
			rating: 4,
		},
		// Eeveed End
		// FE Start
		"turnabouttorrent": {
			desc: "When this Pokemon has 1/3 or more of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage. Stat changes are reversed",
			onBoost: function(boost) {
				for (var i in boost) {
					boost[i] *= -1;
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Water' && attacker.hp >= attacker.maxhp / 3) {
					this.debug('Turnabout Torrent boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Water' && attacker.hp >= attacker.maxhp / 3) {
					this.debug('Turnabout Torrent boost');
					return this.chainModify(1.5);
				}
			},
			id: "turnabouttorrent",
			name: "Turnabout Torrent",
			rating: 2,
			num: 192
		},
		"intimidatingscales": {
			desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
			shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
			onStart: function(pokemon) {
				var foeactive = pokemon.side.foe.active;
				var activated = false;
				for (var i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate');
						activated = true;
					}
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			},
			onModifyDefPriority: 6,
			onModifyDef: function(def, pokemon) {
				if (pokemon.status) {
					return this.chainModify(1.5);
				}
			},
			id: "intimidatingscales",
			name: "Intimidating Scales",
			rating: 3.5,
			num: 193
		},
		"hugetorrent": {
			desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Water attacks do 1.5x damage.",
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (attacker.hp <= attacker.maxhp / 3) {
					this.debug('Torrent boost');
					return this.chainModify(2);
				}
			},
			id: "hugetorrent",
			name: "Huge Torrent",
			rating: 2,
			num: 194
		},
		"intenserivalry": {
			desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender or multiplied by 0.75 against targets of the opposite gender. There is no modifier if either this Pokemon or the target is genderless.",
			shortDesc: "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender.",
			onStart: function(pokemon) {
				this.add('-ability', pokemon, 'Intense Rivalry');
			},
			onModifyMove: function(move) {
				move.ignoreAbility = true;
			},
			onBasePower: function(basePower, attacker, defender, move) {
				if (attacker.gender && defender.gender) {
					if (attacker.gender === defender.gender) {
						this.debug('Intense Rivalry boost');
						return this.chainModify(1.25);
					} else {
						this.debug('Intense Rivalry weaken');
						return this.chainModify(0.75);
					}
				}
			},
			id: "intenserivalry",
			name: "Intense Rivalry",
			rating: 0.5,
			num: 196
		},
		"intimidateveil": {
			desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
			shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
			onStart: function(pokemon) {
				var foeactive = pokemon.side.foe.active;
				var activated = false;
				for (var i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate');
						activated = true;
					}
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'sandstorm') return false;
			},
			onModifyAccuracy: function(accuracy) {
				if (typeof accuracy !== 'number') return;
				if (this.isWeather('sandstorm')) {
					this.debug('Sand Veil - decreasing accuracy');
					return accuracy * 0.8;
				}
			},
			id: "intimidateveil",
			name: "Intimidateveil",
			rating: 3.5,
			num: 197
		},
		"levipoison": {
			desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
			shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
			onImmunity: function(type) {
				if (type === 'Ground') return false;
				/* Levipoison (Levitate+Poison Point) - If this Pokémon is hit with a Ground-type attack, the attacker is poisoned. Grants the Pokémon with this ability an immunity to ground */
			},
			id: "levipoison",
			name: "Levipoison",
			rating: 3.5,
			num: 198,
		},
		"unburden": {
			desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
			shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
			onAfterUseItem: function(item, pokemon) {
				if (pokemon !== this.effectData.target) return this.boost({
					atk: 2,
					spe: 2
				});
				return this.boost({
					def: -1,
					spd: -1
				});
			},
			onTakeItem: function(item, pokemon) {
				return this.boost({
					atk: 2,
					spe: 2
				});
				return this.boost({
					def: -1,
					spd: -1
				});
			},
			id: "armorcast",
			name: "Armor Cast",
			rating: 3.5,
			num: 199
		},
		"obliviousabsorb": {
			desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while affected cures it.",
			shortDesc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability cures it.",
			onUpdate: function(pokemon) {
				if (pokemon.volatiles['attract']) {
					this.add('-activate', pokemon, 'ability: Oblivious');
					pokemon.removeVolatile('attract');
					this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
				}
				if (pokemon.volatiles['taunt']) {
					this.add('-activate', pokemon, 'ability: Oblivious');
					pokemon.removeVolatile('taunt');
					// Taunt's volatile already sends the -end message when removed
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'attract') {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Oblivious');
					return null;
				}
			},
			onTryHit: function(pokemon, target, move) {
				if (move.id === 'captivate' || move.id === 'taunt') {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Oblivious');
					this.heal(target.maxhp / 8);
					return null;
				}
			},
			id: "obliviousabsorb",
			name: "Oblivious Absorb",
			rating: 1,
			num: 200
		},
		"fear": {
			desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
			shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
			onDamage: function(damage, target, source, effect) {
				if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
			},
			onStart: function(pokemon) {
				var foeactive = pokemon.side.foe.active;
				var activated = false;
				for (var i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate');
						activated = true;
					}
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			},
			id: "fear",
			name: "FEAR",
			rating: 3,
			num: 201,
		},
		"cactuspower": {
			shortDesc: "On switch-in, this Pokemon summons Sandstorm.",
			onStart: function(source) {
				this.setWeather('sandstorm');
			},
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					this.debug('Overgrow boost');
					return this.chainModify(1.5);
				}
			},
			id: "cactuspower",
			name: "Cactus Power",
			rating: 4.5,
			num: 202
		},
		"snowforce": {
			desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
			shortDesc: "This Pokemon's Ice attacks do 1.3x in Hail; immunity to it.",
			onBasePowerPriority: 8,
			onBasePower: function(basePower, attacker, defender, move) {
				if (this.isWeather('hail')) {
					if (move.type === 'Ice') {
						this.debug('Snow Force boost');
						return this.chainModify([0x14CD, 0x1000]);
					}
				}
			},
		},
		"sandyskin": {
			desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
			shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual: function(pokemon) {
				if (pokemon.status && this.isWeather(['sandstorm'])) {
					this.debug('hydration');
					this.add('-activate', pokemon, 'ability: Hydration');
					pokemon.cureStatus();
				}
			},
			id: "sandyskin",
			name: "Sandy Skin",
			rating: 2,
			num: 203
		},
		"technicutter": {
			desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
			shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
			onBasePowerPriority: 8,
			onBasePower: function(basePower, attacker, defender, move) {
				if (basePower <= 60) {
					this.debug('Technician boost');
					return this.chainModify(1.5);
				}
			},
			onBoost: function(boost, target, source, effect) {
				if (source && target === source) return;
				if (boost['atk'] && boost['atk'] < 0) {
					boost['atk'] = 0;
					if (!effect.secondaries) this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
				}
			},
			id: "technicutter",
			name: "Technicutter",
			rating: 4,
			num: 204
		},
		"chlorovolt": {
			shortDesc: "If Electric Terrain is active, this Pokemon's Speed is multiplied by 1.5.",
			onModifySpePriority: 6,
			onModifySpe: function(pokemon) {
				if (this.isTerrain('electricterrain')) return this.chainModify(1.5);
			},
			id: "chlorvolt",
			name: "Chloro Volt",
			rating: 0.5,
			num: 205
		},
		"healingfat": {
			desc: "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
			shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
			onDamage: function(damage, target, source, effect) {
				if (effect.id === 'brn' || effect.id === 'frz') {
					this.heal(target.maxhp / 8);
					return false;
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, pokemon) {
				if (pokemon.status) {
					return this.chainModify(1.5);
				}
			},
			onUpdate: function(pokemon) {
				if (pokemon.status === 'frz') {
					this.add('-activate', pokemon, 'ability: Immunity');
					pokemon.cureStatus();
				}
			},
			id: "healingfat",
			name: "Healing Fat",
			rating: 4,
			num: 206
		},
		"mummyfortitude": {
			desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
			shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
			onTryHit: function(pokemon, target, move) {
				if (move.ohko) {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
					return null;
				}
			},
			onDamagePriority: -100,
			onDamage: function(damage, target, source, effect) {
				if (source.ability === 'mummy' && damage >= target.hp && effect && effect.effectType === 'Move') {
					this.add('-activate', target, 'Sturdy');
					return target.hp - 1;
				}
			},
			id: "mummmyfortitude",
			name: "Mummy Fortitude",
			rating: 3,
			num: 207
		},
		"blazingbody": {
			desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
			shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
			onTryHit: function(pokemon, target, move) {
				if (move.ohko) {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
					return null;
				}
			},
			onDamagePriority: -100,
			onDamage: function(damage, target, source, effect) {
				if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
					this.add('-ability', target, 'Sturdy');
					return target.hp - 1;
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Blaze boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Blaze boost');
					return this.chainModify(1.5);
				}
			},
			id: "blazingbody",
			name: "blazing body",
			rating: 3,
			num: 208
		},
		"staticstorm": {
			desc: "If Hail is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Hail.",
			shortDesc: "If Hail is active, this Pokemon heals 1/16 of its max HP each turn; immunity to Hail.",
			onWeather: function(target, source, effect) {
				if (effect.id === 'hail') {
					this.heal(target.maxhp / 16);
				}
			},
			onAfterDamage: function(damage, target, source, effect) {
				if (this.random(10) < 3) {
					source.trySetStatus('par', target, effect);
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'hail') return false;
			},
			id: "staticstorm",
			name: "static storm",
			rating: 1.5,
			num: 209
		},
		"dreadedflames": {
			desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
			shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
			onStart: function(pokemon) {
				var foeactive = pokemon.side.foe.active;
				var activated = false;
				for (var i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate');
						activated = true;
					}
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
				} else {
					this.boost({
						atk: -1
					}, foeactive[i], pokemon);
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Blaze boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Blaze boost');
					return this.chainModify(1.5);
				}
			},
			id: "dreadedflames",
			name: "Dreaded Flames",
			rating: 3.5,
			num: 210
		},
		"rockygrowth": {
			desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
			shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
			onDamage: function(damage, target, source, effect) {
				if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (effect.id === 'recoil' && this.activeMove.id !== 'struggle' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Overgrow boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (effect.id === 'recoil' && this.activeMove.id !== 'struggle' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Overgrow boost');
					return this.chainModify(1.5);
				}
			},
			id: "rockygrowth",
			name: "Rocky Growth",
			rating: 3,
			num: 211
		},
		"pristine": {
			desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
			shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
			onTryHit: function(pokemon, target, move) {
				if (move.ohko) {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
					return null;
				}
			},
			onDamagePriority: -100,
			onDamage: function(damage, target, source, effect) {
				if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
					this.add('-ability', target, 'Sturdy');
					return target.hp - 1;
				}
			},
			onUpdate: function(pokemon) {
				if (pokemon.status === 'brn' || pokemon.status === 'frz' || pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'par' && target.hp === target.maxhp) {
					this.add('-activate', pokemon, 'ability: Water Veil');
					pokemon.cureStatus();
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'brn' || type === 'frz' || type === 'psn' || type === 'tox' || type === 'par' && target.hp === target.maxhp) return false;
			},
			id: "pristine",
			name: "Pristine",
			rating: 3,
			num: 212
		},
		"innerbody": {
			shortDesc: "This Pokemon cannot be made to flinch.",
			onFlinch: false,
			onAfterDamage: function(damage, target, source, move) {
				if (move && move.flags['contact']) {
					if (this.random(10) < 3) {
						source.trySetStatus('brn', target, move);
					}
				}
			},
			id: "innerbody",
			name: "Inner Body",
			rating: 1.5,
			num: 213
		},
		"intimidatingfangs": {
			shortDesc: "30% chance a Pokemon making contact with this Pokemon will be poisoned.",
			onAfterDamage: function(damage, target, source, move) {
				if (move && move.flags['contact']) {
					{
						var foeactive = pokemon.side.foe.active;
						var activated = false;
						for (var i = 0; i < foeactive.length; i++) {
							if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
							if (!activated) {
								this.add('-ability', pokemon, 'Intimidate');
								activated = true;
							}
						}
						if (foeactive[i].volatiles['substitute']) {
							this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
						} else {
							this.boost({
								atk: -1
							}, foeactive[i], pokemon);
						}
					}
				}
			},
			id: "intimidatingfangs",
			name: "Intimidating Fangs",
			rating: 2,
			num: 214
		},
		"intimidatingabsorption": {
			desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
			shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
			onStart: function(pokemon) {
				var foeactive = pokemon.side.foe.active;
				var activated = false;
				for (var i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Intimidate');
						activated = true;
					}
					if (foeactive[i].volatiles['substitute']) {
						this.add('-activate', foeactive[i], 'Substitute', 'ability: Intimidate', '[of] ' + pokemon);
					} else {
						this.boost({
							atk: -1
						}, foeactive[i], pokemon);
					}
				}
			},
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Water') {
					if (!this.heal(target.maxhp / 4)) {
						this.add('-immune', target, '[msg]', '[from] ability: Water Absorb');
					}
					return null;
				}
			},
			id: "intimidatingabsorption",
			name: "Intimidating Absorption",
			rating: 3.5,
			num: 215
		},
		"keenfeet": {
			desc: "This Pokemon's Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
			shortDesc: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe.",
			onAfterEachBoost: function(boost, target, source) {
				if (!source || target.side === source.side) {
					return;
				}
				var statsLowered = false;
				for (var i in boost) {
					if (boost[i] < 0) {
						statsLowered = true;
					}
				}
				if (statsLowered) {
					this.boost({
						evasion: 2
					});
				}
			},
			id: "keen feet",
			name: "keen feet",
			rating: 2.5,
			num: 216
		},
		"swiftabsorb": {
			desc: "This Pokemon is immune to water-type moves. The first time it is hit by a water-type move, its attacking stat is multiplied by 1.5 while using a water-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by water-type attacks.",
			shortDesc: "This Pokemon's water attacks do 1.5x damage if hit by one water move; water immunity.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'water') {
					move.accuracy = true;
					if (!target.addVolatile('swiftabsorb')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash water');
					}
					return null;
				}
			},
			onEnd: function(pokemon) {
				pokemon.removeVolatile('swiftabsorb');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function(target) {
					this.add('-start', target, 'ability: Swift Absorb');
				},
				onModifySpePriority: 5,
				onModifySpe: function(atk, attacker, defender, move) {
					this.debug('Flash water boost');
					return this.chainModify(2);
				},
				onEnd: function(target) {
					this.add('-end', target, 'ability: Flash water', '[silent]');
				}
			},
			id: "swiftabsorb",
			name: "Swift Absorb",
			rating: 3,
			num: 217
		},
		"mathsurge": {
			desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (attacker.hp <= attacker.maxhp / 3) {
					this.debug('Math surge');
					return this.chainModify(1.5);
				}
			},
			id: "mathsurge",
			name: "Math Surge",
			rating: 2,
			num: 218
		},
		"flameessence": {
			desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flame Essence');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flame Essence');
					return this.chainModify(1.5);
				}
			},
			id: "flameessence",
			name: "Flame Essence",
			rating: 2,
			num: 219
		},
		"naturalguard": {
			shortDesc: "Every move used by or against this Pokemon will always hit.",
			onAnyAccuracy: function(accuracy, target, source, move) {
				if (move && (source === this.effectData.target || pokemon.status === 'psn' || pokemon.status === 'tox' || pokemon.status === 'brn' || pokemon.status === 'frz' || pokemon.status === 'par')) {
					return true;
				}
				return accuracy;
			},
			onSwitchOut: function(pokemon) {
				pokemon.cureStatus();
			},
			id: "naturalguard",
			name: "Natural Guard",
			rating: 4,
			num: 220,
		},
		"stickylevitation": {
			shortDesc: "This Pokemon cannot lose its held item due to another Pokemon's attack.",
			onTakeItem: function(item, pokemon, source) {
				if (this.suppressingAttackEvents() && pokemon !== this.activePokemon) return;
				if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
					this.add('-activate', pokemon, 'ability: Sticky Hold');
					return false;
				}
			},
			onImmunity: function(type) {
				if (type === 'Ground') return false;
			},
			id: "stickylevitation",
			name: "Sticky Levitation",
			rating: 1.5,
			num: 221
		},
		"serenefire": {
			desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
			shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Fire') {
					move.accuracy = true;
					if (!target.addVolatile('flashfire')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
					}
					return null;
				}
			},
			onEnd: function(pokemon) {
				pokemon.removeVolatile('flashfire');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function(target) {
					this.add('-start', target, 'ability: Flash Fire');
				},
				onModifyMove: function(move) {
					if (!move || !move.type === 'Fire') return;
					if (!move.secondaries) {
						move.secondaries = [];
					}
					move.secondaries.push({
						chance: 100,
						status: 'brn'
					});
				},
				onEnd: function(target) {
					this.add('-end', target, 'ability: Flash Fire', '[silent]');
				}
			},
			id: "serenefire",
			name: "Serene Fire",
			rating: 3,
			num: 222,
		},
		"healingblaze": {
			desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Blaze boost');
					return this.chainModify(1.5);
					pokemon.cureStatus();
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
					this.debug('Blaze boost');
					return this.chainModify(1.5);
					pokemon.cureStatus();
				}
			},
			id: "healingblaze",
			name: "Healing Blaze",
			rating: 2,
			num: 223,
		},
		"barbstance": {
			desc: "If this Pokemon is an Ferroslash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
			shortDesc: "If Ferroslash, changes Forme to Blade before attacks and Shield before King's Shield.",
			onBeforeMovePriority: 11,
			onBeforeMove: function(attacker, defender, move) {
				if (attacker.template.baseSpecies !== 'Ferroslash') return;
				if (move.category === 'Status' && move.id !== 'kingsshield') return;
				var targetSpecies = (move.id === 'kingsshield' ? 'Ferroslash' : 'Ferroslash-Blade');
				if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
					this.add('-formechange', attacker, targetSpecies);
				}
			},
			id: "barbstance",
			name: "Barb Stance",
			rating: 5,
			num: 224,
		},
		"poweruppinch": {
			desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Fire attacks do 1.5x damage.",
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, attacker, defender, move) {
				if (attacker.hp <= attacker.maxhp / 5) {
					this.debug('Blaze boost');
					return this.chainModify(1.25);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (attacker.hp <= attacker.maxhp / 5) {
					this.debug('Blaze boost');
					return this.chainModify(1.25);
				}
			},
			id: "poweruppinch",
			name: "Power Up Pinch",
			rating: 2,
			num: 225
		},
		"electrotechnic": {
			desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
			shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
			onBasePowerPriority: 8,
			onBasePower: function(basePower, attacker, defender, move) {
				if (basePower <= 60) {
					this.debug('Technician boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function(spa, pokemon) {
				var allyActive = pokemon.side.active;
				if (allyActive.length === 1) {
					return;
				}
				for (var i = 0; i < allyActive.length; i++) {
					if (allyActive[i] && allyActive[i].position !== pokemon.position && !allyActive[i].fainted && allyActive[i].hasAbility(['minus', 'plus'])) {
						return this.chainModify(1.5);
					}
				}
			},
			id: "electrotechnic",
			name: "ElectroTechnic",
			rating: 4,
			num: 226
		},
		"speedbreak": {
			shortDesc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
			onBoost: function(boost) {
				boost.spe *= -1;
			},
			id: "speedbreak",
			name: "Speed Break",
			rating: 4,
			num: 227
		},
		"justicepower": {
			shortDesc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move.",
			onAfterDamage: function(damage, target, source, effect) {
				if (effect && effect.type === 'Dark') {
					this.boost({
						atk: 1
					});
				}
			},
			onDeductPP: function(damage, target, source, effect) {
				if (effect && effect.type === 'Dark') return;
				return 1;
			},
			id: "justicepower",
			name: "Justice Power",
			rating: 2,
			num: 228
		},
		"cursedtrace": {
			desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, and Zen Mode.",
			shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
			onUpdate: function(pokemon) {
				if (!pokemon.isStarted) return;
				let possibleTargets = [];
				for (let i = 0; i < pokemon.side.foe.active.length; i++) {
					if (pokemon.side.foe.active[i] && !pokemon.side.foe.active[i].fainted) possibleTargets.push(pokemon.side.foe.active[i]);
				}
				while (possibleTargets.length) {
					let rand = 0;
					if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
					let target = possibleTargets[rand];
					let ability = this.getAbility(target.ability);
					let bannedAbilities = {
						comatose: 1,
						disguise: 1,
						flowergift: 1,
						forecast: 1,
						illusion: 1,
						imposter: 1,
						multitype: 1,
						schooling: 1,
						stancechange: 1,
						trace: 1,
						zenmode: 1
					};
					if (bannedAbilities[target.ability]) {
						possibleTargets.splice(rand, 1);
						continue;
					}
					this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
					if (pokemon.setAbility(ability)) target.addVolatile('gastroacid');
					return;
				}
			},
			id: "cursedtrace",
			name: "cursed Trace",
			rating: 3,
			num: 229,
		},
		"sheerflight": {
			desc: "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed.",
			shortDesc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
			onImmunity: function(move, pokemon, type) {
				{
					if (move.secondaries) {
						if (type === 'Ground') return false;
					}
				}
			},
			onModifyMove: function(move, pokemon) {
				if (move.secondaries) {
					delete move.secondaries;
					// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
					pokemon.addVolatile('sheerforce');
				}
			},
			effect: {
				duration: 1,
				onBasePowerPriority: 8,
				onBasePower: function(basePower, pokemon, target, move) {
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			id: "sheerflight",
			name: "Sheer Flight",
			rating: 4,
			num: 230
		},
		"evaporation": {
			desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
			shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Water') {
					move.accuracy = true;
					if (!target.addVolatile('flashfire')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
					}
					return null;
				}
			},
			onEnd: function(pokemon) {
				pokemon.removeVolatile('flashfire');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function(target) {
					this.add('-start', target, 'ability: Flash Fire');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function(atk, attacker, defender, move) {
					if (move.type === 'Fire') {
						this.debug('Flash Fire boost');
						return this.chainModify(1.5);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function(atk, attacker, defender, move) {
					if (move.type === 'Fire') {
						this.debug('Flash Fire boost');
						return this.chainModify(1.5);
					}
				},
				onEnd: function(target) {
					this.add('-end', target, 'ability: Flash Fire', '[silent]');
				}
			},
		},
		"hardbody": {
			shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
			onBoost: function(boost, target, source, effect) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
				if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			},
			onModifySpe: function(spe, pokemon) {
				if (pokemon.status === 'par') {
					return this.chainModify(1.5);
				}
			},
			onModifyAtk: function(atk, pokemon) {
				if (pokemon.status === 'brn') {
					return this.chainModify(1.5);
				}
			},
			id: "hardbody",
			name: "Hard Body",
			rating: 2,
			num: 231
		},
		"gutbreaker": {
			shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
			onStart: function(pokemon) {
				this.add('-ability', pokemon, 'Mold Breaker');
			},
			stopAttackEvents: true,
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, pokemon) {
				if (pokemon.status) {
					return this.chainModify(1.5);
				}
			},
			id: "gutbreaker",
			name: "Gut Breaker",
			rating: 3.5,
			num: 232
		},
		"synchofloat": {
			desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
			shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
			onImmunity: function(type) {
				if (type === 'Ground') return false;
				let oldAbility = source.setAbility('levitate', source, 'levitate', true);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Levitate', oldAbility, '[of] ' + source);
				}
			},
			id: "synchofloat",
			name: "Synchofloat",
			rating: 3.5,
			num: 233
		},
		"magicianswand": {
			desc: "This Pokemon is immune to Electric-type moves and raises its Special Attack by 1 stage when hit by an Electric-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
			shortDesc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
			onTryHit: function(target) {
				if (target.hasAbility('stickyhold')) {
					this.add('-immune', target, '[msg]');
					return null;
				}
			},
			onHit: function(target, source, move) {
				if (target !== source && move.type === 'Electric') {
					var yourItem = target.takeItem(source);
					var myItem = source.takeItem();
					if (target.item || source.item || (!yourItem && !myItem) || (myItem.onTakeItem && myItem.onTakeItem(myItem, target) === false)) {
						if (yourItem) target.item = yourItem;
						if (myItem) source.item = myItem;
						return false;
					}
					this.add('-activate', source, 'move: Trick', '[of] ' + target);
					if (myItem) {
						target.setItem(myItem);
						this.add('-item', target, myItem, '[from] Trick');
					}
					if (yourItem) {
						source.setItem(yourItem);
						this.add('-item', source, yourItem, '[from] Trick');
					}
				}
			},
			id: "magicianswand",
			name: "Magician's Wand",
			rating: 3.5,
			num: 234
		},
		"cleanmatch": {
			desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
			shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
			onModifySpe: function(spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(1.5);
				}
			},
			onModifyAtk: function(atk, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(1.5);
				}
			},
			id: "cleanmatch",
			name: "cleanmatch",
			rating: 3.5,
			num: 235
		},
		"positivegrowth": {
			desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
			shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Bug attacks do 1.5x damage.",
			onModifySpAPriority: 5,
			onModifySpA: function(atk, attacker, defender, move) {
				if (attacker.hp <= attacker.maxhp / 3) {
					this.debug('Math surge');
					return this.chainModify(1.5);
				}
			},
			id: "positive growth",
			name: "Positive Growth",
			rating: 2,
			num: 236
		},
		"errormacro": {
			desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
			shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
			getCategory: function(move) {
				move = this.getMove(move);
				if (move.category === 'Status') return 'Status';
				if (move.category === 'Physical') return 'Special';
				return 'Physical';
			},
			onBeforeMovePriority: 11,
			onBeforeMove: function(attacker, defender, move) {
				if (attacker.template.baseSpecies !== 'Aegislash') return;
				if (move.category === 'Status' && move.id !== 'kingsshield') return;
				var targetSpecies = (move.id === 'kingsshield' ? 'Aegilene' : 'Aegislash-Saber');
				if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
					this.add('-formechange', attacker, targetSpecies);
				}
			},
			id: "errormacro",
			name: "Error Macro",
			rating: 5,
			num: 238
		},
		"latebloomer": {
			desc: "The power of this Pokemon's move is multiplied by 1.3 if it is the last to move in a turn. Does not affect Doom Desire and Future Sight.",
			shortDesc: "This Pokemon's attacks have 1.3x power if it is the last to move in a turn.",
			OnAfterDamagePriority: 8,
			onAfterDamage: function(damage, attacker, defender, move) {
				if (!this.willMove(defender)) {
					if (this.random(10) < 3) {
						source.addVolatile('attract', target);
					}
				}
			},
			id: "latebloomer",
			name: "Late Bloomer",
			rating: 2,
			num: 239
		},
		"sturdytempo": {
			desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
			shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
			onUpdate: function(pokemon) {
				if (pokemon.volatiles['confusion']) {
					pokemon.removeVolatile('confusion');
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'confusion') {
					this.add('-immune', pokemon, 'confusion');
					return false;
				}
			},
			onTryHit: function(pokemon, target, move) {
				if (move.ohko) {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy');
					return null;
				}
			},
			onDamagePriority: -100,
			onDamage: function(damage, target, source, effect) {
				if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
					this.add('-ability', target, 'Sturdy');
					return target.hp - 1;
				}
			},
			id: "sturdytempo",
			name: "Sturdy Tempo",
			rating: 3,
			num: 240
		},
		"tangledflames": {
			desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
			shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Fire') {
					move.accuracy = true;
					if (!target.addVolatile('flashfire')) {
						this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
					}
					return null;
				}
			},
			onEnd: function(pokemon) {
				pokemon.removeVolatile('flashfire');
			},
			effect: {
				noCopy: true, // doesn't get copied by Baton Pass
				onStart: function(target) {
					this.add('-start', target, 'ability: Flash Fire');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function(atk, target, attacker, defender, move) {
					if (move.type === 'Fire' || target && target.volatiles['confusion']) {
						this.debug('Flash Fire boost');
						return this.chainModify(2);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function(atk, attacker, defender, move) {
					if (move.type === 'Fire' || target && target.volatiles['confusion']) {
						this.debug('Flash Fire boost');
						return this.chainModify(2);
					}
				},
				onEnd: function(target) {
					this.add('-end', target, 'ability: Flash Fire', '[silent]');
				}
			},
			id: "tangledflames",
			name: "Tangled Flames",
			rating: 3,
			num: 241
		},
		"hydrostream": {
			shortDesc: "On switch-in, this Pokemon summons Rain Dance.",
			onStart: function(source) {
				this.setWeather('raindance');
			},
			id: "hydrostream",
			name: "Hydro Stream",
			rating: 4.5,
			num: 242
		},
		"hydrate": {
			desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
			shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
			onModifyMovePriority: -1,
			onModifyMove: function(move, pokemon) {
				if (move.type === 'Normal' && move.id !== 'naturalgift') {
					move.type = 'Water';
					if (move.category !== 'Status') pokemon.addVolatile('refrigerate');
				}
			},
			effect: {
				duration: 1,
				onBasePowerPriority: 8,
				onBasePower: function(basePower, pokemon, target, move) {
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			id: "hydrate",
			name: "Hydrate",
			rating: 4,
			num: 243
		},
		"breaker": {
			shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
			onStart: function(pokemon) {
				this.add('-ability', pokemon, 'Mold Breaker');
			},
			stopAttackEvents: true,
			onBoost: function(boost, target, source, effect) {
				for (var i in boost) {
					if (boost[i] < 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			},
			onAnyModifyBoost: function(boosts, target) {
				var source = this.effectData.target;
				if (source === target) return;
				if (source === this.activePokemon && target === this.activeTarget) {
					boosts['def'] = 0;
					boosts['spd'] = 0;
					boosts['evasion'] = 0;
				}
				if (target === this.activePokemon && source === this.activeTarget) {
					boosts['atk'] = 0;
					boosts['spa'] = 0;
					boosts['accuracy'] = 0;
				}
			},
			id: "breaker",
			name: "Breaker",
			rating: 2,
			num: 244
		},
		"hammerspace": {
			shortDesc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
			onSwitchOut: function(pokemon) {
				pokemon.setItem(pokemon.lastItem);
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Hammer Space');
			},
			id: "hammer space",
			name: "Hammer Space",
			rating: 4,
			num: 245
		},
		"sereneeyes": {
			shortDesc: "This Pokemon's moves have their secondary effect chance doubled.",
			onModifyMovePriority: -2,
			onModifyMove: function(move) {
				if (move.secondaries && move.id !== 'secretpower') {
					this.debug('doubling secondary chance');
					move.accuracy *= 2;
				}
			},
			id: "sereneeyes",
			name: "Serene Eyes",
			rating: 4,
			num: 246
		},
		"leafstream": {
			shortDesc: "On switch-in, this Pokemon summons Sunny Day.",
			onStart: function(source) {
				this.setWeather('sunnyday');
			},
			id: "leafstream",
			name: "LeafStream",
			rating: 4.5,
			num: 247
		},
		"cybercriminal": {
			desc: "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
			shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
			onSourceFaint: function(target, source, effect) {
				if (effect && effect.effectType === 'Move') {
					this.boost({
						spa: 1
					}, source);
				}
			},
			id: "cybercriminal",
			name: "Cyber Criminal",
			rating: 3.5,
			num: 248
		},
		"underpressure": {
			desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
			shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual: function(pokemon) {
				if (pokemon.status) {
					this.debug('under pressure');
					this.add('-activate', pokemon, 'ability: Hydration');
					pokemon.cureStatus();
				}
			},
			onStart: function(pokemon) {
				this.add('-ability', pokemon, 'Pressure');
			},
			onDeductPP: function(target, source) {
				if (target.side === source.side) return;
				return 1;
			},
			id: "underpressure",
			name: "Under Pressure",
			rating: 2,
			num: 250
		},
		"naturaleye": {
			desc: "All non-damaging moves that check accuracy have their accuracy changed to 50% when used on this Pokemon. This change is done before any other accuracy modifying effects.",
			shortDesc: "Status moves with accuracy checks are 50% accurate when used on this Pokemon.",
			onModifyAccuracyPriority: 10,
			onModifyAccuracy: function(accuracy, target, source, move) {
				if (move.category === 'Status' && typeof move.accuracy === 'number') {
					this.debug('Wonder Skin - setting accuracy to 50');
					return 0;
				}
			},
			id: "naturaleye",
			name: "Natural Eye",
			rating: 2,
			num: 251
		},
		"overwhelmingpresence": {
			shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
			onStart: function(pokemon) {
				this.add('-start', pokemon, 'Embargo');
				this.add('-endability', pokemon);
				this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid')
			},
			// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
			// Ability suppression implemented in BattlePokemon.ignoringAbility() within battle-engine.js
			onResidualOrder: 18,
			onEnd: function(pokemon) {
				this.add('-end', pokemon, 'Embargo');
			},
			id: "overwhelmingpresence",
			name: "Overwhelming Presence",
			rating: 3.5,
			num: 252
		},
		"monsoon": {
			desc: "If this Pokemon is a Casting, its type changes to the current weather condition's type, except Sandstorm.",
			shortDesc: "Casting's secondary type changes to the current weather condition's type, except Sandstorm.",
			onUpdate: function(pokemon) {
				if (pokemon.baseTemplate.species !== 'Casting' || pokemon.transformed) return;
				var forme = null;
				switch (this.effectiveWeather()) {
					case 'sunnyday':
					case 'desolateland':
						if (pokemon.template.speciesid !== 'castingsunny') forme = 'Casting-Sunny';
						break;
					case 'raindance':
					case 'primordialsea':
						if (pokemon.template.speciesid !== 'castingrainy') forme = 'Casting-Rainy';
						break;
					case 'hail':
						if (pokemon.template.speciesid !== 'castingsnowy') forme = 'Casting-Snowy';
						break;
					default:
						if (pokemon.template.speciesid !== 'casting') forme = 'Casting';
						break;
				}
				if (pokemon.isActive && forme) {
					pokemon.formeChange(forme);
					this.add('-formechange', pokemon, forme, '[msg]');
				}
			},
			id: "monsoon",
			name: "Monsoon",
			rating: 3,
			num: 253
		},
		"monsoonaltered": {
			desc: "If this Pokemon is a Casting, its type changes to the current weather condition's type, except Sandstorm.",
			shortDesc: "Casting's secondary type changes to the current weather condition's type, except Sandstorm.",
			onUpdate: function(pokemon) {
				if (pokemon.baseTemplate.species !== 'Casting' || pokemon.transformed) return;
				var forme = null;
				switch (this.effectiveWeather()) {
					case 'sunnyday':
					case 'desolateland':
						if (pokemon.template.speciesid !== 'castingsunny') forme = 'Casting-Sunny';
						break;
					case 'raindance':
					case 'primordialsea':
						if (pokemon.template.speciesid !== 'castingrainy') forme = 'Casting-Rainy';
						break;
					case 'hail':
						if (pokemon.template.speciesid !== 'castingicy') forme = 'Casting-Icy';
						break;
					default:
						if (pokemon.template.speciesid !== 'casting') forme = 'Casting';
						break;
				}
				if (pokemon.isActive && forme) {
					pokemon.formeChange(forme);
					this.add('-formechange', pokemon, forme, '[msg]');
				}
			},
			onImmunity: function(type) {
				if (type === 'Ground') return false;
			},
			id: "monsoonaltered",
			name: "Monsoon-Altered",
			rating: 3,
			num: 254
		},
		"justifiedfire": {
			desc: "Raises user's Special Attack when hit with a Fire-type attack. Grants immunity to Fire.",
			shortDesc: "Raises user's Special Attack when hit with a Fire-type attack. Grants immunity to Fire.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Fire') {
					if (!this.boost({
							spa: 1
						})) {
						this.add('-immune', target, '[msg]', '[from] ability: Justified Fire');
					}
					return null;
				}
			},
			onAnyRedirectTarget: function(target, source, source2, move) {
				if (move.type !== 'Fire' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
				if (this.validTarget(this.effectData.target, source, move.target)) {
					if (this.effectData.target !== target) {
						this.add('-activate', this.effectData.target, 'ability: Justified Fire');
					}
					return this.effectData.target;
				}
			},
			id: "justifiedfire",
			name: "Justified Fire",
			rating: 3.5,
			num: 32,
		},
		"sturdytempo": {
			desc: "Sturdy + Own Tempo.",
			shortDesc: "Sturdy + Own Tempo",
			onTryHit: function(pokemon, target, move) {
				if (move.ohko) {
					this.add('-immune', pokemon, '[msg]', '[from] ability: Sturdy Tempo');
					return null;
				}
			},
			onDamagePriority: -100,
			onDamage: function(damage, target, source, effect) {
				if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
					this.add('-ability', target, 'Sturdy');
					return target.hp - 1;
				}
			},
			onUpdate: function(pokemon) {
				if (pokemon.volatiles['confusion']) {
					this.add('-activate', pokemon, 'ability: Sturdy Tempo');
					pokemon.removeVolatile('confusion');
				}
			},
			onTryAddVolatile: function(status, pokemon) {
				if (status.id === 'confusion') return null;
			},
			onHit: function(target, source, move) {
				if (move && move.volatileStatus === 'confusion') {
					this.add('-immune', target, 'confusion', '[from] ability: Sturdy Tempo');
				}
			},
			id: "sturdytempo",
			name: "Sturdy Tempo",
		},
		"hydrostream": {
			shortDesc: "On switch-in, this Pokemon summons Rain Dance.",
			onStart: function(source) {
				for (let i = 0; i < this.queue.length; i++) {
					if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'kyogre') return;
					if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
				}
				this.setWeather('raindance');
			},
			id: "hydrostream",
			name: "Hydro Stream",
		},
		"hydrate": {
			desc: "This Pokemon's Normal-type moves become Water-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
			shortDesc: "This Pokemon's Normal-type moves become Water type and have 1.2x power.",
			onModifyMovePriority: -1,
			onModifyMove: function(move, pokemon) {
				if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
					move.type = 'Water';
					move.refrigerateBoosted = true;
				}
			},
			onBasePowerPriority: 8,
			onBasePower: function(basePower, pokemon, target, move) {
				if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
			},
			id: "hydrate",
			name: "Hydrate",
			rating: 4,
			num: 174,
		},
		"leafstream": {
			shortDesc: "On switch-in, this Pokemon summons Sunny Day.",
			onStart: function(source) {
				for (let i = 0; i < this.queue.length; i++) {
					if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'groudon') return;
					if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
				}
				this.setWeather('sunnyday');
			},
			id: "leafstream",
			name: "Leaf Stream",
		},
		"cybercriminal": {
			desc: "This Pokemon's Special Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
			shortDesc: "This Pokemon's Special Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
			onSourceFaint: function(target, source, effect) {
				if (effect && effect.effectType === 'Move') {
					this.boost({
						atk: 1
					}, source);
				}
			},
			id: "cybercriminal",
			name: "Cyber Criminal",
			rating: 3.5,
			num: 153,
		},
		"cleartempo": {
			shortDesc: "Immune to stat drops and confusion.",
			onUpdate: function(pokemon) {
				if (pokemon.volatiles['confusion']) {
					this.add('-activate', pokemon, 'ability: Clear Tempo');
					pokemon.removeVolatile('confusion');
				}
			},
			onTryAddVolatile: function(status, pokemon) {
				if (status.id === 'confusion') return null;
			},
			onHit: function(target, source, move) {
				if (move && move.volatileStatus === 'confusion') {
					this.add('-immune', target, 'confusion', '[from] ability: Clear Tempo');
				}
			},
			onBoost: function(boost, target, source, effect) {
				if (source && target === source) return;
				let showMsg = false;
				for (let i in boost) {
					if (boost[i] < 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Tempo", "[of] " + target);
			},
			id: "cleartempo",
			name: "Clear Tempo",
		},
		"sandyeyes": {
			desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
			shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.3x in Sandstorm; immunity to it.",
			onSourceModifyAccuracy: function(accuracy) {
				if (this.isWeather('sandstorm')) {
					if (typeof accuracy !== 'number') return;
					this.debug('sandyeyes - enhancing accuracy');
					return accuracy * 1.3;
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'sandstorm') return false;
			},
			id: "sandyeyes",
			name: "Sandy Eyes",
		},
		"sharparmor": {
			shortDesc: "Atk is raised by 2 when hit by a Water-type move and lowered by 2 when hit by a Fire-type; gives immunity to Water-type moves.",
			onAfterDamage: function(damage, target, source, effect) {
				if (effect && effect.type === 'Water') {
					this.boost({
						atk: 2
					});
				}
			},
			onAfterDamage: function(damage, target, source, effect) {
				if (effect && effect.type === 'Fire') {
					this.boost({
						atk: -2
					});
				}
			},
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Water') {
					move.accuracy = true;
					if (!target.addVolatile('sharparmor')) {
						this.add('-immune', target, '[msg]', '[from] ability: Sharp Armor');
					}
					return null;
				}
			},
			id: "sharparmor",
			name: "Sharp Armor",
		},
		"dreamcrusher": {
			shortDesc: "The user deals 2x damage to sleeping targets.",
			onModifyDamage: function(damage, source, target, move) {
				if (pokemon.status && pokemon.status == 'slp') {
					this.debug('Dream Crusher boost');
					return this.chainModify(2);
				}
			},
			id: "dreamcrusher",
			name: "Dream Crusher",
		},
		"desertsnow": {
			desc: "This pokemon's Ground/Rock/Steel/Ice attacks do 1.3x in Sandstorm and Hail, opposing attacks of those types heal by 1/16 under the same weather conditions.",
			shortDesc: "This pokemon's Ground/Rock/Steel/Ice attacks do 1.3x in Sandstorm and Hail, opposing attacks of those types heal by 1/16 under the same weather conditions.",
			onBasePowerPriority: 8,
			onBasePower: function(basePower, attacker, defender, move) {
				if (this.isWeather('hail')) {
					if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel' || move.type === 'Ice') {
						this.debug('Desert Snow boost');
						return this.chainModify([0x14CD, 0x1000]);
					}
				}
			},
			onImmunity: function(type, pokemon) {
				if (type === 'sandstorm') return false;
			},
			onTryHit: function(target, source, move) {
				if (this.isWeather('hail')) {
					if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel' || move.type === 'Ice') {
						if (!this.heal(target.maxhp / 16)) {
							this.add('-immune', target, '[msg]', '[from] ability: Desert Snow');
						}
					}
					return null;
				}
			},
			id: "desertsnow",
			name: "Desert Snow",
		},
		"magicbreak": {
			shortDesc: "This Pokemon's attacks ignore the effects of the opponent's items.",
			onStart: function(pokemon) {
				this.add('-ability', pokemon, 'Magic Break');
			},
			onModifyMove: function(move) {
				move.ignoreItem = true;
			},
			id: "magicbreak",
			name: "Magic Break",
		},
		"raptorhead": {
			desc: "Prevents recoil damage and Attack reduction.",
			shortDesc: "Prevents recoil damage and Attack reduction.",
			onDamage: function(damage, target, source, effect) {
				if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
			},
			onBoost: function(boost, target, source, effect) {
				if (source && target === source) return;
				if (boost['atk'] && boost['atk'] < 0) {
					delete boost['atk'];
					if (!effect.secondaries) this.add("-fail", target, "unboost", "Attack", "[from] ability: Raptor Head", "[of] " + target);
				}
			},
			id: "raptorhead",
			name: "Raptor Head",
		},
		"steadfastluck": {
			shortDesc: "When this Fusion Evolution flinches, its speed and critical hit ratio are raised by 1 stage.",
			onFlinch: function(pokemon) {
				this.boost({
					spe: 1,
					critRatio: 1
				});
			},
			id: "steadfastluck",
			name: "Steadfast Luck",
		},
		"thunderousembers": {
			desc: "Raises Special Attack by 1.5x when hit by a fire attack move; immunity to fire attacks.",
			shortDesc: "Raises Special Attack by 1.5x when hit by a fire attack move; immunity to fire attacks.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Fire') {
					if (!this.boost({
							spa: 1
						})) {
						this.add('-immune', target, '[msg]', '[from] ability: Thunderous Embers');
					}
					return null;
				}
			},
			onAnyRedirectTarget: function(target, source, source2, move) {
				if (move.type !== 'Fire' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
				if (this.validTarget(this.effectData.target, source, move.target)) {
					if (this.effectData.target !== target) {
						this.add('-activate', this.effectData.target, 'ability: Thunderous Embers');
					}
					return this.effectData.target;
				}
			},
			id: "thunderousembers",
			name: "Thunderous Embers",
		},
		"torrentialvoltage": {
			desc: "Electric immunity, and when hit by an Electric-type move, this Pokemon's Electric moves gain a 50% power boost.",
			shortDesc: "Electric immunity, and when hit by an Electric-type move, this Pokemon's Electric moves gain a 50% power boost.",
			onTryHit: function(target, source, move) {
				if (target !== source && move.type === 'Electric') {
					move.accuracy = true;
					if (!target.addVolatile('torrentialvoltage')) {
						this.add('-immune', target, '[msg]', '[from] ability: Torrential Voltage');
					}
					return null;
				}
			},
			onEnd: function(pokemon) {
				pokemon.removeVolatile('torrentialvoltage');
			},
			effect: {
				noCopy: true,
				onStart: function(target) {
					this.add('-start', target, 'ability: Torrential Voltage');
				},
				onModifyAtkPriority: 5,
				onModifyAtk: function(atk, attacker, defender, move) {
					if (move.type === 'Electric') {
						this.debug('Torrential Voltage boost');
						return this.chainModify(1.5);
					}
				},
				onModifySpAPriority: 5,
				onModifySpA: function(atk, attacker, defender, move) {
					if (move.type === 'Electric') {
						this.debug('Torrential Voltage boost');
						return this.chainModify(1.5);
					}
				},
				onEnd: function(target) {
					this.add('-end', target, 'ability: Torrential Voltage', '[silent]');
				},
			},
			id: "torrentialvoltage",
			name: "Torrential Voltage",
		},
		"seamonster": {
			desc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
			shortDesc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
			onStart: function(pokemon) {
				let foeactive = pokemon.side.foe.active;
				let activated = false;
				for (let i = 0; i < foeactive.length; i++) {
					if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
					if (!activated) {
						this.add('-ability', pokemon, 'Sea Monster', 'boost');
						activated = true;
					}
					if (foeactive[i].volatiles['substitute']) {
						this.add('-immune', foeactive[i], '[msg]');
					} else {
						this.boost({
							atk: -1
						}, foeactive[i], pokemon);
					}
				}
			},
			onBasePower: function(basePower, user, target, move) {
				if (move.type === 'Water') {
					return this.chainModify([0x1333, 0x1000]);
				}
			},
			id: "seamonster",
			name: "Sea Monster",
		},
		"sereneeyes": {
			shortDesc: "Moves with secondary effect chances have their accuracy doubled.",
			onModifyMovePriority: -2,
			onModifyMove: function(move) {
				if (move.secondaries) {
					return accuracy * 1.3;
				}
			},
			id: "sereneeyes",
			name: "Serene Eyes",
		},
		"fromashes": {
			desc: "If the Pokémon is burned, it will gain 1/8 of its maximum HP at the end of each turn instead of taking damage. The Pokémon with this Ability does not lose Attack due to burn.",
			shortDesc: "If the Pokémon is burned, it will gain 1/8 of its maximum HP at the end of each turn instead of taking damage. The Pokémon with this Ability does not lose Attack due to burn.",
			onDamage: function(damage, target, source, effect) {
				if (effect.id === 'brn') {
					this.heal(target.maxhp / 8);
					return false;
				}
			},
			id: "fromashes",
			name: "From Ashes",
		},
		/*slowandsteady: {
			shortDesc: "This Pokemon takes 1/2 damage from attacks if it moves last.",
			onModifyDamage: function (damage, source, target, move) {
				if (target.lastDamage > 0 && source.lastAttackedBy && source.lastAttackedBy.thisTurn && source.lastAttackedBy.pokemon === target) {
					return this.chainModify(0.5);
				}
			},
			id: "slowandsteady",
			name: "Slow And Steady",
		},*/
		/*"seamonster": {
		desc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
		shortDesc: "Lowers opponent's attack one stage upon switching in. Water-type attacks are boosted 10%.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Sea Monster', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: -1}, foeactive[i], pokemon);
				}
			}
		},
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.1);
		},
	},
		id: "seamonster",
		name: "Sea Monster",
	},

	
	"torrenttempo": {
		shortDesc: "If this Pokemon is confused, it snaps out of that confusion and gains a 50% boost to its Water-moves.",
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Torrent Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Torrent Tempo');
			}
		},
		id: "torrenttempo",
		name: "Torrent Tempo",
	},
    // FE End
	adaptability: {
		desc: "This Pokemon's moves that match one of its types have a same-type attack bonus (STAB) of 2 instead of 1.5.",
		shortDesc: "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5.",
		id: "adaptability",
		name: "Adaptability",
		rating: 4,
		num: 91
	},
	aftermath: {
		desc: "If this Pokemon is knocked out with a contact move, that move's user loses 1/4 of its maximum HP, rounded down. If any active Pokemon has the Ability Damp, this effect is prevented.",
		shortDesc: "If this Pokemon is KOed with a contact move, that move's user loses 1/4 its max HP.",
		id: "aftermath",
		name: "Aftermath",
		onAfterDamageOrder: 1,
		rating: 2.5,
		num: 106
	},
	aerilate: {
		desc: "This Pokemon's Normal-type moves become Flying-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Flying type and have 1.2x power.",
		onModifyMovePriority: -1,
		onBasePowerPriority: 8,
		id: "aerilate",
		name: "Aerilate",
		rating: 4,
		num: 185
	},
	airlock: {
		shortDesc: "While this Pokemon is active, the effects of weather conditions are disabled.",
		suppressWeather: true,
		id: "airlock",
		name: "Air Lock",
		rating: 2.5,
		num: 76
	},
	analytic: {
		desc: "The power of this Pokemon's move is multiplied by 1.3 if it is the last to move in a turn. Does not affect Doom Desire and Future Sight.",
		shortDesc: "This Pokemon's attacks have 1.3x power if it is the last to move in a turn.",
		onBasePowerPriority: 8,
		id: "analytic",
		name: "Analytic",
		rating: 2.5,
		num: 148
	},
	angerpoint: {
		desc: "If this Pokemon, but not its substitute, is struck by a critical hit, its Attack is raised by 12 stages.",
		shortDesc: "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages.",
		id: "angerpoint",
		name: "Anger Point",
		rating: 2,
		num: 83
	},
	anticipation: {
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is super effective on this Pokemon, or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, while Hidden Power, Judgment, Natural Gift, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move.",
		id: "anticipation",
		name: "Anticipation",
		rating: 1,
		num: 107
	},
	arenatrap: {
		desc: "Prevents adjacent opposing Pokemon from choosing to switch out unless they are immune to trapping or are airborne.",
		shortDesc: "Prevents adjacent foes from choosing to switch unless they are airborne.",
		id: "arenatrap",
		name: "Arena Trap",
		rating: 4.5,
		num: 71
	},
	aromaveil: {
		desc: "This Pokemon and its allies cannot be affected by Attract, Disable, Encore, Heal Block, Taunt, or Torment.",
		shortDesc: "Protects user/allies from Attract, Disable, Encore, Heal Block, Taunt, and Torment.",
		id: "aromaveil",
		name: "Aroma Veil",
		rating: 1.5,
		num: 165
	},
	aurabreak: {
		desc: "While this Pokemon is active, the effects of the Abilities Dark Aura and Fairy Aura are reversed, multiplying the power of Dark- and Fairy-type moves, respectively, by 3/4 instead of 1.33.",
		shortDesc: "While this Pokemon is active, the Dark Aura and Fairy Aura power modifier is 0.75x.",
		id: "aurabreak",
		name: "Aura Break",
		rating: 1.5,
		num: 188
	},
	baddreams: {
		desc: "Causes adjacent opposing Pokemon to lose 1/8 of their maximum HP, rounded down, at the end of each turn if they are asleep.",
		shortDesc: "Causes sleeping adjacent foes to lose 1/8 of their max HP at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		id: "baddreams",
		name: "Bad Dreams",
		rating: 2,
		num: 123
	},
	battery: {
		shortDesc: "This Pokemon's allies have the power of their special attacks multiplied by 1.3.",
		onBasePowerPriority: 8,
		id: "battery",
		name: "Battery",
		rating: 0,
		num: 217
	},
	battlearmor: {
		shortDesc: "This Pokemon cannot be struck by a critical hit.",
		onCriticalHit: false,
		id: "battlearmor",
		name: "Battle Armor",
		rating: 1,
		num: 4
	},
	battlebond: {
		desc: "If this Pokemon is a Greninja, it transforms into Ash-Greninja after knocking out a Pokemon. As Ash-Greninja, its Water Shuriken has 20 base power and always hits 3 times.",
		shortDesc: "After KOing a Pokemon: becomes Ash-Greninja, Water Shuriken: 20 power, hits 3x.",
		onModifyMovePriority: -1,
		id: "battlebond",
		name: "Battle Bond",
		rating: 3,
		num: 210
	},
	beastboost: {
		desc: "This Pokemon's highest stat is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's highest stat is raised by 1 if it attacks and KOes another Pokemon.",
		id: "beastboost",
		name: "Beast Boost",
		rating: 3.5,
		num: 224
	},
	berserk: {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Special Attack is raised by 1 stage. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
		id: "berserk",
		name: "Berserk",
		rating: 2.5,
		num: 201
	},
	bigpecks: {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's Defense stat stage.",
		id: "bigpecks",
		name: "Big Pecks",
		rating: 0.5,
		num: 145
	},
	blaze: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Fire-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Fire attacks.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "blaze",
		name: "Blaze",
		rating: 2,
		num: 66
	},
	bulletproof: {
		desc: "This Pokemon is immune to ballistic moves. Ballistic moves include Bullet Seed, Octazooka, Barrage, Rock Wrecker, Zap Cannon, Acid Spray, Aura Sphere, Focus Blast, and all moves with Ball or Bomb in their name.",
		shortDesc: "Makes user immune to ballistic moves (Shadow Ball, Sludge Bomb, Focus Blast, etc).",
		id: "bulletproof",
		name: "Bulletproof",
		rating: 3.5,
		num: 171
	},
	cheekpouch: {
		desc: "If this Pokemon eats a Berry, it restores 1/3 of its maximum HP, rounded down, in addition to the Berry's effect.",
		shortDesc: "If this Pokemon eats a Berry, it restores 1/3 of its max HP after the Berry's effect.",
		id: "cheekpouch",
		name: "Cheek Pouch",
		rating: 2,
		num: 167
	},
	chlorophyll: {
		shortDesc: "If Sunny Day is active, this Pokemon's Speed is doubled.",
		id: "chlorophyll",
		name: "Chlorophyll",
		rating: 3,
		num: 34
	},
	clearbody: {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		id: "clearbody",
		name: "Clear Body",
		rating: 2,
		num: 29
	},
	cloudnine: {
		shortDesc: "While this Pokemon is active, the effects of weather conditions are disabled.",
		suppressWeather: true,
		id: "cloudnine",
		name: "Cloud Nine",
		rating: 2.5,
		num: 13
	},
	colorchange: {
		desc: "This Pokemon's type changes to match the type of the last move that hit it, unless that type is already one of its types. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "This Pokemon's type changes to the type of a move it's hit by, unless it has the type.",
		id: "colorchange",
		name: "Color Change",
		rating: 1,
		num: 16
	},
	comatose: {
		desc: "This Pokemon cannot be statused, and is considered to be asleep. Moongeist Beam, Sunsteel Strike, and the Abilities Mold Breaker, Teravolt, and Turboblaze cannot ignore this Ability.",
		shortDesc: "This Pokemon cannot be statused, and is considered to be asleep.",
		isUnbreakable: true,
		id: "comatose",
		name: "Comatose",
		rating: 3,
		num: 213
	},
	competitive: {
		desc: "This Pokemon's Special Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
		shortDesc: "This Pokemon's Sp. Atk is raised by 2 for each of its stats that is lowered by a foe.",
		id: "competitive",
		name: "Competitive",
		rating: 2.5,
		num: 172
	},
	compoundeyes: {
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
		id: "compoundeyes",
		name: "Compound Eyes",
		rating: 3.5,
		num: 14
	},
	contrary: {
		shortDesc: "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
		id: "contrary",
		name: "Contrary",
		rating: 4,
		num: 126
	},
	corrosion: {
		shortDesc: "This Pokemon can poison or badly poison other Pokemon regardless of their typing.",
		id: "corrosion",
		name: "Corrosion",
		rating: 2.5,
		num: 212
	},
	cursedbody: {
		desc: "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled unless one of the attacker's moves is already disabled.",
		shortDesc: "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled.",
		id: "cursedbody",
		name: "Cursed Body",
		rating: 2,
		num: 130
	},
	cutecharm: {
		desc: "There is a 30% chance a Pokemon making contact with this Pokemon will become infatuated if it is of the opposite gender.",
		shortDesc: "30% chance of infatuating Pokemon of the opposite gender if they make contact.",
		id: "cutecharm",
		name: "Cute Charm",
		rating: 1,
		num: 56
	},
	damp: {
		desc: "While this Pokemon is active, Explosion, Mind Blown, Self-Destruct, and the Ability Aftermath are prevented from having an effect.",
		shortDesc: "Prevents Explosion/Mind Blown/Self-Destruct/Aftermath while this Pokemon is active.",
		id: "damp",
		name: "Damp",
		rating: 1,
		num: 6
	},
	dancer: {
		desc: "After another Pokemon uses a dance move, this Pokemon uses the same move. Moves used by this Ability cannot be copied again.",
		shortDesc: "After another Pokemon uses a dance move, this Pokemon uses the same move.",
		id: "dancer",
		name: "Dancer",
		rating: 2.5,
		num: 216
	},
	darkaura: {
		desc: "While this Pokemon is active, the power of Dark-type moves used by active Pokemon is multiplied by 1.33.",
		shortDesc: "While this Pokemon is active, a Dark move used by any Pokemon has 1.33x power.",
		isUnbreakable: true,
		id: "darkaura",
		name: "Dark Aura",
		rating: 3,
		num: 186
	},
	dazzling: {
		desc: "While this Pokemon is active, priority moves from opposing Pokemon targeted at allies are prevented from having an effect.",
		shortDesc: "While this Pokemon is active, allies are protected from opposing priority moves.",
		id: "dazzling",
		name: "Dazzling",
		rating: 3.5,
		num: 219
	},
	defeatist: {
		desc: "While this Pokemon has 1/2 or less of its maximum HP, its Attack and Special Attack are halved.",
		shortDesc: "While this Pokemon has 1/2 or less of its max HP, its Attack and Sp. Atk are halved.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "defeatist",
		name: "Defeatist",
		rating: -1,
		num: 129
	},
	defiant: {
		desc: "This Pokemon's Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe.",
		id: "defiant",
		name: "Defiant",
		rating: 2.5,
		num: 128
	},
	deltastream: {
		desc: "On switch-in, the weather becomes strong winds that remove the weaknesses of the Flying type from Flying-type Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Desolate Land or Primordial Sea.",
		shortDesc: "On switch-in, strong winds begin until this Ability is not active in battle.",
		id: "deltastream",
		name: "Delta Stream",
		rating: 5,
		num: 191
	},
	desolateland: {
		desc: "On switch-in, the weather becomes extremely harsh sunlight that prevents damaging Water-type moves from executing, in addition to all the effects of Sunny Day. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream or Primordial Sea.",
		shortDesc: "On switch-in, extremely harsh sunlight begins until this Ability is not active in battle.",
		id: "desolateland",
		name: "Desolate Land",
		rating: 5,
		num: 190
	},
	disguise: {
		desc: "If this Pokemon is a Mimikyu, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken and it changes to Busted Form. Confusion damage also breaks the disguise.",
		shortDesc: "If this Pokemon is a Mimikyu, the first hit it takes in battle deals 0 neutral damage.",
		onDamagePriority: 1,
		id: "disguise",
		name: "Disguise",
		rating: 4,
		num: 209
	},
	download: {
		desc: "On switch-in, this Pokemon's Attack or Special Attack is raised by 1 stage based on the weaker combined defensive stat of all opposing Pokemon. Attack is raised if their Defense is lower, and Special Attack is raised if their Special Defense is the same or lower.",
		shortDesc: "On switch-in, Attack or Sp. Atk is raised 1 stage based on the foes' weaker Defense.",
		id: "download",
		name: "Download",
		rating: 4,
		num: 88
	},
	drizzle: {
		shortDesc: "On switch-in, this Pokemon summons Rain Dance.",
		id: "drizzle",
		name: "Drizzle",
		rating: 4.5,
		num: 2
	},
	drought: {
		shortDesc: "On switch-in, this Pokemon summons Sunny Day.",
		id: "drought",
		name: "Drought",
		rating: 4.5,
		num: 70
	},
	dryskin: {
		desc: "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move. The power of Fire-type moves is multiplied by 1.25 when used on this Pokemon. At the end of each turn, this Pokemon restores 1/8 of its maximum HP, rounded down, if the weather is Rain Dance, and loses 1/8 of its maximum HP, rounded down, if the weather is Sunny Day.",
		shortDesc: "This Pokemon is healed 1/4 by Water, 1/8 by Rain; is hurt 1.25x by Fire, 1/8 by Sun.",
		onBasePowerPriority: 7,
		id: "dryskin",
		name: "Dry Skin",
		rating: 3,
		num: 87
	},
	earlybird: {
		shortDesc: "This Pokemon's sleep counter drops by 2 instead of 1.",
		id: "earlybird",
		name: "Early Bird",
		rating: 2,
		num: 48
	},
	effectspore: {
		desc: "30% chance a Pokemon making contact with this Pokemon will be poisoned, paralyzed, or fall asleep.",
		shortDesc: "30% chance of poison/paralysis/sleep on others making contact with this Pokemon.",
		id: "effectspore",
		name: "Effect Spore",
		rating: 2,
		num: 27
	},
	electricsurge: {
		shortDesc: "On switch-in, this Pokemon summons Electric Terrain.",
		id: "electricsurge",
		name: "Electric Surge",
		rating: 4,
		num: 226
	},
	emergencyexit: {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect. This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, Struggle recoil, and confusion damage.",
		shortDesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
		id: "emergencyexit",
		name: "Emergency Exit",
		rating: 2,
		num: 194
	},
	fairyaura: {
		desc: "While this Pokemon is active, the power of Fairy-type moves used by active Pokemon is multiplied by 1.33.",
		shortDesc: "While this Pokemon is active, a Fairy move used by any Pokemon has 1.33x power.",
		isUnbreakable: true,
		id: "fairyaura",
		name: "Fairy Aura",
		rating: 3,
		num: 187
	},
	filter: {
		shortDesc: "This Pokemon receives 3/4 damage from supereffective attacks.",
		id: "filter",
		name: "Filter",
		rating: 3,
		num: 111
	},
	flamebody: {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be burned.",
		id: "flamebody",
		name: "Flame Body",
		rating: 2,
		num: 49
	},
	flareboost: {
		desc: "While this Pokemon is burned, the power of its special attacks is multiplied by 1.5.",
		shortDesc: "While this Pokemon is burned, its special attacks have 1.5x power.",
		onBasePowerPriority: 8,
		id: "flareboost",
		name: "Flare Boost",
		rating: 2.5,
		num: 138
	},
	flashfire: {
		desc: "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its attacking stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
		effect: {
			noCopy: true,
			onModifyAtkPriority: 5,
			onModifySpAPriority: 5
		},
		id: "flashfire",
		name: "Flash Fire",
		rating: 3,
		num: 18
	},
	flowergift: {
		desc: "If this Pokemon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and the Attack and Special Defense of it and its allies are multiplied by 1.5.",
		shortDesc: "If user is Cherrim and Sunny Day is active, it and allies' Attack and Sp. Def are 1.5x.",
		onModifyAtkPriority: 3,
		onModifySpDPriority: 4,
		id: "flowergift",
		name: "Flower Gift",
		rating: 2.5,
		num: 122
	},
	flowerveil: {
		desc: "Grass-type Pokemon on this Pokemon's side cannot have their stat stages lowered by other Pokemon or have a major status condition inflicted on them by other Pokemon.",
		shortDesc: "This side's Grass types can't have stats lowered or status inflicted by other Pokemon.",
		id: "flowerveil",
		name: "Flower Veil",
		rating: 0,
		num: 166
	},
	fluffy: {
		desc: "This Pokemon receives 1/2 damage from contact moves, but double damage from Fire moves.",
		shortDesc: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Fire moves.",
		id: "fluffy",
		name: "Fluffy",
		rating: 2.5,
		num: 218
	},
	forecast: {
		desc: "If this Pokemon is a Castform, its type changes to the current weather condition's type, except Sandstorm.",
		shortDesc: "Castform's type changes to the current weather condition's type, except Sandstorm.",
		id: "forecast",
		name: "Forecast",
		rating: 3,
		num: 59
	},
	forewarn: {
		desc: "On switch-in, this Pokemon is alerted to the move with the highest power, at random, known by an opposing Pokemon.",
		shortDesc: "On switch-in, this Pokemon is alerted to the foes' move with the highest power.",
		id: "forewarn",
		name: "Forewarn",
		rating: 1,
		num: 108
	},
	friendguard: {
		shortDesc: "This Pokemon's allies receive 3/4 damage from other Pokemon's attacks.",
		id: "friendguard",
		name: "Friend Guard",
		rating: 0,
		num: 132
	},
	frisk: {
		shortDesc: "On switch-in, this Pokemon identifies the held items of all opposing Pokemon.",
		id: "frisk",
		name: "Frisk",
		rating: 1.5,
		num: 119
	},
	fullmetalbody: {
		desc: "Prevents other Pokemon from lowering this Pokemon's stat stages. Moongeist Beam, Sunsteel Strike, and the Abilities Mold Breaker, Teravolt, and Turboblaze cannot ignore this Ability.",
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		isUnbreakable: true,
		id: "fullmetalbody",
		name: "Full Metal Body",
		rating: 2,
		num: 230
	},
	furcoat: {
		shortDesc: "This Pokemon's Defense is doubled.",
		onModifyDefPriority: 6,
		id: "furcoat",
		name: "Fur Coat",
		rating: 3.5,
		num: 169
	},
	galewings: {
		shortDesc: "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 1.",
		id: "galewings",
		name: "Gale Wings",
		rating: 3,
		num: 177
	},
	galvanize: {
		desc: "This Pokemon's Normal-type moves become Electric-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Electric type and have 1.2x power.",
		onModifyMovePriority: -1,
		onBasePowerPriority: 8,
		id: "galvanize",
		name: "Galvanize",
		rating: 4,
		num: 206
	},
	gluttony: {
		shortDesc: "When this Pokemon has 1/2 or less of its maximum HP, it uses certain Berries early.",
		id: "gluttony",
		name: "Gluttony",
		rating: 1.5,
		num: 82
	},
	gooey: {
		shortDesc: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
		id: "gooey",
		name: "Gooey",
		rating: 2.5,
		num: 183
	},
	grasspelt: {
		shortDesc: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5.",
		onModifyDefPriority: 6,
		id: "grasspelt",
		name: "Grass Pelt",
		rating: 1,
		num: 179
	},
	grassysurge: {
		shortDesc: "On switch-in, this Pokemon summons Grassy Terrain.",
		id: "grassysurge",
		name: "Grassy Surge",
		rating: 4,
		num: 229
	},
	guts: {
		desc: "If this Pokemon has a major status condition, its Attack is multiplied by 1.5; burn's physical damage halving is ignored.",
		shortDesc: "If this Pokemon is statused, its Attack is 1.5x; ignores burn halving physical damage.",
		onModifyAtkPriority: 5,
		id: "guts",
		name: "Guts",
		rating: 3,
		num: 62
	},
	harvest: {
		desc: "If the last item this Pokemon used is a Berry, there is a 50% chance it gets restored at the end of each turn. If Sunny Day is active, this chance is 100%.",
		shortDesc: "If last item used is a Berry, 50% chance to restore it each end of turn. 100% in Sun.",
		id: "harvest",
		name: "Harvest",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		rating: 2.5,
		num: 139
	},
	healer: {
		desc: "There is a 30% chance of curing an adjacent ally's major status condition at the end of each turn.",
		shortDesc: "30% chance of curing an adjacent ally's status at the end of each turn.",
		id: "healer",
		name: "Healer",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		rating: 0,
		num: 131
	},
	heatproof: {
		desc: "The power of Fire-type attacks against this Pokemon is halved, and burn damage taken is halved.",
		shortDesc: "The power of Fire-type attacks against this Pokemon is halved; burn damage halved.",
		onBasePowerPriority: 7,
		id: "heatproof",
		name: "Heatproof",
		rating: 2.5,
		num: 85
	},
	heavymetal: {
		shortDesc: "This Pokemon's weight is doubled.",
		id: "heavymetal",
		name: "Heavy Metal",
		rating: -1,
		num: 134
	},
	honeygather: {
		shortDesc: "No competitive use.",
		id: "honeygather",
		name: "Honey Gather",
		rating: 0,
		num: 118
	},
	hugepower: {
		shortDesc: "This Pokemon's Attack is doubled.",
		onModifyAtkPriority: 5,
		id: "hugepower",
		name: "Huge Power",
		rating: 5,
		num: 37
	},
	hustle: {
		desc: "This Pokemon's Attack is multiplied by 1.5 and the accuracy of its physical attacks is multiplied by 0.8.",
		shortDesc: "This Pokemon's Attack is 1.5x and accuracy of its physical attacks is 0.8x.",
		onModifyAtkPriority: 5,
		onModifyMovePriority: -1,
		id: "hustle",
		name: "Hustle",
		rating: 3,
		num: 55
	},
	hydration: {
		desc: "This Pokemon has its major status condition cured at the end of each turn if Rain Dance is active.",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Rain Dance is active.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		id: "hydration",
		name: "Hydration",
		rating: 2,
		num: 93
	},
	hypercutter: {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's Attack stat stage.",
		id: "hypercutter",
		name: "Hyper Cutter",
		rating: 1.5,
		num: 52
	},
	icebody: {
		desc: "If Hail is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon heals 1/16 of its max HP each turn; immunity to Hail.",
		id: "icebody",
		name: "Ice Body",
		rating: 1.5,
		num: 115
	},
	illuminate: {
		shortDesc: "No competitive use.",
		id: "illuminate",
		name: "Illuminate",
		rating: 0,
		num: 35
	},
	illusion: {
		desc: "When this Pokemon switches in, it appears as the last unfainted Pokemon in its party until it takes direct damage from another Pokemon's attack. This Pokemon's actual level and HP are displayed instead of those of the mimicked Pokemon.",
		shortDesc: "This Pokemon appears as the last Pokemon in the party until it takes direct damage.",
		isUnbreakable: true,
		id: "illusion",
		name: "Illusion",
		rating: 4,
		num: 149
	},
	immunity: {
		shortDesc: "This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it.",
		id: "immunity",
		name: "Immunity",
		rating: 2,
		num: 17
	},
	imposter: {
		desc: "On switch-in, this Pokemon Transforms into the opposing Pokemon that is facing it. If there is no Pokemon at that position, this Pokemon does not Transform.",
		shortDesc: "On switch-in, this Pokemon Transforms into the opposing Pokemon that is facing it.",
		id: "imposter",
		name: "Imposter",
		rating: 4.5,
		num: 150
	},
	infiltrator: {
		desc: "This Pokemon's moves ignore substitutes and the opposing side's Reflect, Light Screen, Safeguard, Mist and Aurora Veil.",
		shortDesc: "Moves ignore substitutes and foe's Reflect/Light Screen/Safeguard/Mist/Aurora Veil.",
		id: "infiltrator",
		name: "Infiltrator",
		rating: 3,
		num: 151
	},
	innardsout: {
		desc: "If this Pokemon is knocked out with a move, that move's user loses HP equal to the amount of damage inflicted on this Pokemon.",
		shortDesc: "If this Pokemon is KOed with a move, that move's user loses an equal amount of HP.",
		id: "innardsout",
		name: "Innards Out",
		onAfterDamageOrder: 1,
		rating: 2.5,
		num: 215
	},
	innerfocus: {
		shortDesc: "This Pokemon cannot be made to flinch.",
		onFlinch: false,
		id: "innerfocus",
		name: "Inner Focus",
		rating: 1.5,
		num: 39
	},
	insomnia: {
		shortDesc: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it.",
		id: "insomnia",
		name: "Insomnia",
		rating: 2,
		num: 15
	},
	intimidate: {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		id: "intimidate",
		name: "Intimidate",
		rating: 3.5,
		num: 22
	},
	ironbarbs: {
		desc: "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		onAfterDamageOrder: 1,
		id: "ironbarbs",
		name: "Iron Barbs",
		rating: 3,
		num: 160
	},
	ironfist: {
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.2.",
		shortDesc: "This Pokemon's punch-based attacks have 1.2x power. Sucker Punch is not boosted.",
		onBasePowerPriority: 8,
		id: "ironfist",
		name: "Iron Fist",
		rating: 3,
		num: 89
	},
	justified: {
		shortDesc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move.",
		id: "justified",
		name: "Justified",
		rating: 2,
		num: 154
	},
	keeneye: {
		desc: "Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
		shortDesc: "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat.",
		id: "keeneye",
		name: "Keen Eye",
		rating: 1,
		num: 51
	},
	klutz: {
		desc: "This Pokemon's held item has no effect. This Pokemon cannot use Fling successfully. Macho Brace, Power Anklet, Power Band, Power Belt, Power Bracer, Power Lens, and Power Weight still have their effects.",
		shortDesc: "This Pokemon's held item has no effect, except Macho Brace. Fling cannot be used.",
		id: "klutz",
		name: "Klutz",
		rating: -1,
		num: 103
	},
	leafguard: {
		desc: "If Sunny Day is active, this Pokemon cannot gain a major status condition and Rest will fail for it.",
		shortDesc: "If Sunny Day is active, this Pokemon cannot be statused and Rest will fail for it.",
		id: "leafguard",
		name: "Leaf Guard",
		rating: 1,
		num: 102
	},
	levitate: {
		desc: "This Pokemon is immune to Ground. Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity.",
		shortDesc: "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it.",
		id: "levitate",
		name: "Levitate",
		rating: 3.5,
		num: 26
	},
	lightmetal: {
		shortDesc: "This Pokemon's weight is halved.",
		id: "lightmetal",
		name: "Light Metal",
		rating: 1,
		num: 135
	},
	lightningrod: {
		desc: "This Pokemon is immune to Electric-type moves and raises its Special Attack by 1 stage when hit by an Electric-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
		shortDesc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
		id: "lightningrod",
		name: "Lightning Rod",
		rating: 3.5,
		num: 32
	},
	limber: {
		shortDesc: "This Pokemon cannot be paralyzed. Gaining this Ability while paralyzed cures it.",
		id: "limber",
		name: "Limber",
		rating: 1.5,
		num: 7
	},
	liquidooze: {
		shortDesc: "This Pokemon damages those draining HP from it for as much as they would heal.",
		id: "liquidooze",
		name: "Liquid Ooze",
		rating: 1.5,
		num: 64
	},
	liquidvoice: {
		desc: "This Pokemon's sound-based moves become Water-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's sound-based moves become Water type.",
		onModifyMovePriority: -1,
		id: "liquidvoice",
		name: "Liquid Voice",
		rating: 2.5,
		num: 204
	},
	longreach: {
		shortDesc: "This Pokemon's attacks do not make contact with the target.",
		id: "longreach",
		name: "Long Reach",
		rating: 1.5,
		num: 203
	},
	magicbounce: {
		desc: "This Pokemon blocks certain status moves and instead uses the move against the original user.",
		shortDesc: "This Pokemon blocks certain status moves and bounces them back to the user.",
		id: "magicbounce",
		name: "Magic Bounce",
		onTryHitPriority: 1,
		effect: {
			duration: 1
		},
		rating: 4.5,
		num: 156
	},
	magicguard: {
		desc: "This Pokemon can only be damaged by direct attacks. Curse and Substitute on use, Belly Drum, Pain Split, Struggle recoil, and confusion damage are considered direct damage.",
		shortDesc: "This Pokemon can only be damaged by direct attacks.",
		id: "magicguard",
		name: "Magic Guard",
		rating: 4.5,
		num: 98
	},
	magician: {
		desc: "If this Pokemon has no item, it steals the item off a Pokemon it hits with an attack. Does not affect Doom Desire and Future Sight.",
		shortDesc: "If this Pokemon has no item, it steals the item off a Pokemon it hits with an attack.",
		id: "magician",
		name: "Magician",
		rating: 1.5,
		num: 170
	},
	magmaarmor: {
		shortDesc: "This Pokemon cannot be frozen. Gaining this Ability while frozen cures it.",
		id: "magmaarmor",
		name: "Magma Armor",
		rating: 0.5,
		num: 40
	},
	magnetpull: {
		desc: "Prevents adjacent opposing Steel-type Pokemon from choosing to switch out unless they are immune to trapping.",
		shortDesc: "Prevents adjacent Steel-type foes from choosing to switch.",
		id: "magnetpull",
		name: "Magnet Pull",
		rating: 4.5,
		num: 42
	},
	marvelscale: {
		desc: "If this Pokemon has a major status condition, its Defense is multiplied by 1.5.",
		shortDesc: "If this Pokemon is statused, its Defense is 1.5x.",
		onModifyDefPriority: 6,
		id: "marvelscale",
		name: "Marvel Scale",
		rating: 2.5,
		num: 63
	},
	megalauncher: {
		desc: "This Pokemon's pulse moves have their power multiplied by 1.5. Heal Pulse restores 3/4 of a target's maximum HP, rounded half down.",
		shortDesc: "This Pokemon's pulse moves have 1.5x power. Heal Pulse heals 3/4 target's max HP.",
		onBasePowerPriority: 8,
		id: "megalauncher",
		name: "Mega Launcher",
		rating: 3.5,
		num: 178
	},
	merciless: {
		shortDesc: "This Pokemon's attacks are critical hits if the target is poisoned.",
		id: "merciless",
		name: "Merciless",
		rating: 2,
		num: 196
	},
	minus: {
		desc: "If an active ally has this Ability or the Ability Plus, this Pokemon's Special Attack is multiplied by 1.5.",
		shortDesc: "If an active ally has this Ability or the Ability Plus, this Pokemon's Sp. Atk is 1.5x.",
		onModifySpAPriority: 5,
		id: "minus",
		name: "Minus",
		rating: 0,
		num: 58
	},
	mistysurge: {
		shortDesc: "On switch-in, this Pokemon summons Misty Terrain.",
		id: "mistysurge",
		name: "Misty Surge",
		rating: 4,
		num: 228
	},
	moldbreaker: {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		id: "moldbreaker",
		name: "Mold Breaker",
		rating: 3.5,
		num: 104
	},
	moody: {
		desc: "This Pokemon has a random stat raised by 2 stages and another stat lowered by 1 stage at the end of each turn.",
		shortDesc: "Raises a random stat by 2 and lowers another stat by 1 at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		id: "moody",
		name: "Moody",
		rating: 5,
		num: 141
	},
	motordrive: {
		desc: "This Pokemon is immune to Electric-type moves and raises its Speed by 1 stage when hit by an Electric-type move.",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by an Electric move; Electric immunity.",
		id: "motordrive",
		name: "Motor Drive",
		rating: 3,
		num: 78
	},
	moxie: {
		desc: "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		id: "moxie",
		name: "Moxie",
		rating: 3.5,
		num: 153
	},
	multiscale: {
		shortDesc: "If this Pokemon is at full HP, damage taken from attacks is halved.",
		id: "multiscale",
		name: "Multiscale",
		rating: 4,
		num: 136
	},
	multitype: {
		shortDesc: "If this Pokemon is an Arceus, its type changes to match its held Plate or Z-Crystal.",
		id: "multitype",
		name: "Multitype",
		rating: 4,
		num: 121
	},
	mummy: {
		desc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy. Does not affect the Abilities Multitype or Stance Change.",
		shortDesc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy.",
		id: "mummy",
		name: "Mummy",
		rating: 2,
		num: 152
	},
	naturalcure: {
		shortDesc: "This Pokemon has its major status condition cured when it switches out.",
		id: "naturalcure",
		name: "Natural Cure",
		rating: 3.5,
		num: 30
	},
	neuroforce: {
		shortDesc: "This Pokemon's attacks that are super effective against the target do 1.2x damage.",
		id: "neuroforce",
		name: "Neuroforce",
		rating: 3,
		num: 233
	},
	noguard: {
		shortDesc: "Every move used by or against this Pokemon will always hit.",
		id: "noguard",
		name: "No Guard",
		rating: 4,
		num: 99
	},
	normalize: {
		desc: "This Pokemon's moves are changed to be Normal type and have their power multiplied by 1.2. This effect comes before other effects that change a move's type.",
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 1.2x power.",
		onModifyMovePriority: 1,
		onBasePowerPriority: 8,
		id: "normalize",
		name: "Normalize",
		rating: -1,
		num: 96
	},
	oblivious: {
		desc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability while affected cures it.",
		shortDesc: "This Pokemon cannot be infatuated or taunted. Gaining this Ability cures it.",
		id: "oblivious",
		name: "Oblivious",
		rating: 1,
		num: 12
	},
	overcoat: {
		shortDesc: "This Pokemon is immune to powder moves and damage from Sandstorm or Hail.",
		onTryHitPriority: 1,
		id: "overcoat",
		name: "Overcoat",
		rating: 2.5,
		num: 142
	},
	overgrow: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Grass-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Grass attacks.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "overgrow",
		name: "Overgrow",
		rating: 2,
		num: 65
	},
	owntempo: {
		shortDesc: "This Pokemon cannot be confused. Gaining this Ability while confused cures it.",
		id: "owntempo",
		name: "Own Tempo",
		rating: 1.5,
		num: 20
	},
	parentalbond: {
		desc: "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
		onBasePowerPriority: 8,
		id: "parentalbond",
		name: "Parental Bond",
		rating: 5,
		num: 184
	},
	pickup: {
		shortDesc: "If this Pokemon has no item, it finds one used by an adjacent Pokemon this turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		id: "pickup",
		name: "Pickup",
		rating: 0.5,
		num: 53
	},
	pickpocket: {
		desc: "If this Pokemon has no item, it steals the item off a Pokemon that makes contact with it. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "If this Pokemon has no item, it steals the item off a Pokemon making contact with it.",
		id: "pickpocket",
		name: "Pickpocket",
		rating: 1,
		num: 124
	},
	pixilate: {
		desc: "This Pokemon's Normal-type moves become Fairy-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.2x power.",
		onModifyMovePriority: -1,
		onBasePowerPriority: 8,
		id: "pixilate",
		name: "Pixilate",
		rating: 4,
		num: 182
	},
	plus: {
		desc: "If an active ally has this Ability or the Ability Minus, this Pokemon's Special Attack is multiplied by 1.5.",
		shortDesc: "If an active ally has this Ability or the Ability Minus, this Pokemon's Sp. Atk is 1.5x.",
		onModifySpAPriority: 5,
		id: "plus",
		name: "Plus",
		rating: 0,
		num: 57
	},
	poisonheal: {
		desc: "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
		onDamagePriority: 1,
		id: "poisonheal",
		name: "Poison Heal",
		rating: 4,
		num: 90
	},
	poisonpoint: {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be poisoned.",
		id: "poisonpoint",
		name: "Poison Point",
		rating: 2,
		num: 38
	},
	poisontouch: {
		shortDesc: "This Pokemon's contact moves have a 30% chance of poisoning.",
		id: "poisontouch",
		name: "Poison Touch",
		rating: 2,
		num: 143
	},
	powerconstruct: {
		desc: "If this Pokemon is a Zygarde in its 10% or 50% Forme, it changes to Complete Forme when it has 1/2 or less of its maximum HP at the end of the turn.",
		shortDesc: "If Zygarde 10%/50%, changes to Complete if at 1/2 max HP or less at end of turn.",
		onResidualOrder: 27,
		id: "powerconstruct",
		name: "Power Construct",
		rating: 4,
		num: 211
	},
	powerofalchemy: {
		desc: "This Pokemon copies the Ability of an ally that faints. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "This Pokemon copies the Ability of an ally that faints.",
		id: "powerofalchemy",
		name: "Power of Alchemy",
		rating: 0,
		num: 223
	},
	prankster: {
		shortDesc: "This Pokemon's Status moves have priority raised by 1, but Dark types are immune.",
		id: "prankster",
		name: "Prankster",
		rating: 4,
		num: 158
	},
	pressure: {
		desc: "If this Pokemon is the target of an opposing Pokemon's move, that move loses one additional PP.",
		shortDesc: "If this Pokemon is the target of a foe's move, that move loses one additional PP.",
		id: "pressure",
		name: "Pressure",
		rating: 2,
		num: 46
	},
	primordialsea: {
		desc: "On switch-in, the weather becomes heavy rain that prevents damaging Fire-type moves from executing, in addition to all the effects of Rain Dance. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream or Desolate Land.",
		shortDesc: "On switch-in, heavy rain begins until this Ability is not active in battle.",
		id: "primordialsea",
		name: "Primordial Sea",
		rating: 5,
		num: 189
	},
	prismarmor: {
		desc: "This Pokemon receives 3/4 damage from supereffective attacks. Moongeist Beam, Sunsteel Strike, and the Abilities Mold Breaker, Teravolt, and Turboblaze cannot ignore this Ability.",
		shortDesc: "This Pokemon receives 3/4 damage from supereffective attacks.",
		isUnbreakable: true,
		id: "prismarmor",
		name: "Prism Armor",
		rating: 3,
		num: 232
	},
	protean: {
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
		id: "protean",
		name: "Protean",
		rating: 4,
		num: 168
	},
	psychicsurge: {
		shortDesc: "On switch-in, this Pokemon summons Psychic Terrain.",
		id: "psychicsurge",
		name: "Psychic Surge",
		rating: 4,
		num: 227
	},
	purepower: {
		shortDesc: "This Pokemon's Attack is doubled.",
		onModifyAtkPriority: 5,
		id: "purepower",
		name: "Pure Power",
		rating: 5,
		num: 74
	},
	queenlymajesty: {
		desc: "While this Pokemon is active, priority moves from opposing Pokemon targeted at allies are prevented from having an effect.",
		shortDesc: "While this Pokemon is active, allies are protected from opposing priority moves.",
		id: "queenlymajesty",
		name: "Queenly Majesty",
		rating: 3.5,
		num: 214
	},
	quickfeet: {
		desc: "If this Pokemon has a major status condition, its Speed is multiplied by 1.5; the Speed drop from paralysis is ignored.",
		shortDesc: "If this Pokemon is statused, its Speed is 1.5x; ignores Speed drop from paralysis.",
		id: "quickfeet",
		name: "Quick Feet",
		rating: 2.5,
		num: 95
	},
	raindish: {
		desc: "If Rain Dance is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Rain Dance is active, this Pokemon heals 1/16 of its max HP each turn.",
		id: "raindish",
		name: "Rain Dish",
		rating: 1.5,
		num: 44
	},
	rattled: {
		desc: "This Pokemon's Speed is raised by 1 stage if hit by a Bug-, Dark-, or Ghost-type attack.",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack.",
		id: "rattled",
		name: "Rattled",
		rating: 1.5,
		num: 155
	},
	receiver: {
		desc: "This Pokemon copies the Ability of an ally that faints. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "This Pokemon copies the Ability of an ally that faints.",
		id: "receiver",
		name: "Receiver",
		rating: 0,
		num: 222
	},
	reckless: {
		desc: "This Pokemon's attacks with recoil or crash damage have their power multiplied by 1.2. Does not affect Struggle.",
		shortDesc: "This Pokemon's attacks with recoil or crash damage have 1.2x power; not Struggle.",
		onBasePowerPriority: 8,
		id: "reckless",
		name: "Reckless",
		rating: 3,
		num: 120
	},
	refrigerate: {
		desc: "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.2x power.",
		onModifyMovePriority: -1,
		onBasePowerPriority: 8,
		id: "refrigerate",
		name: "Refrigerate",
		rating: 4,
		num: 174
	},
	regenerator: {
		shortDesc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
		id: "regenerator",
		name: "Regenerator",
		rating: 4,
		num: 144
	},
	rivalry: {
		desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender or multiplied by 0.75 against targets of the opposite gender. There is no modifier if either this Pokemon or the target is genderless.",
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender.",
		onBasePowerPriority: 8,
		id: "rivalry",
		name: "Rivalry",
		rating: 0.5,
		num: 79
	},
	rkssystem: {
		shortDesc: "If this Pokemon is a Silvally, its type changes to match its held Memory.",
		id: "rkssystem",
		name: "RKS System",
		rating: 4,
		num: 225
	},
	rockhead: {
		desc: "This Pokemon does not take recoil damage besides Struggle, Life Orb, and crash damage.",
		shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
		id: "rockhead",
		name: "Rock Head",
		rating: 2.5,
		num: 69
	},
	roughskin: {
		desc: "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		onAfterDamageOrder: 1,
		id: "roughskin",
		name: "Rough Skin",
		rating: 3,
		num: 24
	},
	runaway: {
		shortDesc: "No competitive use.",
		id: "runaway",
		name: "Run Away",
		rating: 0,
		num: 50
	},
	sandforce: {
		desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.3x in Sandstorm; immunity to it.",
		onBasePowerPriority: 8,
		id: "sandforce",
		name: "Sand Force",
		rating: 2,
		num: 159
	},
	sandrush: {
		desc: "If Sandstorm is active, this Pokemon's Speed is doubled. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's Speed is doubled; immunity to Sandstorm.",
		id: "sandrush",
		name: "Sand Rush",
		rating: 3,
		num: 146
	},
	sandstream: {
		shortDesc: "On switch-in, this Pokemon summons Sandstorm.",
		id: "sandstream",
		name: "Sand Stream",
		rating: 4.5,
		num: 45
	},
	sandveil: {
		desc: "If Sandstorm is active, this Pokemon's evasiveness is multiplied by 1.25. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's evasiveness is 1.25x; immunity to Sandstorm.",
		id: "sandveil",
		name: "Sand Veil",
		rating: 1.5,
		num: 8
	},
	sapsipper: {
		desc: "This Pokemon is immune to Grass-type moves and raises its Attack by 1 stage when hit by a Grass-type move.",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Grass move; Grass immunity.",
		onTryHitPriority: 1,
		id: "sapsipper",
		name: "Sap Sipper",
		rating: 3.5,
		num: 157
	},
	schooling: {
		desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form.",
		onResidualOrder: 27,
		id: "schooling",
		name: "Schooling",
		rating: 3,
		num: 208
	},
	scrappy: {
		shortDesc: "This Pokemon can hit Ghost types with Normal- and Fighting-type moves.",
		onModifyMovePriority: -5,
		id: "scrappy",
		name: "Scrappy",
		rating: 3,
		num: 113
	},
	serenegrace: {
		shortDesc: "This Pokemon's moves have their secondary effect chance doubled.",
		onModifyMovePriority: -2,
		id: "serenegrace",
		name: "Serene Grace",
		rating: 4,
		num: 32
	},
	shadowshield: {
		desc: "If this Pokemon is at full HP, damage taken from attacks is halved. Moongeist Beam, Sunsteel Strike, and the Abilities Mold Breaker, Teravolt, and Turboblaze cannot ignore this Ability.",
		shortDesc: "If this Pokemon is at full HP, damage taken from attacks is halved.",
		isUnbreakable: true,
		id: "shadowshield",
		name: "Shadow Shield",
		rating: 4,
		num: 231
	},
	shadowtag: {
		desc: "Prevents adjacent opposing Pokemon from choosing to switch out unless they are immune to trapping or also have this Ability.",
		shortDesc: "Prevents adjacent foes from choosing to switch unless they also have this Ability.",
		id: "shadowtag",
		name: "Shadow Tag",
		rating: 5,
		num: 23
	},
	shedskin: {
		desc: "This Pokemon has a 33% chance to have its major status condition cured at the end of each turn.",
		shortDesc: "This Pokemon has a 33% chance to have its status cured at the end of each turn.",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		id: "shedskin",
		name: "Shed Skin",
		rating: 3.5,
		num: 61
	},
	sheerforce: {
		desc: "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed.",
		shortDesc: "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects.",
		onBasePowerPriority: 8,
		id: "sheerforce",
		name: "Sheer Force",
		rating: 4,
		num: 125
	},
	shellarmor: {
		shortDesc: "This Pokemon cannot be struck by a critical hit.",
		onCriticalHit: false,
		id: "shellarmor",
		name: "Shell Armor",
		rating: 1,
		num: 75
	},
	shielddust: {
		shortDesc: "This Pokemon is not affected by the secondary effect of another Pokemon's attack.",
		id: "shielddust",
		name: "Shield Dust",
		rating: 2.5,
		num: 19
	},
	shieldsdown: {
		desc: "If this Pokemon is a Minior, it changes to its Core forme if it has 1/2 or less of its maximum HP, and changes to Meteor Form if it has more than 1/2 its maximum HP. This check is done on switch-in and at the end of each turn. While in its Meteor Form, it cannot become affected by major status conditions. Moongeist Beam, Sunsteel Strike, and the Abilities Mold Breaker, Teravolt, and Turboblaze cannot ignore this Ability.",
		shortDesc: "If Minior, switch-in/end of turn it changes to Core at 1/2 max HP or less, else Meteor.",
		onResidualOrder: 27,
		isUnbreakable: true,
		id: "shieldsdown",
		name: "Shields Down",
		rating: 3,
		num: 197
	},
	simple: {
		shortDesc: "When this Pokemon's stat stages are raised or lowered, the effect is doubled instead.",
		id: "simple",
		name: "Simple",
		rating: 4,
		num: 86
	},
	skilllink: {
		shortDesc: "This Pokemon's multi-hit attacks always hit the maximum number of times.",
		id: "skilllink",
		name: "Skill Link",
		rating: 4,
		num: 92
	},
	slowstart: {
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns.",
		effect: {
			duration: 5,
			onModifyAtkPriority: 5
		},
		id: "slowstart",
		name: "Slow Start",
		rating: -2,
		num: 112
	},
	slushrush: {
		shortDesc: "If Hail is active, this Pokemon's Speed is doubled.",
		id: "slushrush",
		name: "Slush Rush",
		rating: 2.5,
		num: 202
	},
	sniper: {
		shortDesc: "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.5.",
		id: "sniper",
		name: "Sniper",
		rating: 1,
		num: 97
	},
	snowcloak: {
		desc: "If Hail is active, this Pokemon's evasiveness is multiplied by 1.25. This Pokemon takes no damage from Hail.",
		shortDesc: "If Hail is active, this Pokemon's evasiveness is 1.25x; immunity to Hail.",
		id: "snowcloak",
		name: "Snow Cloak",
		rating: 1.5,
		num: 81
	},
	snowwarning: {
		shortDesc: "On switch-in, this Pokemon summons Hail.",
		id: "snowwarning",
		name: "Snow Warning",
		rating: 4,
		num: 117
	},
	solarpower: {
		desc: "If Sunny Day is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn.",
		onModifySpAPriority: 5,
		id: "solarpower",
		name: "Solar Power",
		rating: 1.5,
		num: 94
	},
	solidrock: {
		shortDesc: "This Pokemon receives 3/4 damage from supereffective attacks.",
		id: "solidrock",
		name: "Solid Rock",
		rating: 3,
		num: 116
	},
	soulheart: {
		desc: "This Pokemon's Special Attack is raised by 1 stage when another Pokemon faints.",
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 stage when another Pokemon faints.",
		id: "soulheart",
		name: "Soul-Heart",
		rating: 3.5,
		num: 220
	},
	soundproof: {
		shortDesc: "This Pokemon is immune to sound-based moves, including Heal Bell.",
		id: "soundproof",
		name: "Soundproof",
		rating: 2,
		num: 43
	},
	speedboost: {
		desc: "This Pokemon's Speed is raised by 1 stage at the end of each full turn it has been on the field.",
		shortDesc: "This Pokemon's Speed is raised 1 stage at the end of each full turn on the field.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		id: "speedboost",
		name: "Speed Boost",
		rating: 4.5,
		num: 3
	},
	stakeout: {
		shortDesc: "This Pokemon's attacking stat is doubled against a target that switched in this turn.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "stakeout",
		name: "Stakeout",
		rating: 2.5,
		num: 198
	},
	stall: {
		shortDesc: "This Pokemon moves last among Pokemon using the same or greater priority moves.",
		id: "stall",
		name: "Stall",
		rating: -1,
		num: 100
	},
	stamina: {
		shortDesc: "This Pokemon's Defense is raised by 1 stage after it is damaged by a move.",
		id: "stamina",
		name: "Stamina",
		rating: 3,
		num: 192
	},
	stancechange: {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
		shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
		onBeforeMovePriority: 0.5,
		id: "stancechange",
		name: "Stance Change",
		rating: 5,
		num: 176
	},
	static: {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be paralyzed.",
		id: "static",
		name: "Static",
		rating: 2,
		num: 9
	},
	steadfast: {
		shortDesc: "If this Pokemon flinches, its Speed is raised by 1 stage.",
		id: "steadfast",
		name: "Steadfast",
		rating: 1,
		num: 80
	},
	steelworker: {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Steel-type attack.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "steelworker",
		name: "Steelworker",
		rating: 3,
		num: 200
	},
	stench: {
		shortDesc: "This Pokemon's attacks without a chance to flinch have a 10% chance to flinch.",
		onModifyMovePriority: -1,
		id: "stench",
		name: "Stench",
		rating: 0.5,
		num: 1
	},
	stickyhold: {
		shortDesc: "This Pokemon cannot lose its held item due to another Pokemon's attack.",
		id: "stickyhold",
		name: "Sticky Hold",
		rating: 1.5,
		num: 60
	},
	stormdrain: {
		desc: "This Pokemon is immune to Water-type moves and raises its Special Attack by 1 stage when hit by a Water-type move. If this Pokemon is not the target of a single-target Water-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
		shortDesc: "This Pokemon draws Water moves to itself to raise Sp. Atk by 1; Water immunity.",
		id: "stormdrain",
		name: "Storm Drain",
		rating: 3.5,
		num: 114
	},
	strongjaw: {
		desc: "This Pokemon's bite-based attacks have their power multiplied by 1.5.",
		shortDesc: "This Pokemon's bite-based attacks have 1.5x power. Bug Bite is not boosted.",
		onBasePowerPriority: 8,
		id: "strongjaw",
		name: "Strong Jaw",
		rating: 3,
		num: 173
	},
	sturdy: {
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
		onDamagePriority: -100,
		id: "sturdy",
		name: "Sturdy",
		rating: 3,
		num: 5
	},
	suctioncups: {
		shortDesc: "This Pokemon cannot be forced to switch out by another Pokemon's attack or item.",
		onDragOutPriority: 1,
		id: "suctioncups",
		name: "Suction Cups",
		rating: 1.5,
		num: 21
	},
	superluck: {
		shortDesc: "This Pokemon's critical hit ratio is raised by 1 stage.",
		id: "superluck",
		name: "Super Luck",
		rating: 1.5,
		num: 105
	},
	surgesurfer: {
		shortDesc: "If Electric Terrain is active, this Pokemon's Speed is doubled.",
		id: "surgesurfer",
		name: "Surge Surfer",
		rating: 2,
		num: 207
	},
	swarm: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Bug-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Bug attacks.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "swarm",
		name: "Swarm",
		rating: 2,
		num: 68
	},
	sweetveil: {
		shortDesc: "This Pokemon and its allies cannot fall asleep.",
		id: "sweetveil",
		name: "Sweet Veil",
		rating: 2,
		num: 175
	},
	swiftswim: {
		shortDesc: "If Rain Dance is active, this Pokemon's Speed is doubled.",
		id: "swiftswim",
		name: "Swift Swim",
		rating: 3,
		num: 33
	},
	symbiosis: {
		desc: "If an ally uses its item, this Pokemon gives its item to that ally immediately. Does not activate if the ally's item was stolen or knocked off.",
		shortDesc: "If an ally uses its item, this Pokemon gives its item to that ally immediately.",
		id: "symbiosis",
		name: "Symbiosis",
		rating: 0,
		num: 180
	},
	synchronize: {
		desc: "If another Pokemon burns, paralyzes, poisons, or badly poisons this Pokemon, that Pokemon receives the same major status condition.",
		shortDesc: "If another Pokemon burns/poisons/paralyzes this Pokemon, it also gets that status.",
		id: "synchronize",
		name: "Synchronize",
		rating: 2,
		num: 28
	},
	tangledfeet: {
		shortDesc: "This Pokemon's evasiveness is doubled as long as it is confused.",
		id: "tangledfeet",
		name: "Tangled Feet",
		rating: 1,
		num: 77
	},
	tanglinghair: {
		shortDesc: "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
		id: "tanglinghair",
		name: "Tangling Hair",
		rating: 2.5,
		num: 221
	},
	technician: {
		desc: "This Pokemon's moves of 60 power or less have their power multiplied by 1.5. Does affect Struggle.",
		shortDesc: "This Pokemon's moves of 60 power or less have 1.5x power. Includes Struggle.",
		onBasePowerPriority: 8,
		id: "technician",
		name: "Technician",
		rating: 4,
		num: 101
	},
	telepathy: {
		shortDesc: "This Pokemon does not take damage from attacks made by its allies.",
		id: "telepathy",
		name: "Telepathy",
		rating: 0,
		num: 140
	},
	teravolt: {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		id: "teravolt",
		name: "Teravolt",
		rating: 3.5,
		num: 164
	},
	thickfat: {
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "Fire/Ice-type moves against this Pokemon deal damage with a halved attacking stat.",
		onModifyAtkPriority: 6,
		onModifySpAPriority: 5,
		id: "thickfat",
		name: "Thick Fat",
		rating: 3.5,
		num: 47
	},
	tintedlens: {
		shortDesc: "This Pokemon's attacks that are not very effective on a target deal double damage.",
		id: "tintedlens",
		name: "Tinted Lens",
		rating: 3.5,
		num: 110
	},
	torrent: {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using a Water-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Water attacks.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "torrent",
		name: "Torrent",
		rating: 2,
		num: 67
	},
	toxicboost: {
		desc: "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 1.5.",
		shortDesc: "While this Pokemon is poisoned, its physical attacks have 1.5x power.",
		onBasePowerPriority: 8,
		id: "toxicboost",
		name: "Toxic Boost",
		rating: 3,
		num: 137
	},
	toughclaws: {
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.3.",
		onBasePowerPriority: 8,
		id: "toughclaws",
		name: "Tough Claws",
		rating: 3.5,
		num: 181
	},
	trace: {
		desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Comatose, Disguise, Flower Gift, Forecast, Illusion, Imposter, Multitype, Schooling, Stance Change, Trace, and Zen Mode.",
		shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
		id: "trace",
		name: "Trace",
		rating: 3,
		num: 36
	},
	triage: {
		shortDesc: "This Pokemon's healing moves have their priority increased by 3.",
		id: "triage",
		name: "Triage",
		rating: 3.5,
		num: 205
	},
	truant: {
		shortDesc: "This Pokemon skips every other turn instead of using a move.",
		onBeforeMovePriority: 9,
		effect: {
			duration: 2
		},
		id: "truant",
		name: "Truant",
		rating: -2,
		num: 54
	},
	turboblaze: {
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon.",
		id: "turboblaze",
		name: "Turboblaze",
		rating: 3.5,
		num: 163
	},
	unaware: {
		desc: "This Pokemon ignores other Pokemon's Attack, Special Attack, and accuracy stat stages when taking damage, and ignores other Pokemon's Defense, Special Defense, and evasiveness stat stages when dealing damage.",
		shortDesc: "This Pokemon ignores other Pokemon's stat stages when taking or doing damage.",
		id: "unaware",
		name: "Unaware",
		rating: 3,
		num: 109
	},
	unburden: {
		desc: "If this Pokemon loses its held item for any reason, its Speed is doubled. This boost is lost if it switches out or gains a new item or Ability.",
		shortDesc: "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability.",
		effect: {},
		id: "unburden",
		name: "Unburden",
		rating: 3.5,
		num: 84
	},
	unnerve: {
		shortDesc: "While this Pokemon is active, it prevents opposing Pokemon from using their Berries.",
		onFoeTryEatItem: false,
		id: "unnerve",
		name: "Unnerve",
		rating: 1.5,
		num: 127
	},
	victorystar: {
		shortDesc: "This Pokemon and its allies' moves have their accuracy multiplied by 1.1.",
		id: "victorystar",
		name: "Victory Star",
		rating: 3,
		num: 162
	},
	vitalspirit: {
		shortDesc: "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it.",
		id: "vitalspirit",
		name: "Vital Spirit",
		rating: 2,
		num: 72
	},
	voltabsorb: {
		desc: "This Pokemon is immune to Electric-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Electric-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Electric moves; Electric immunity.",
		id: "voltabsorb",
		name: "Volt Absorb",
		rating: 3.5,
		num: 10
	},
	waterabsorb: {
		desc: "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Water moves; Water immunity.",
		id: "waterabsorb",
		name: "Water Absorb",
		rating: 3.5,
		num: 11
	},
	waterbubble: {
		desc: "This Pokemon's attacking stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
		onModifyAtkPriority: 5,
		onModifySpAPriority: 5,
		id: "waterbubble",
		name: "Water Bubble",
		rating: 4,
		num: 199
	},
	watercompaction: {
		shortDesc: "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move.",
		id: "watercompaction",
		name: "Water Compaction",
		rating: 2,
		num: 195
	},
	waterveil: {
		shortDesc: "This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		id: "waterveil",
		name: "Water Veil",
		rating: 2,
		num: 41
	},
	weakarmor: {
		desc: "If a physical attack hits this Pokemon, its Defense is lowered by 1 stage and its Speed is raised by 2 stages.",
		shortDesc: "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 2.",
		id: "weakarmor",
		name: "Weak Armor",
		rating: 1,
		num: 133
	},
	whitesmoke: {
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
		id: "whitesmoke",
		name: "White Smoke",
		rating: 2,
		num: 73
	},
	wimpout: {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect. This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, Struggle recoil, and confusion damage.",
		shortDesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
		id: "wimpout",
		name: "Wimp Out",
		rating: 2,
		num: 193
	},
	wonderguard: {
		shortDesc: "This Pokemon can only be damaged by supereffective moves and indirect damage.",
		id: "wonderguard",
		name: "Wonder Guard",
		rating: 5,
		num: 25
	},
	wonderskin: {
		desc: "All non-damaging moves that check accuracy have their accuracy changed to 50% when used on this Pokemon. This change is done before any other accuracy modifying effects.",
		shortDesc: "Status moves with accuracy checks are 50% accurate when used on this Pokemon.",
		onModifyAccuracyPriority: 10,
		id: "wonderskin",
		name: "Wonder Skin",
		rating: 2,
		num: 147
	},
	zenmode: {
		desc: "If this Pokemon is a Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode. If Darmanitan loses this Ability while in Zen Mode it reverts to Standard Mode immediately.",
		shortDesc: "If Darmanitan, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen.",
		onResidualOrder: 27,
		effect: {},
		id: "zenmode",
		name: "Zen Mode",
		rating: -1,
		num: 161
	},
	mountaineer: {
		shortDesc: "On switch-in, this Pokemon avoids all Rock-type attacks and Stealth Rock.",
		id: "mountaineer",
		isNonstandard: true,
		name: "Mountaineer",
		rating: 3.5,
		num: -2
	},
	rebound: {
		desc: "On switch-in, this Pokemon blocks certain status moves and instead uses the move against the original user.",
		shortDesc: "On switch-in, blocks certain status moves and bounces them back to the user.",
		id: "rebound",
		isNonstandard: true,
		name: "Rebound",
		onTryHitPriority: 1,
		effect: {
			duration: 1
		},
		rating: 3.5,
		num: -3
	},
	persistent: {
		shortDesc: "The duration of certain field effects is increased by 2 turns if used by this Pokemon.",
		id: "persistent",
		isNonstandard: true,
		name: "Persistent",
		rating: 3.5,
		num: -4
	},
};
