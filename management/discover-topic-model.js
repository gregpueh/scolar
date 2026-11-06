/* Shared editorial topic vocabulary. Keep moderation/discover-topic-model.js identical. */
const SCHOLAR_DISCOVER_TOPICS=[
 {id:'culture',label:'Kunst & Kultur',icon:'discover',aliases:['Kunst & Kultur','Kultur','Kunst','Museum','Ausstellung','Theater','Musik','Kino']},
 {id:'nightlife',label:'Feiern & Ausgehen',icon:'community',aliases:['Feiern & Ausgehen','Party & Clubbing','Party','Clubbing','Ausgehen','Nachtleben']},
 {id:'sport',label:'Sport & Bewegung',icon:'focus',aliases:['Sport & Bewegung','Sport','Bewegung','Fitness','USI']},
 {id:'campus',label:'Studium & Campus',icon:'exam',aliases:['Studium & Campus','Studium','Campus','Lernen','Workshop','Vortrag','Karriere']}
];
function scholarDiscoverTopicMatches(row,id){const topic=SCHOLAR_DISCOVER_TOPICS.find(t=>t.id===id);if(!topic)return true;const tags=(row.tags||[]).map(t=>String(t).trim().toLocaleLowerCase('de-AT'));return topic.aliases.some(a=>tags.includes(a.toLocaleLowerCase('de-AT')));}
