const PLACEHOLDER_VIDEO = '/Plantation_life_documentary_video_202607131034.mp4';

export const CURRICULUM_MODULES = {
  elementary: {
    id: 'elementary',
    title: 'Elementary Curriculum Package: Waves of Immigration',
    grades: 'Grades 3-5',
    checkpoints: [
      {
        id: 'immigration-waves',
        label: 'Immigration Waves',
        video: PLACEHOLDER_VIDEO,
        text: 'Between 1850 and 1920, thousands of families traveled across the Pacific Ocean to work on Hawaii\'s sugar plantations. Workers came from Japan, China, the Philippines, Portugal, Korea, Puerto Rico, and many other places. Each group brought their own language, food, and traditions that helped shape local culture in Waipahu.',
        challenge: {
          type: 'quiz',
          question: 'Why did many families immigrate to Hawaii in the late 1800s?',
          choices: [
            'To work on sugar plantations',
            'To build railroads in California',
            'To study at universities',
            'To join the Hawaiian royal court'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Correct! Sugar plantations needed many workers, and immigrants came seeking jobs and a new life.',
            incorrect: 'Not quite. Most immigrant families came to Hawaii to work on sugar plantations.'
          }
        }
      },
      {
        id: 'camp-map',
        label: 'Camp Origins',
        video: PLACEHOLDER_VIDEO,
        text: 'Plantation camps were organized into sectors, often grouped by where workers came from. Families lived in small cottages near the fields. Mapping these origins helps us understand how different communities lived side by side and shared spaces like stores, schools, and bathhouses.',
        challenge: {
          type: 'quiz',
          question: 'What did plantation camp sectors often reflect?',
          choices: [
            'Where immigrant workers came from',
            'Which crops grew tallest',
            'How much rain fell each month',
            'Which ships arrived first'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Right! Camp sectors often grouped families by homeland, though neighbors from many places still shared daily life.',
            incorrect: 'Try again. Camp sectors were often organized around the homelands immigrant workers came from.'
          }
        }
      },
      {
        id: 'bango-tags',
        label: 'Bango Tags',
        video: PLACEHOLDER_VIDEO,
        text: 'Every plantation worker received a metal bango tag with a unique number. The company store used this number to track purchases and deduct wages. Tags were worn daily and became a symbol of plantation life. Match each worker to their correct bango number in the activity below!',
        challenge: {
          type: 'game',
          gameId: 'bango-match'
        }
      },
      {
        id: 'vocabulary',
        label: 'Key Words',
        video: PLACEHOLDER_VIDEO,
        text: 'Kaukau means food or a meal in Hawaiian Pidgin. A Luna was a field overseer who assigned daily work. Hole-hole is the work of stripping dead leaves from sugarcane stalks. Learning these words helps you read primary sources and oral histories from plantation days.',
        challenge: {
          type: 'quiz',
          question: 'What does "kaukau" mean in Hawaiian Pidgin?',
          choices: [
            'Food or a meal',
            'A metal worker tag',
            'A field overseer',
            'A sugar boiling pot'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Great job! Kaukau is one of many Pidgin words that grew from shared plantation life.',
            incorrect: 'Not quite. Kaukau means food or a meal — workers talked about kaukau tins they carried to the fields.'
          }
        }
      }
    ]
  },
  middle: {
    id: 'middle',
    title: 'Middle School Research Guide: Life in the Camp Sectors',
    grades: 'Grades 6-8',
    checkpoints: [
      {
        id: 'camp-sectors',
        label: 'Camp Sectors',
        video: PLACEHOLDER_VIDEO,
        text: 'Waipahu\'s plantation camps were divided into sectors — Filipino Camp, Japanese Camp, Puerto Rican Camp, and others. Each sector had cottages, shared bathhouses, and community gathering spots. Understanding sector layout reveals how the plantation structured daily life and how communities maintained cultural identity.',
        challenge: {
          type: 'quiz',
          question: 'What was a primary purpose of dividing the plantation into camp sectors?',
          choices: [
            'To organize housing and community life by worker groups',
            'To separate sugarcane fields by height',
            'To rank workers by age',
            'To store different types of sugar'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Correct. Sectors organized where families lived and how communities formed within the plantation system.',
            incorrect: 'Think about housing and community — sectors organized where worker families lived.'
          }
        }
      },
      {
        id: 'oral-histories',
        label: 'Oral Histories',
        video: PLACEHOLDER_VIDEO,
        text: 'Oral histories are firsthand accounts recorded from people who lived through plantation days. Transcripts preserve voices that might otherwise be lost. When reading oral histories, note who is speaking, when they lived in the camp, and what details reveal daily routines, struggles, and celebrations.',
        challenge: {
          type: 'quiz',
          question: 'Why are oral history transcripts valuable for researchers?',
          choices: [
            'They preserve firsthand accounts from people who lived the history',
            'They replace all written government records',
            'They are always shorter than textbooks',
            'They only describe sugar manufacturing machines'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Exactly. Oral histories give personal perspectives that official records often leave out.',
            incorrect: 'Oral histories are valuable because they capture firsthand experiences from people who lived it.'
          }
        }
      },
      {
        id: 'period-tools',
        label: 'Period Tools',
        video: PLACEHOLDER_VIDEO,
        text: 'Digital catalogs of plantation-era tools — cane knives, kaukau tins, bango tags, and store ledgers — connect objects to stories. Each artifact shows how technology, labor, and daily survival intersected. Use catalog entries to trace who used a tool and what it reveals about camp life.',
        challenge: {
          type: 'quiz',
          question: 'What can a plantation-era artifact like a bango tag tell us?',
          choices: [
            'How the company tracked workers and store purchases',
            'The exact sugar content of each harvest',
            'Which ships sailed to Japan',
            'The weather forecast for Waipahu'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Well done. Artifacts like bango tags reveal how the plantation system tracked and managed workers.',
            incorrect: 'Artifacts like bango tags show how companies tracked workers and deducted store purchases from wages.'
          }
        }
      }
    ]
  },
  high: {
    id: 'high',
    title: 'High School Analytical Package: Sugar Economics & Labor Struggles',
    grades: 'Grades 9-12',
    checkpoints: [
      {
        id: 'masters-servants',
        label: 'Masters & Servants Act',
        video: PLACEHOLDER_VIDEO,
        text: 'The Masters and Servants Act of 1850 created a legal framework that bound laborers to plantation contracts. It limited workers\' ability to leave jobs and gave employers significant control. This law was a key economic force behind Hawaii\'s plantation labor system and shaped immigration patterns for decades.',
        challenge: {
          type: 'quiz',
          question: 'What did the Masters and Servants Act of 1850 primarily do?',
          choices: [
            'Bound laborers to plantation contracts with limited freedom to leave',
            'Granted all workers full land ownership',
            'Abolished the sugar industry in Hawaii',
            'Established free public universities'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Correct. The Act legally bound workers to contracts, reinforcing plantation labor control.',
            incorrect: 'The Act bound laborers to contracts, limiting their ability to leave plantation work.'
          }
        }
      },
      {
        id: 'camp-evolution',
        label: 'Camp Evolution',
        video: PLACEHOLDER_VIDEO,
        text: 'Plantation camps evolved from rough barracks for single men to family cottages with schools, stores, and churches. This structural change reflected shifting labor needs — recruiting families meant stabilizing the workforce. Analyzing camp layout over time reveals how economic demands reshaped community life.',
        challenge: {
          type: 'quiz',
          question: 'Why did plantation camps evolve from barracks to family cottages?',
          choices: [
            'Plantations sought a more stable workforce by recruiting families',
            'Workers demanded luxury housing',
            'Sugar cane grew better near cottages',
            'Barracks were banned by international law'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Right. Family housing helped plantations retain workers across generations.',
            incorrect: 'Camps evolved to house families because plantations wanted a more stable, long-term workforce.'
          }
        }
      },
      {
        id: 'labor-strike',
        label: '1920 Strike',
        video: PLACEHOLDER_VIDEO,
        text: 'The 1920 labor strike was a pivotal moment when thousands of plantation workers across ethnic groups united to demand better wages and conditions. Despite divisions the company tried to exploit, shared grievances over pay, hours, and treatment drove collective action — a landmark in Hawaii labor history.',
        challenge: {
          type: 'quiz',
          question: 'What made the 1920 plantation strike historically significant?',
          choices: [
            'Workers across ethnic groups united for better wages and conditions',
            'It ended all sugar production permanently',
            'It was the first strike ever in world history',
            'It was led only by plantation owners'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Correct. Cross-ethnic solidarity despite company divide-and-rule tactics was a defining feature.',
            incorrect: 'The 1920 strike was significant because workers across ethnic groups united for better conditions.'
          }
        }
      },
      {
        id: 'synthesis',
        label: 'Analysis',
        video: PLACEHOLDER_VIDEO,
        text: 'Sugar economics, restrictive labor laws, camp architecture, and strikes are interconnected. Economic demand for cheap labor drove immigration; laws like the Masters and Servants Act enforced it; camp design managed daily life; and strikes like 1920 pushed back. Strong analysis connects these forces rather than treating them in isolation.',
        challenge: {
          type: 'quiz',
          question: 'Which best describes the relationship between sugar economics and labor struggles in Hawaii?',
          choices: [
            'Economic demand for labor shaped laws, camp life, and worker resistance together',
            'They were completely unrelated historical topics',
            'Labor struggles only happened after sugar ended',
            'Economics mattered but laws and camps did not'
          ],
          correctIndex: 0,
          feedback: {
            correct: 'Excellent analysis. Economic forces, legal frameworks, daily camp life, and labor action were deeply linked.',
            incorrect: 'These topics connect — economic demand shaped laws, camp structure, and the conditions that led to strikes.'
          }
        }
      }
    ]
  }
};

export function getCurriculumModule(moduleId) {
  return CURRICULUM_MODULES[moduleId] ?? null;
}
