import express from 'express';
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

// Mount Vite middleware in development or serve static in production
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
