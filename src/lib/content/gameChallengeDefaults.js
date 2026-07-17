/** Default content for curriculum game challenges (CMS + learner fallbacks). */

export const DEFAULT_BANGO_PAIRS = [
  { id: 'tag-142', number: '142', name: 'Tanaka', origin: 'Japan' },
  { id: 'tag-087', number: '087', name: 'Santos', origin: 'Philippines' },
  { id: 'tag-203', number: '203', name: 'Silva', origin: 'Portugal' },
  { id: 'tag-056', number: '056', name: 'Wong', origin: 'China' },
];

export const DEFAULT_BANGO_TITLE = 'Match each worker to their bango tag number';

export const DEFAULT_BELL_SHIFTS = [
  {
    id: 1,
    title: 'The Wake Bell',
    time: '5:00 AM',
    bellContext: 'A heavy metal bell rings across the camp, echoing off the iron rooftops. You have 30 minutes to dress, eat, and assemble.',
    question: 'How do you prepare your kaukau (lunch) tin for the long day ahead in the fields?',
    choices: [
      {
        text: 'Rice & Salted Fish',
        fact: 'Rice was the staple food for Asian workers, while salted fish or vegetables kept well in the hot sun. Sharing food at lunch was the birth of Hawaii\'s local plate lunch culture.',
        stamp: 'Japanese',
        stampName: 'HAWAII - NIPPON',
      },
      {
        text: 'Cold Taro & Salt',
        fact: 'Native Hawaiian and Portuguese workers often brought taro, sweet potato, or bread. Taro provided sustained energy for intense physical labor in the sugarcane rows.',
        stamp: 'Hawaiian',
        stampName: 'HAWAII - ALOHA',
      },
    ],
  },
  {
    id: 2,
    title: 'Field Assignment',
    time: '6:00 AM',
    bellContext: 'You report to the overseer (Luna). The morning air is damp, and the cane fields stretch endlessly up toward the mountains.',
    question: 'What task is assigned to you by the Luna today?',
    choices: [
      {
        text: 'Hole-Hole (Stripping Dead Leaves)',
        fact: 'Hole-hole was mostly done by women. Stripping dry cane leaves by hand was grueling work; workers wore thick denim or canvas leggings and sleeves to protect against sharp cane leaves.',
        stamp: 'Filipino',
        stampName: 'HAWAII - FILIPINO',
      },
      {
        text: 'Cane Cutting (Cane knife labor)',
        fact: 'Cutting cane required swinging a heavy steel knife all day. Stalks had to be cut clean at the ground level to maximize sugar extraction, which was hot, backbreaking work.',
        stamp: 'Puerto Rican',
        stampName: 'HAWAII - BORICUA',
      },
    ],
  },
  {
    id: 3,
    title: 'Midday Lunch Break',
    time: '11:30 AM',
    bellContext: 'The noon whistle blows. You gather under the shade of a large banyan tree with workers from other camp sectors.',
    question: 'How do you spend your 30-minute break with your fellow camp residents?',
    choices: [
      {
        text: 'Swap a piece of sweet bread',
        fact: 'Sharing food was how different cultures communicated before they shared a common language. The Portuguese introduced traditional stone ovens (forno) to bake sweet breads and malasadas.',
        stamp: 'Portuguese',
        stampName: 'HAWAII - AÇORES',
      },
      {
        text: 'Share pickled vegetables',
        fact: 'Korean and Japanese workers shared kimchi and tsukemono, introducing bold flavors to the camp. This food sharing laid the foundation for modern Hawaiian Pidgin vocabulary.',
        stamp: 'Korean',
        stampName: 'HAWAII - CHOSEN',
      },
    ],
  },
  {
    id: 4,
    title: 'The Company Store',
    time: '4:30 PM',
    bellContext: 'The work whistle signals the end of the shift. On the way back to the barracks, you stop by the plantation store.',
    question: 'How do you check out your purchase at the plantation store counter?',
    choices: [
      {
        text: 'Provide your metal Bango tag',
        fact: 'Each worker was issued a metal bango tag with a number. The store clerk recorded transactions under your number, directly deducting payments from your monthly wages.',
        stamp: 'Chinese',
        stampName: 'HAWAII - DONGAN',
      },
      {
        text: 'Pay in cash (US Dollars)',
        fact: 'Cash was rare; most transactions went through the company ledger. Cash allowed workers to save for independent shops or to send money home to families in their home countries.',
        stamp: 'Okinawan',
        stampName: 'HAWAII - RYUKYU',
      },
    ],
  },
  {
    id: 5,
    title: 'Evening After the Whistle',
    time: '6:30 PM',
    bellContext: 'Dusk falls over the Waipahu valley. The cooking fires burn outside the camp cottages, and music begins to drift from the porches.',
    question: 'How do you wind down before the wake bell rings again tomorrow?',
    choices: [
      {
        text: 'Play music on the porch',
        fact: 'Porches (lanai) were vital social spaces. Workers sang folk songs, played the Okinawan sanshin, Spanish guitar, or ukulele, finding comfort and solidarity in shared melodies.',
        stamp: 'Okinawan_Porch',
        stampName: 'CAMP MUSIC - 1900',
      },
      {
        text: 'Go to the community bathhouse',
        fact: 'The hot baths (furo) were popular for washing off the red dirt and soot. It was a rare place of relaxation where workers of all ranks and backgrounds stood equal.',
        stamp: 'Camp_Furo',
        stampName: 'FURO BATH - WAIPAHU',
      },
    ],
  },
];

