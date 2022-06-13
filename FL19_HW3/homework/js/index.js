class Display {

  constructor() {
    this.start = document.querySelector('.start');
    this.charField = document.querySelector('.characters-list');
    this.fight = document.querySelector ('.fight');
    this.battleField = document.querySelector('.battle-field');
    this.header = document.querySelector('header');
  }

  healthReduction (enemy, punch) {
    const container = this.battleField.querySelector( '#' + enemy.name.split(' ')[0]);
    const hpBar = container.querySelector('.hp-bar');
    hpBar.style.width = punch + "%"; 
    if (enemy.health <= 0) {
      hpBar.style.width = 0;
    }
  }

  heroIsChosen () {
    this.charField.classList.remove('characters-list__active');
    this.fight.classList.remove('hidden');
    WarCraftGame.clickFight();
    this.start.classList.add('hidden');
    this.battleField.classList.add('battle-field__active');
    this.battleField.innerHTML = 
    `<div class="your-fighter-cont" id="${WarCraftGame.myHero.name.split(' ')[0]}">
        <div class="hp-cont">
          <div class="hp-bar"></div>
        </div>
        <div class="image-cont">
            <img src="${WarCraftGame.myHero.image}" alt="${WarCraftGame.myHero.name}">
            <div class="attributes">
              <div class="attribute">
                <img src="https://img.icons8.com/ios/500/heart.png" alt="health">               
                <span>Health: ${WarCraftGame.myHero.health}</span>
              </div>
              <div class="attribute">
                <img src="https://img.icons8.com/ios/500/sword.png" alt="attack">               
                <span>Attack: ${WarCraftGame.myHero.attack}</span>
              </div>
              <div class="attribute">
                <img src="https://img.icons8.com/ios/500/shield.png" alt="armor">               
                <span>Armor: ${WarCraftGame.myHero.armor}</span>
              </div>
            </div>
        </div>
        <div class="hero-name">${WarCraftGame.myHero.name}</div>
    </div>

    <div class="enemy-fighter-cont" id="${WarCraftGame.compHero.name.split(' ')[0]}">
      <div class="hp-cont">
        <div class="hp-bar"></div>
      </div>
      <div class="image-cont">
      <div class="attributes">
              <div class="attribute">
                <img src="https://img.icons8.com/ios/500/heart.png" alt="health">               
                <span>Health: ${WarCraftGame.compHero.health}</span>
              </div>
              <div class="attribute">
                <img src="https://img.icons8.com/ios/500/sword.png" alt="attack">               
                <span>Attack: ${WarCraftGame.compHero.attack}</span>
              </div>
              <div class="attribute">
                <img src="https://img.icons8.com/ios/500/shield.png" alt="armor">               
                <span>Armor: ${WarCraftGame.compHero.armor}</span>
              </div>
            </div>
        <img src="${WarCraftGame.compHero.image}" alt="${WarCraftGame.compHero.name}">
        
      </div>
      <div class="hero-name">${WarCraftGame.compHero.name}</div>
    </div>`
  }

  addAvatars (char) {
    const newDiv = document.createElement('div');
    const image = document.createElement('img');
    newDiv.classList.add('char');
    newDiv.id = char.name;
    image.src = char.avatar;
    image.alt = char.name;
    newDiv.appendChild(image);
    this.charField.appendChild(newDiv);
    newDiv.addEventListener('click', WarCraftGame.chooseHero);
  }
}  


class Game {
   
  startGame() {
    WarCraftDisplay.start.addEventListener('click', () => {
      alert('Choose your hero')
      WarCraftDisplay.start.classList.add('hidden');
      WarCraftDisplay.header.classList.add('hidden');
      WarCraftDisplay.charField.classList.add('characters-list__active');
      charList.forEach(char => {
        WarCraftDisplay.addAvatars(char); 
      })      
    });
  }

