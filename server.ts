import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function generateAtmosphericLore(character: any): string {
  const p1 = `Born beneath the ancient constellations that crown ${character.originRealm}, ${character.fullName} was never destined for a quiet life. Even in their early youth, the elders of the ${character.race} recognized the rare resonance of power stirring within them—an innate mastery destined to shape them into one of the era's most revered ${character.class}s. While others bowed to mundane toil, ${character.name} studied the forgotten scrolls of the realm, seeking the lost crucible where ancient champions once communed with primal deities.`;

  const p2 = `Their true trial arrived when catastrophe descended upon ${character.originRealm}. Venturing into the sunken subterranean catacombs alone, ${character.name} faced the primeval guardians to claim the legendary ${character.signatureWeapon}. In that crucible of blood, steel, and eldritch fire, pushed to the absolute limits of mortal endurance, they unlocked their signature arcana: ${character.specialAbility}. Attuned with the relic ${character.secondaryItem}, the weapon responded to their ${character.alignment.toLowerCase()} conviction as if forged from their own soul.`;

  const p3 = `Now celebrated throughout border taverns and royal citadels as ${character.title || 'the Legendary Wanderer'}, ${character.fullName} carries the weight of a solemn oath. Though shadowed by an unspoken debt to the shadows of ${character.originRealm}, their resolve remains unbreakable. As whispers of a great convergence ripple across the continent, this valiant ${character.subclass} stands ready at the crucible's edge, prepared to carve their name into the immortal annals of history.`;

  return `${p1}\n\n${p2}\n\n${p3}`;
}

// API endpoint to generate rich paragraphs-long backstory using Gemini
app.post('/api/generate-backstory', async (req, res) => {
  try {
    const { character } = req.body;
    if (!character) {
      return res.status(400).json({ error: 'Character data is required' });
    }

    const prompt = `You are a legendary fantasy chronicler and master dark fantasy novelist writing for an ancient alchemical grimoire.
Write an immersive, atmospheric, rich, paragraphs-long (3 to 4 detailed paragraphs) fantasy backstory and legend for this character:

- Name: ${character.fullName}
- Class: ${character.class} (${character.subclass})
- Race/Ancestry: ${character.race}
- Alignment: ${character.alignment}
- Realm of Origin: ${character.originRealm}
- Signature Armament: ${character.signatureWeapon}
- Secondary Relic: ${character.secondaryItem}
- Signature Feat/Arcana: ${character.specialAbility}
- Core Attributes: STR ${character.stats?.strength}, DEX ${character.stats?.dexterity}, CON ${character.stats?.constitution}, INT ${character.stats?.intelligence}, WIS ${character.stats?.wisdom}, CHA ${character.stats?.charisma}

Include:
1. Paragraph 1 (The Crucible of Origin): Their humble, tragic, or ominous beginnings in ${character.originRealm}, and the ancient sign or catalyst that marked them as a ${character.class}.
2. Paragraph 2 (The Trial of Steel & Sorcery): The perilous ordeal, dragon hunt, or forbidden dungeon where they forged/claimed their ${character.signatureWeapon} and awakened their ${character.specialAbility}.
3. Paragraph 3 (The Sworn Oath & Looming Destiny): Their current place in the realms, their secret vow or dark flaw, their reputation among taverns and high courts, and the perilous destiny calling them forward.

Style: Vivid, dramatic, literary dark fantasy prose with rich sensory details. Do not include markdown headers, bullet points, or metacommentary; output pure story paragraphs separated by double newlines.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (response && response.text) {
        return res.json({ backstory: response.text });
      }
    } catch (genError: any) {
      console.warn('Gemini API call threw:', genError?.message);
    }

    // Graceful rich narrative fallback
    const fallbackLore = generateAtmosphericLore(character);
    return res.json({ backstory: fallbackLore });
  } catch (error: any) {
    console.error('Server error generating backstory:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate backstory' 
    });
  }
});

function generateProceduralCourseHook(character: any): string {
  return `⚔️ QUEST HOOK: The Crucible of ${character.originRealm}

📜 THE CALL TO ADVENTURE:
An emergency dispatch arrives with an alchemical wax seal from ${character.originRealm}. Whispers tell of an ancient cataclysm rekindling within the sunken vaults where ${character.fullName} first claimed their ${character.signatureWeapon}. Dark emissaries seek to reverse their ${character.specialAbility} arcana to break the planar seals protecting the realm.

🗺️ THE 3 COURSE MILESTONES:
1. Act I (The Wilderness Infiltration): Navigate the perilous outskirts of ${character.originRealm}. Decipher coded alchemical runes left by ancient scholars and rescue a trapped scout who knows the cult's underground lair.
2. Act II (The Sunken Sanctum Trial): Battle through corrupted elemental sentinels. Solve an ancient prism puzzle utilizing ${character.secondaryItem} to unlock the inner sanctum before necrotic miasma floods the halls.
3. Act III (The Primeval Confrontation): Engage the Abyssal Crucible Fiend in a climactic duel. ${character.name} must channel their full ${character.class} training to cleanse the heart-stone and seal the rift forever.

🏆 ALCHEMICAL REWARDS & SPOILS:
750 gold marks, a Pristine Philosopher's Draught (+25 permanent Max Mana/Health), and the eternal allegiance of ${character.originRealm}.`;
}

// API endpoint to generate rich mini-adventure / course hook using Gemini
app.post('/api/generate-course-hook', async (req, res) => {
  try {
    const { character } = req.body;
    if (!character) {
      return res.status(400).json({ error: 'Character data is required' });
    }

    const prompt = `You are an elite tabletop RPG dungeon master and dark fantasy quest designer.
Create an exciting, immersive mini-adventure quest hook ("Course Hook") specifically tailored to this character's backstory and traits:

- Character Name: ${character.fullName}
- Class & Subclass: ${character.class} (${character.subclass})
- Race/Ancestry: ${character.race}
- Alignment: ${character.alignment}
- Realm of Origin: ${character.originRealm}
- Signature Armament: ${character.signatureWeapon}
- Secondary Relic: ${character.secondaryItem}
- Signature Arcana/Feat: ${character.specialAbility}
- Backstory: ${character.backstory}
- Stats: Health ${character.health}, Mana ${character.mana}, Strength ${character.strength}, Intelligence ${character.intelligence}, Charisma ${character.charisma}

Structure the mini-adventure with:
1. ⚔️ Quest Title (Thematic and heroic)
2. 📜 The Hook & Call to Adventure (Directly referencing their personal backstory, homeland, or past debts)
3. 🗺️ The 3 Course Milestones:
   - Milestone 1: The Investigation / Dangerous Journey
   - Milestone 2: The Crucible Puzzle / Infiltration / Mid-Boss Trial
   - Milestone 3: The Climactic Confrontation / Moral Choice
4. 🏆 Spoils & Alchemical Artifact Rewards

Style: High fantasy, immersive, actionable for a tabletop RPG or narrative campaign.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (response && response.text) {
        return res.json({ courseHook: response.text });
      }
    } catch (genError: any) {
      console.warn('Gemini API call threw for course hook:', genError?.message);
    }

    const fallbackCourse = generateProceduralCourseHook(character);
    return res.json({ courseHook: fallbackCourse });
  } catch (error: any) {
    console.error('Server error generating course hook:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate course hook' 
    });
  }
});


const server = http.createServer(app);

// Mount Vite middleware in development or serve static in production
if (process.env.NODE_ENV !== 'production') {
  const isHmrDisabled = process.env.DISABLE_HMR === 'true';
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: isHmrDisabled ? false : { server },
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
