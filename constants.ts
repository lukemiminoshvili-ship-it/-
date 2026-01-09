import { Tour, Round, Language } from './types';

export const GEORGIAN_KEYBOARD_MAP: Record<string, string> = {
  "წ": "ჭ", "ტ": "თ", "ს": "შ", "გ": "ღ", "ჯ": "ჟ", "ზ": "ძ", "ც": "ჩ",
};

export const LATIN_TO_GEO: Record<string, string> = {
  'a': 'ა', 'b': 'ბ', 'g': 'გ', 'd': 'დ', 'e': 'ე', 'v': 'ვ', 'z': 'ზ', 't': 'თ', 'i': 'ი', 'k': 'კ', 'l': 'ლ', 'm': 'მ', 'n': 'ნ', 'o': 'ო', 'p': 'პ', 'j': 'ჟ', 'r': 'რ', 's': 'ს', 'u': 'უ', 'f': 'ფ', 'q': 'ქ', 'y': 'ყ', 'w': 'ჭ', 'x': 'ხ', 'c': 'ჩ', 'h': 'ჰ', 'R': 'ღ', 'S': 'შ', 'C': 'ჩ', 'Z': 'ძ', 'T': 'თ', 'W': 'წ', 'J': 'ჟ'
};

// ქართული ემოჯი-რუკა (გასაღებები ქართულადაა)
export const EMOJI_POOL_KA: Record<string, string[]> = {
  "ა": ["🍍", "🍑", "🦈", "🚑", "🥑"],
  "ბ": ["⚽", "🍌", "🐸", "🍼", "🎈"],
  "გ": ["🎃", "❤️", "🚢", "🎸", "🦒"],
  "დ": ["🍩", "🏁", "🐻", "🥁", "🐘"],
  "ე": ["🔌", "⚡", "🖥️", "🧥", "🥚"],
  "ვ": ["🐅", "🌹", "⭐", "🎻", "🚐"],
  "ზ": ["🔔", "🦈", "🎒", "🦓", "🍕"],
  "თ": ["🐟", "🐭", "❄️", "👀", "🔫"],
  "ი": ["🦌", "🦆", "🏹", "🏛️", "🇮🇹"],
  "კ": ["🐱", "🔑", "💻", "🐰", "🤴"],
  "ლ": ["🦁", "🍋", "🍲", "🔦", "🍭"],
  "მ": ["🌞", "🚗", "🐒", "🔨", "🌙"],
  "ნ": ["🍰", "🛶", "💡", "⛈️", "🥪"],
  "ო": ["🥇", "🌊", "🐌", "🐙", "🍊"],
  "პ": ["🍕", "🍅", "🎹", "🐧", "👮"],
  "ჟ": ["🦒", "🍓", "🗞️", "🧥", "👔"],
  "რ": ["🚀", "📻", "🐙", "💍", "🤖"],
  "ს": ["⌚", "🐘", "🪑", "🏫", "🧊"],
  "ტ": ["🎂", "📱", "🚜", " taxi", "🚕"],
  "უ": ["🔨", "🎓", "🏘️", "👣", "☂️"],
  "ფ": ["🐝", "✏️", "🔦", "🎈", "🦶"],
  "ქ": ["🥥", "👒", "🏠", "🌪️", "🤴"],
  "ღ": ["🐷", "☁️", "🍷", "🚪", "🧥"],
  "ყ": ["☕", "🌸", "🎧", "🍇", "🧀"],
  "შ": ["🍫", "⛲", "🧤", "🦌", "🧣"],
  "ჩ": ["🍵", "👜", "🐦", "👞", "☕"],
  "ც": ["🔥", "🐿️", "🌈", "☁️", "🌙"],
  "ძ": ["🐶", "🦴", "🐮", "🧗", "⛓️"],
  "წ": ["📖", "🌧️", "🐥", "🧴", "🖋️"],
  "ჭ": ["🐜", "♟️", "🥛", "🥣", "🧪"],
  "ხ": ["🌳", "🧅", "⚔️", "🍞", "🎨"],
  "ჯ": ["➕", "🚙", "🧙", "💰", "🃏"],
  "ჰ": ["🚁", "🍔", "🧗", "🏥", "🧤"],
};