function blankPair() {
  return { id: `tag-${Date.now()}`, number: '', name: '', origin: '' };
}

function blankChoice() {
  return { text: '', fact: '', stamp: '', stampName: '' };
}

function blankShift(index = 0) {
  return {
    id: index + 1,
    title: '',
    time: '',
    bellContext: '',
    question: '',
    choices: [blankChoice(), blankChoice()],
  };
}

export function defaultGameChallenge(gameId) {
  if (gameId === 'bango-match') {
    return {
      type: 'game',
      gameId: 'bango-match',
      title: DEFAULT_BANGO_TITLE,
      pairs: DEFAULT_BANGO_PAIRS.map((p) => ({ ...p })),
    };
  }
  if (gameId === 'bell-to-bell') {
    return {
      type: 'game',
      gameId: 'bell-to-bell',
      shifts: DEFAULT_BELL_SHIFTS.map((s) => ({
        ...s,
        choices: s.choices.map((c) => ({ ...c })),
      })),
    };
  }
  return { type: 'game', gameId };
}

export function normalizeBangoPairs(pairs) {
  if (!Array.isArray(pairs) || pairs.length === 0) {
    return DEFAULT_BANGO_PAIRS.map((p) => ({ ...p }));
  }
  return pairs.map((p, i) => ({
    id: p?.id || `tag-${i + 1}`,
    number: String(p?.number ?? ''),
    name: String(p?.name ?? ''),
    origin: String(p?.origin ?? ''),
  }));
}

export function normalizeBellShifts(shifts) {
  if (!Array.isArray(shifts) || shifts.length === 0) {
    return DEFAULT_BELL_SHIFTS.map((s) => ({
      ...s,
      choices: s.choices.map((c) => ({ ...c })),
    }));
  }
  return shifts.map((s, i) => {
    const choices = Array.isArray(s?.choices) && s.choices.length >= 2
      ? s.choices.map((c) => ({
        text: String(c?.text ?? ''),
        fact: String(c?.fact ?? ''),
        stamp: String(c?.stamp ?? ''),
        stampName: String(c?.stampName ?? ''),
      }))
      : [blankChoice(), blankChoice()];
    return {
      id: Number.isFinite(s?.id) ? s.id : i + 1,
      title: String(s?.title ?? ''),
      time: String(s?.time ?? ''),
      bellContext: String(s?.bellContext ?? ''),
      question: String(s?.question ?? ''),
      choices,
    };
  });
}

export function bangoChallengeForSave(challenge) {
  const pairs = normalizeBangoPairs(challenge?.pairs)
    .map((p) => ({
      ...p,
      number: p.number.trim(),
      name: p.name.trim(),
      origin: p.origin.trim(),
    }))
    .filter((p) => p.number || p.name || p.origin);
  return {
    type: 'game',
    gameId: 'bango-match',
    title: String(challenge?.title ?? DEFAULT_BANGO_TITLE).trim() || DEFAULT_BANGO_TITLE,
    pairs: pairs.length ? pairs : DEFAULT_BANGO_PAIRS.map((p) => ({ ...p })),
  };
}

export function bellChallengeForSave(challenge) {
  const shifts = normalizeBellShifts(challenge?.shifts)
    .map((s, i) => {
      const choices = s.choices
        .map((c) => ({
          text: c.text.trim(),
          fact: c.fact.trim(),
          stamp: c.stamp.trim(),
          stampName: c.stampName.trim(),
        }))
        .filter((c) => c.text || c.fact);
      return {
        id: i + 1,
        title: s.title.trim(),
        time: s.time.trim(),
        bellContext: s.bellContext.trim(),
        question: s.question.trim(),
        choices: choices.length >= 2 ? choices : choices.concat(Array.from({ length: 2 - choices.length }, blankChoice)),
      };
    })
    .filter((s) => s.title || s.question || s.bellContext);
  return {
    type: 'game',
    gameId: 'bell-to-bell',
    shifts: shifts.length
      ? shifts
      : DEFAULT_BELL_SHIFTS.map((s) => ({
        ...s,
        choices: s.choices.map((c) => ({ ...c })),
      })),
  };
}

export { blankPair, blankChoice, blankShift };