  chooseHero () {
    WarCraftGame.myHero = charList.find(char => {
        return char.name === this.id;
    });
    WarCraftGame.myHp = WarCraftGame.myHero.health;

    let compHeroList = charList.filter(char => {
        return char.name !== WarCraftGame.myHero.name;
    })
    WarCraftGame.compHero = compHeroList[Math.floor(Math.random() * compHeroList.length)];
    WarCraftGame.compHp = WarCraftGame.compHero.health;
    WarCraftDisplay.heroIsChosen();
  }

  clickFight() {
     WarCraftDisplay.fight.addEventListener('click', this.startFight);
  }
  startFight () {
    const hitMyHeroInterval = setInterval(()=>{
      WarCraftGame.myHero.hit(WarCraftGame.compHero);
      if(WarCraftGame.myHero.health <= 0){
        clearInterval(hitMyHeroInterval);
        clearInterval(hitEnemyHeroInterval);
        setTimeout(()=>{
          alert('You loose!');
          document.location.reload();
        }, 300); 
      } else if (WarCraftGame.compHero.health <= 0){
        clearInterval(hitMyHeroInterval);
        clearInterval(hitEnemyHeroInterval);
        setTimeout(()=>{
          alert('You won!');
          document.location.reload();
        }, 300);
      } 
    }, WarCraftGame.myHero.attspeed);

    const hitEnemyHeroInterval = setInterval(()=>{
      WarCraftGame.compHero.hit(WarCraftGame.myHero);
      if(WarCraftGame.myHero.health <= 0){
        clearInterval(hitEnemyHeroInterval);
        clearInterval(hitMyHeroInterval);
        setTimeout(()=>{
          alert('You loose!');
          document.location.reload();
        }, 300);
      } else if (WarCraftGame.compHero.health <= 0){
        clearInterval(hitEnemyHeroInterval);
        clearInterval(hitMyHeroInterval);
        setTimeout(()=>{
          alert('You won!');
          document.location.reload();
        }, 300);
      } 
    }, WarCraftGame.compHero.attspeed);
  } 
}

class Unit {

    constructor(name, health, attack, attspeed, armor, avatar, image){
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.attack = attack;
        this.attspeed = attspeed;
        this.avatar = avatar;
        this.image = image;
    }

    hit(enemy) {
        const dr = (enemy.armor * 0.06) / (1 + enemy.armor * 0.06);
        const damage = Math.floor(this.attack - this.attack * dr);
        enemy.health -= damage;
        this.damageDealed(enemy, damage);
      }

    damageDealed(enemy, damage) {
      let punch;
      if (enemy.name === WarCraftGame.myHero.name) {
        punch = Math.floor((WarCraftGame.myHero.health - damage) / (WarCraftGame.myHp / 100));
      } else {
        punch = Math.floor((WarCraftGame.compHero.health - damage) / (WarCraftGame.compHp / 100));
      }
      WarCraftDisplay.healthReduction(enemy, punch);
    }
}

const magina = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Magina', 700, 75, 500, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/AntiMage.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.png'
  );
const axe = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Axe', 1100, 55, 1000, 7, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Axe.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/axe.png'
  );
const mortred = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Mortred', 650, 90, 600, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PhantomAssassin.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phantom_assassin.png'
  );
const kunkka = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Kunkka', 900, 85, 900, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Admiralproudmoore.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/kunkka.png'
  );
const rexxar = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Rexxar', 850, 75, 600, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Beastmaster.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/nemestice/immortals/art/beastmaster.png'
  );
const centaur = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Bradwarden', 1350, 70, 900, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/CentaurWarchief.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/centaur.png'
  );
const earthshaker = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Earthshaker', 1050, 65, 900, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Earthshaker.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/planetfall/variant.png'
  );
const omniknight = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Omniknight', 1000, 50, 700, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Omniknight.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/omniknight.png'
  );
const brewmaster = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Brewmaster', 950, 80, 1000, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PandarenBrewmaster.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/brewmaster.png'
  );
const sven = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Sven', 950, 85, 600, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/RogueKnight.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/sven.png'
  );
const tiny = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Tiny', 1050, 120, 1100, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2018/04/mountaingiant.png', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tiny.png'
  );
