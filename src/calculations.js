import baseStats from '../baseStats';
import multiplierLevel from '../multiplierLevel';

export function convertIV(id, stam, atk, def, multiplier) {
  const {
    BaseStamina,
    BaseAttack,
    BaseDefense,
  } = baseStats.find((b) => b.id === id);
  const stamina = (BaseStamina + (stam || 0));
  const attack = (BaseAttack + (atk || 0));
  const defense = (BaseDefense + (def || 0));
  return {
    minCP: Math.floor(Math.pow(BaseStamina, 0.5) * BaseAttack * Math.pow(BaseDefense, 0.5) * Math.pow(multiplier, 2)/ 10),
    currCP: Math.floor(Math.pow(stamina, 0.5) * attack * Math.pow(defense, 0.5) * Math.pow(multiplier, 2)/ 10),
    maxCP: Math.floor(Math.pow(BaseStamina + 15, 0.5) * (BaseAttack + 15) * Math.pow(BaseDefense + 15, 0.5) * Math.pow(multiplier, 2)/ 10),
    percentage: Math.round((stam + atk + def) / 45 * 1000) / 10
  }
}

export function calculateCP(mon) {
  const {
    pokemon_id,
    individual_attack,
    individual_defense,
    individual_stamina,
    cp_multiplier,
    additional_cp_multiplier,
  } = mon;
  const multiplier = cp_multiplier + (additional_cp_multiplier || 0);

  const {
    level
  } = multiplierLevel.find((m) => Math.round(m.multiplier * 1000)/1000 === Math.round(multiplier * 1000)/1000);

  return {
    ...convertIV(pokemon_id, individual_stamina, individual_attack, individual_defense, multiplier),
    level: level
  };
}
