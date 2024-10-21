import './courseMap.css'
import './levelDiv/levelDiv.css'
import LevelDiv from './levelDiv/LevelDiv'
import levelone from "../../../assets/level1.jpg"
import leveltwo from "../../../assets/level2.jpg"
import levelthree from "../../../assets/level3.jpg"
import levelfour from "../../../assets/level4.jpg"
import levelfive from "../../../assets/level5.jpg"
import levelsix from "../../../assets/level6.webp"
import levelseven from "../../../assets/level7.jpg"
import leveleight from "../../../assets/level8.jpg"
import levelnine from "../../../assets/level9.jpg"
import levelten from "../../../assets/level10.jpg"
import leveleleven from "../../../assets/level11.jpg"

const CourseMap = () => {


    const currentLevel = 11;

    const levels = [
        {
            text:'Level 1: Alphabet and Basic Pronunciation',
            imgsrc:levelone
        },
        {
            text:'Level 2: Greetings, Polite Expressions',
            imgsrc:leveltwo
        },
        {
            text:'Level 3: Numbers, Counting, and Dates',
            imgsrc:levelthree
        },
        {
            text:'Level 4: Vocabulary and Common Phrases',
            imgsrc:levelfour
        },
        {
            text:'Level 5: Personal Pronouns and Simple Sentences',
            imgsrc:levelfive
        },
        {
            text:'Level 6: Verb Conjugation (Present Tense)',
            imgsrc:levelsix
        },
        {
            text:'Level 7: Describing People, Places, and Objects',
            imgsrc:levelseven
        },
        {
            text:'Level 8: Food and Dining',
            imgsrc:leveleight
        },
        {
            text:'Level 9: Travel and Transportation',
            imgsrc:levelnine
        },
        {
            text:'Level 10: Advanced Vocabulary & Conversations',
            imgsrc:levelten
        },
        {
            text:'GET YOUR CERTIFICATE FROM SPEAKIFY',
            imgsrc:leveleleven
        },
    ];
  return (
    <div className='container-map'>
        {levels.map((e,i)=>{
            return <LevelDiv text={levels[i].text} imgsrc={levels[i].imgsrc } key={i} numberLvl={i} currentLevel={currentLevel}/>
        })} 
    </div>
  )
}

export default CourseMap