const titan = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Tauren Chieftain', 1050, 90, 1000, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Taurenchieftain.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/elder_titan.png'
  );
const treant = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Treant Protector', 1200, 85, 1300, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TreantProtector.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/treant.png'
  );
const alchemist = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Alchemist', 850, 80, 700, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Alchemist.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/alchemist.png'
  );
const bristleback = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Bristleback', 1050, 70, 700, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Bristleback.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bristleback.png'
  );
const clockwerk  = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Clockwerk ', 1150, 65, 900, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Clockwerkgoblin.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/rattletrap.png'
  );
const davion = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Dragon Knight', 1000, 85, 750, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DragonKnight.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dragon_knight.png'
  );
const magnus = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Magnataur', 950, 65, 750, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Magnataur.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/magnataur.png'
  );
const huskar = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Huskar', 1100, 70, 900, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/SacredWarrior.jpg', 
  'https://cdn.steamstatic.com/apps/dota2/images/international2015/compendium/3d_hero_images/huskar.png'
  );
const sk = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Sand King', 950, 75, 900, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Sandking.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/sand_king.png'
  );
const barathrum = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Barathrum', 1000, 80, 1000, 6, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Spiritbreaker.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/spirit_breaker.png'
  );
const tidehunter = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Tidehunter', 1050, 80, 1000, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TideHunter.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tidehunter.png'
  );
const chaos = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Chaos Knight', 950, 85, 700, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/ChaosKnight.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/chaos_knight.png'
  );
const doom = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Doom Bringer', 1000, 70, 800, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Doombringer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/doom_bringer.png'
  );
const lifestealer = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Naix', 850, 80, 650, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Lifestealer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/life_stealer.png'
  );
const abaddon = new Unit (
  // eslint-disable-next-line no-magic-numbers

  'Abaddon', 1150, 60, 650, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2018/04/deathknight.png', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/abaddon.png'
  );
const lycan = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Lycanthrope', 900, 85, 700, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Lycanthrope.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lycan.png'
  );
const balanar = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Night Stalker', 850, 75, 600, 6, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/NightStalker.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/night_stalker.png'
  );
const underlord = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Pit Lord', 1100, 75, 800, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PitLord.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/abyssal_underlord.png'
  );
const pudge = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Pudge', 1100, 100, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Butcher.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pudge.png'
  );
const leoric = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Skeleton King', 850, 90, 650, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/SkeletonKing.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/skeleton_king.png'
  );
const slardar = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Slithereen Guard', 750, 80, 700, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/SlithereenGuard.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/slardar.png'
  );
const undying = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Undying', 1100, 60, 900, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Undying.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/undying.png'
  );
const sniper = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Sniper', 650, 90, 600, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DwarvenSniper.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/sniper.png'
  );
const juggernaut = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Juggernaut', 650, 90, 600, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Juggernaut.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/juggernaut.png'
  );
const bear = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Lone Druid', 950, 80, 800, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/LoneDruid.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lone_druid.png'
  );
const luna = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Moon Rider', 850, 85, 650, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Moonrider.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/luna.png'
  );
const morphling = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Morphling', 450, 150, 400, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Morphling.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/morphling.png'
  );
const naga = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Naga Siren', 650, 80, 700, 6, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/NagaSiren.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/naga_siren.png'
  );
const pl = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Phantom Lancer', 700, 80, 750, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PhantomLancer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phantom_lancer.png'
  );
const mirana  = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Priestess of the Moon', 750, 70, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/PriestessOfTheMoon.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/mirana.png'
  );
const rikimaru = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Rikimaru', 600, 80, 700, 7, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/StealthAssassin.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/riki.png'
  );
const troll = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Troll Warlord', 750, 85, 600, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TrollWarlord.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/troll_warlord.png'
  );
const bh = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Bounty Hunter', 600, 70, 600, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/BountyHunter.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bounty_hunter.png'
  );
const traxes = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Drow Ranger', 600, 95, 650, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DrowRanger.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/drow_ranger.png'
  );
const faceless = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Faceless Void', 600, 90, 750, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/FacelessVoid.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/faceless_void.png'
  );