export const EMOJI_POOL_EN: Record<string, string[]> = {
  "a": ["🍎", "🐜", "🚑"], "b": ["⚽", "🍌", "🐻"], "c": ["🐱", "🚗", "☁️"], "d": ["🐶", "🍩", "🥁"],
  "e": ["🥚", "🐘", "🔌"], "f": ["🐟", "🔥", "🐸"], "g": ["🍇", "🎸", "🦒"], "h": ["🎩", "🏠", "🍔"],
  "i": ["🍦", "🇮🇹", "🏃"], "j": ["🚙", "🧥", "🍯"], "k": ["🔑", "🪁", "🤴"], "l": ["🦁", "🍋", "💡"],
  "m": ["🌞", "🐒", "🌙"], "n": ["🍰", "🍰", "🍰"], "o": ["🍊", "🐙", "🧅"], "p": ["🍕", "🐧", "🎹"],
  "q": ["👑", "❓", "🤫"], "r": ["🚀", "🌹", "📻"], "s": ["⌚", "🦈", "⭐"], "t": ["🐯", "🚜", " taxi"],
  "u": ["☂️", "🦄", "🆙"], "v": ["🎻", "🌋", "🚐"], "w": ["⌚", "🌊", "🍉"], "x": ["🎻", "🎻", "🎻"],
  "y": ["🪀", "⛵", "🌻"], "z": ["🦓", "🤐", "⚡"]
};