const meepo = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Geomancer', 850, 70, 700, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Geomancer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/meepo.png'
  );
const razor = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Lightning Revenant', 750, 80, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/LightningRevenant.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/razor.png'
  );
const medusa = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Gorgon', 600, 85, 700, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Gorgon.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/medusa.png'
  );
const lanaya = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Templar Assassin', 600, 90, 650, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TemplarAssassin.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/templar_assassin.png'
  );
const ursa = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Ursa Warrior', 950, 85, 800, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/UrsaWarrior.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ursa.png'
  );
const vengeful = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Vengeful Spirit', 550, 75, 600, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/VengefulSpirit.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/vengefulspirit.png'
  );
const slark = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Murloc Nightcrawler', 600, 100, 600, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Murlocnightcrawler.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/slark.png'
  );
const bloodseeker = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Bloodseeker', 600, 80, 650, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Bloodseeker.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bloodseeker.png'
  );
const clinkz = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Bone Fletcher', 1100, 90, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/BoneFletcher.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/clinkz.png'
  );
const broodmother = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Broodmother', 750, 80, 900, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Broodmother.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/broodmother.png'
  );
const nyx = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Nerubian Assassin', 800, 65, 900, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/NerubianAssassin.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/nyx_assassin.png'
  );
const weaver = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Nerubian Weaver', 600, 95, 850, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/NerubianWeaver.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/weaver.png'
  );
const sf = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Shadow Fiend', 650, 95, 750, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/ShadowFiend.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/nevermore.png'
  );
const terrorblade = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Soul Keeper', 650, 95, 750, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/SoulKeeper.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/terrorblade.png'
  );
const spectre = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Spectre', 950, 85, 750, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Spectre.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/spectre.png'
  );
const venomancer = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Venomancer', 800, 65, 800, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Venomancer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/venomancer.png'
  );
const viper = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Netherdrake', 850, 80, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Netherdrake.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/viper.png'
  );
const rylai = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Crystal Maiden', 700, 60, 900, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/CrystalMaiden.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/crystal_maiden.png'
  );
const enchantress = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Enchantress', 650, 70, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Enchantress.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/enchantress.png'
  );
const puck = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Faerie Dragon', 550, 80, 650, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/FaerieDragon.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/puck.png'
  );
const chen = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Holy Knight', 700, 65, 750, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/HolyKnight.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/chen.png'
  );
const kotl = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Keeper of the Light', 700, 65, 750, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Keeperofthelight.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/keeper_of_the_light.png'
  );
const zeus = new Unit (
  'Lord of Olympia', 600, 80, 700, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/LordofOlympia.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/zuus.png'
  );
const furion = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Prophet', 600, 95, 650, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Prophet.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/international2015/compendium/3d_hero_images/natures_prophet_cbcndhf3ir9tuj.png'
  );
const silencer = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Silencer', 650, 90, 600, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Silencer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/silencer.png'
  );
const lina = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Slayer', 650, 110, 400, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Slayer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lina.png'
  );
const storm = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Storm Spirit', 750, 85, 750, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/StormSpirit.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/storm_spirit.png'
  );
const windrunner = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Windrunner', 700, 75, 250, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Windrunner.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/windrunner.png'
  );
const batrider = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Batrider', 850, 70, 800, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Batrider.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/batrider.png'
  );
const techies = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Goblin Techies', 500, 30, 600, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/GoblinTechies.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/techies.png'
  );
const invoker = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Invoker', 850, 95, 600, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Invoker.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/invoker.png'
  );
const visage = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Necrolic', 750, 85, 450, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Necrolic.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/visage.png'
  );
const ogre = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Ogre Magi', 750, 70, 900, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/OgreMagi.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ogre_magi.png'
  );
const dazzle = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Shadow Priest', 1500, 75, 800, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Dazzle.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dazzle.png'
  );
const rhasta = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Shadow Shaman', 600, 150, 1000, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/ShadowShaman.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/shadow_shaman.png'
  );
const tinker = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Tinker', 600, 60, 800, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Tinker.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tinker.png'
  );
const leshrac = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Tormented Soul', 600, 100, 800, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TormentedSoul.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/leshrac.png'
  );
const jakiro = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Twin Head Dragon', 850, 60, 900, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/TwinHeadDragon.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/jakiro.png'
  );
const wd = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Witch Doctor', 600, 80, 300, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/WitchDoctor.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/witch_doctor.png'
  );
const apparition = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Ancient Apparition', 600, 60, 800, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Ancientapparition.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ancient_apparition.png'
  );
const bane = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Bane Elemental', 600, 85, 800, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/BaneElemental.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/bane.png'
  );
const ds = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Dark Seer', 800, 75, 900, 6, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DarkSeer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/dark_seer.png'
  );
const dp = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Death Prophet', 900, 80, 750, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DeathProphet.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/death_prophet.png'
  );
const lion = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Demon Witch', 600, 1000, 1000, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/DemonWitch.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lion.png'
  );
const enigma = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Enigma', 850, 60, 800, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Enigma.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/enigma.png'
  );
const lich = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Lich', 600, 60, 900, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Lich.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lich.png'
  );
const necrolyte = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Necrolyte', 1650, 80, 700, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Necrolyte.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/necrolyte.png'
  );
const pugna = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Oblivion', 850, 70, 650, 1, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Oblivion.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pugna.png'
  );
const od = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Obsidian Destroyer', 850, 115, 900, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/ObsidianDestroyer.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/obsidian_destroyer.png'
  );
const akasha = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Queen of Pain', 600, 90, 750, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/QueenofPain.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/queenofpain.png'
  );
const warlock = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Warlock', 600, 80, 900, 2, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Warlock.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/warlock.png'
  );
const whisp = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Whisp', 950, 40, 900, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/wisp.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/wisp.png'
  );
const wyvern = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Winter Wyvern', 850, 50, 800, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Auroth_the_Winter_Wyvern.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/winter_wyvern.png'
  );
const tusk = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Tuskarr', 950, 70, 700, 4,
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Tuskarr.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/tusk.png'
  );
const skywrath = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Skywrath Mage', 550, 120, 600, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/SkywrathMage.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/skywrath_mage.png'
  );
const rubick = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Rubick', 600, 90, 700, 5, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Rubick.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/rubick.png'
  );
const phoenix = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Phoenix', 1000, 65, 900, 6, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Phoenix.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/phoenix.png'
  );
const legion = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Legion Commander', 1150, 80, 600, 4, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/LegionCommander.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/legion_commander.png'
  );
const gyro = new Unit (
  // eslint-disable-next-line no-magic-numbers
  'Gyrocopter', 700, 80, 650, 3, 
  'https://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Gyrocopter.jpg', 
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/gyrocopter.png'
  );  

const charList = [
  magina, axe, mortred, kunkka, rexxar, centaur, earthshaker, omniknight, brewmaster, sven, tiny, titan, 
  treant, alchemist, bristleback, clockwerk, davion, magnus, 
  huskar, sk, barathrum, tidehunter, chaos, doom, lifestealer, abaddon, lycan, balanar,
  underlord, pudge, leoric, slardar, undying, sniper, juggernaut, bear, luna, 
  morphling, naga, pl, mirana, rikimaru, troll, bh, traxes, faceless, meepo, 
  razor, medusa, lanaya, ursa, vengeful, slark, bloodseeker, clinkz, broodmother,
  nyx, weaver, sf, terrorblade, spectre, venomancer, viper, rylai, enchantress, puck,
  chen, kotl, zeus, furion, silencer, lina, storm, windrunner, batrider, techies,
  invoker, visage, ogre, dazzle, rhasta, tinker, leshrac, jakiro, wd, apparition,
  bane, ds, dp, lion, enigma, lich, necrolyte, pugna, od, akasha, warlock, whisp,
  wyvern, tusk, skywrath, rubick, phoenix, legion, gyro 
];

const WarCraftDisplay = new Display();
const WarCraftGame = new Game();
WarCraftGame.startGame();