const WORDS_KA = {
  easy: ["მზე", "ცა", "ხე", "წყალი", "პური", "გზა", "სახლი", "კარი", "ფანჯარა", "სკოლა", "ბავშვი", "დედა", "მამა", "ხელი", "ფეხი", "თავი", "წიგნი", "კალამი", "ფურცელი", "საათი", "კატა", "ძაღლი", "თევზი", "ჩიტი", "ყვავილი", "ბაღი", "ეზო", "ქუჩა", "ქალაქი", "სოფელი", "მანქანა", "ავტობუსი", "მატარებელი", "თამაში", "სიცილი", "ტირილი", "ძილი", "დილა", "ღამე", "დღე", "მთა", "ზღვა", "ტბა", "მდინარე", "ქარი", "წვიმა", "თოვლი", "სკამი", "მაგიდა", "ფანქარი", "ჩანთა", "ფეხსაცმელი", "ქუდი", "პალტო", "კაბა", "მეგობარი", "სტუმარი", "ოჯახი", "საჭმელი", "წყურვილი", "შიმშილი", "გემო", "სუნი", "ფერი", "ხმა", "სიჩუმე", "სითბო", "სიცივე", "შუქი", "ჩრდილი", "დრო", "წამი", "წუთი", "თოვლი", "კალამი", "დოლარი", "ჯილდო", "მინდორი", "ნიავი", "ხალხი", "სიტყვა", "ყური", "ცხვირი", "ენა", "თითი", "მხარი", "მუხლი", "ნიკაპი", "კისერი", "წელი", "მუცელი", "გული", "ფილტვი", "ღვიძლი", "თირკმელი", "ტვინი"],
  medium: ["ტელეფონი", "კომპიუტერი", "მეგობრობა", "სწავლა", "განათლება", "ისტორია", "ბუნება", "კულტურა", "ენა", "სიტყვა", "აზრი", "იდეა", "კითხვა", "პასუხი", "მოგზაურობა", "საზოგადოება", "წესრიგი", "პასუხისმგებლობა", "მუსიკა", "სპორტი", "თეატრი", "კინო", "მხატვრობა", "ლიტერატურა", "ტექნიკა", "პროგრამა", "ინტერნეტი", "ეკრანი", "კლავიატურა", "შეხვედრა", "საუბარი", "დიალოგი", "განხილვა", "შეთანხმება", "გეგმა", "მიზანი", "შედეგი", "პროცესი", "განვითარება", "ენერგია", "მოძრაობა", "ბალანსი", "ფორმა", "ზომა", "სივრცე", "მანძილი", "მიმართულება", "სიჩქარე", "რესურსი", "შესაძლებლობა", "არჩევანი", "გადაწყვეტილება", "შეცდომა", "გამოცდილება", "ცოდნა", "უნარი", "პრაქტიკა", "წარმატება", "ლამაზი", "კეთილი", "სამშობლო", "გზაჯვარედინი", "მშვენიერი", "მნიშვნელოვანი", "საინტერესო", "სასარგებლო", "სასურველი", "საოცარი", "საიდუმლო", "საიმედო", "საერთო", "სამართლიანი", "სამაგალითო", "საუკეთესო", "საჭირო", "სახალისო", "სახელოვანი", "სუფთა", "სწრაფი", "მშვიდი", "მხიარული", "მძიმე", "მსუბუქი", "მკაცრი", "რბილი", "მაგარი", "ცივი", "ცხელი", "თბილი", "ტკბილი", "მწარე", "მჟავე", "მარილიანი", "უგემური", "ხმაურიანი", "წყნარი"],
  hard: ["დამოუკიდებლობა", "გლობალიზაცია", "კონსტიტუცია", "დემოკრატია", "ინოვაცია", "სტრატეგია", "ინტეგრაცია", "ინტელექტი", "კრეატიულობა", "არქიტექტურა", "ფილოსოფია", "იდეოლოგია", "მრავალფეროვნება", "მდგრადობა", "ეკოლოგია", "ტექნოლოგია", "კომუნიკაცია", "ორგანიზაცია", "ადმინისტრაცია", "მენეჯმენტი", "პასუხისმგებლობა", "თვითგანვითარება", "თვითრეალიზაცია", "კონცენტრაცია", "ანალიზი", "სინთეზი", "ლოგიკა", "სტრუქტურა", "სისტემა", "მექანიზმი", "ალგორითმი", "კონცეფცია", "პრინციპი", "მეთოდოლოგია", "ინტერპრეტაცია", "შეფასება", "ოპტიმიზაცია", "პერსპექტივა", "ტრანსფორმაცია", "მოდიფიკაცია", "ინფორმაცია", "მონაცემი", "სტატისტიკა", "კორელაცია", "კოორდინაცია", "რეგულაცია", "ინიციატივა", "კომპლექსურობა", "იდენტობა", "ავთენტურობა", "თავისუფლება", "შთაგონება", "სინათლე", "სიყვარული", "სიბრძნე", "სიმამაცე", "სიკეთე", "სამართლიანობა", "პატივისცემა", "ერთგულება", "თავდადება", "შემოქმედება", "აღმოჩენა", "ექსპერიმენტი", "არგუმენტი", "დასკვნა", "თეორია", "ჰიპოთეზა", "ფაქტი", "მოვლენა", "გამოწვევა", "ბარიერი", "გადაჭრა", "ეფექტურობა", "პროდუქტიულობა", "ხარისხი", "სტანდარტი", "კრიტერიუმი", "ობიექტურობა", "სუბიექტურობა", "რეალობა", "ვირტუალობა", "პარალელი", "პარადიგმა", "პარამეტრი", "პროპორცია", "სიმეტრია", "ასიმეტრია", "ჰარმონია", "კონფლიქტი", "დიალექტიკა"]
};

const WORDS_EN = {
  easy: ["sun", "sky", "tree", "water", "bread", "road", "house", "door", "window", "school", "child", "mother", "father", "hand", "foot", "head", "book", "pen", "paper", "clock", "cat", "dog", "fish", "bird", "flower", "garden", "yard", "street", "city", "village", "car", "bus", "train", "game", "laugh", "cry", "sleep", "morning", "night", "day", "mountain", "sea", "lake", "river", "wind", "rain", "snow", "chair", "table", "pencil", "bag", "shoes", "hat", "coat", "dress", "friend", "guest", "family", "food", "thirst", "hunger", "taste", "smell", "color", "sound", "silence", "warmth", "cold", "light", "shadow", "time", "second", "earth", "moon", "star", "fruit", "milk", "egg", "meat", "rice", "cake", "ball", "park", "room", "floor", "wall", "roof", "lamp", "desk", "box", "key", "wood", "gold", "iron", "rock", "ship", "boat", "bike", "work", "play"],
  medium: ["computer", "phone", "friendship", "learning", "education", "history", "nature", "culture", "language", "sentence", "idea", "question", "answer", "travel", "society", "responsibility", "music", "sport", "theater", "cinema", "painting", "literature", "technology", "internet", "screen", "keyboard", "meeting", "discussion", "dialogue", "agreement", "plan", "goal", "result", "process", "development", "movement", "balance", "space", "distance", "direction", "speed", "resource", "opportunity", "choice", "decision", "experience", "knowledge", "skill", "practice", "success", "failure", "attention", "memory", "creativity", "motivation", "confidence", "logic", "reason", "system", "method", "style", "beauty", "safety", "health", "energy", "future", "nature", "science", "artist", "doctor", "farmer", "lawyer", "police", "writer", "simple", "modern", "global", "unique", "direct", "public", "common", "active", "mental", "social", "formal", "proper", "normal", "visual", "audio", "stable", "strong", "bright", "famous", "useful", "gentle", "smooth"],
  hard: ["independence", "globalization", "constitution", "democracy", "innovation", "strategy", "integration", "intelligence", "architecture", "philosophy", "ideology", "diversity", "sustainability", "ecology", "communication", "organization", "administration", "management", "selfdevelopment", "selfrealization", "concentration", "analysis", "synthesis", "structure", "mechanism", "algorithm", "concept", "principle", "methodology", "interpretation", "evaluation", "optimization", "perspective", "transformation", "modification", "information", "data", "statistics", "correlation", "coordination", "regulation", "initiative", "complexity", "identity", "authenticity", "entrepreneurship", "productivity", "efficiency", "reliability", "creativity", "motivation", "foundation", "generation", "definition", "perception", "resolution", "indication", "suggestion", "conclusion", "connection", "protection", "production", "transition", "projection", "reflection", "rejection", "selection", "collection", "inspection", "correction", "direction", "detection", "reaction", "attraction", "distinction", "expansion", "depression", "expression", "impression", "possession", "profession", "progression", "succession", "suppression", "vibration", "translation", "reputation", "navigation", "meditation", "limitation", "foundation", "dedication", "corruption", "conception"]
};

export const PRICES = { HINT: 20, SKIP: 50, REVEAL_LETTER: 20, VIP_UNLOCK: 500 };

export const generateTours = (lang: Language): Tour[] => {
  const tours: Tour[] = [];
  let roundCounter = 1;
  const wordPool = lang === 'ka' ? WORDS_KA : WORDS_EN;

  for (let t = 1; t <= 50; t++) {
    const rounds: Round[] = [];
    const difficulty = t <= 10 ? 'easy' : t <= 25 ? 'medium' : t <= 40 ? 'hard' : 'easy';
    const pool = wordPool[difficulty as keyof typeof wordPool];

    for (let r = 0; r < 5; r++) {
      const word = pool[(t * 5 + r) % pool.length];
      rounds.push({
        id: roundCounter++,
        display: word,
        answer: word,
        hintText: lang === 'ka' ? `სიტყვაში არის ${word.length} ასო` : `The word has ${word.length} letters`
      });
    }

    tours.push({
      id: t,
      name: lang === 'ka'
        ? (t <= 10 ? "მარტივი" : t <= 25 ? "საშუალო" : "რთული")
        : (t <= 10 ? "Easy" : t <= 25 ? "Medium" : "Hard"),
      rounds
    });
  }
  return tours;
};

export const VIP_TOURS_KA: Tour[] = [
  {
    id: 101, name: "VIP: ექსტრემი", isVip: true,
    rounds: [
      { id: 1001, display: "ჰელიკოპტერი", answer: "ჰელიკოპტერი", hintText: "მფრინავი ტრანსპორტი" },
      { id: 1002, display: "ბედნიერება", answer: "ბედნიერება", hintText: "ემოცია" },
    ]
  }
];

export const VIP_TOURS_EN: Tour[] = [
  {
    id: 101, name: "VIP: Extreme", isVip: true,
    rounds: [
      { id: 1001, display: "Independence", answer: "Independence", hintText: "Self-governance" },
      { id: 1002, display: "Globalization", answer: "Globalization", hintText: "World integration" },
    ]
  }
];