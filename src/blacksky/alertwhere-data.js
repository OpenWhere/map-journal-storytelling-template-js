// This is currently hard-coded to return an array of some faked data. getData should be completed to
// get the data from an exposed web service.

define([], function () {

  const data = [
    {
      "title": "IDF working 24/7 to shore up 'insufficient' defenses on Lebanese border | The Times of Israel",
      "location": "37.2497,42.4694",
      "description": "Sign In British special forces 'operating alongside rebels in Syria' ‘British special forces are reporte to be operati g alo gsi e Syria oppositio rebels faci g aily attacks by Islamic State (IS) gro p milita ts ear the Jor a ia bor er, the Times ewspaper reporte o Mo ay. Accor i g to a comma er of the New Syria Army (NSA), a it ma e p of former Syria special forces sol iers, the British troops crosse from Jor a to help with reco str cti g efe ces i the village of al-Ta f after a wave of IS assa lts.’ Rea more: British special forces ‘operati g alo gsi e rebels i Syria’",
      "url": "http://www.angrysummit.com/british-special-forces-operating-alongside-rebels-in-syria",
    },
    {
      "title": "Tompolo Evades Nigerian Army, Flees to Libya - Nigeria Sun",
      "location": "3.86667,11.5167",
      "locationName": "Yaounde, Centre, Cameroon",
      "description": "Tompolo Evades Nigerian Army, Flees to Libya - Nigeria Sun Issue 14/234 Tompolo Evades Nigerian Army, Flees to Libya Nigeria News Tuesday 7th June, 2016 Government Ekpemupolo, alias Tompolo Former militant leader, Government Ekpemupolo, alias Tompolo who is on the run from security operatives has reportedly fled to Libya. This was released in a statement by the Joint Niger Delta Liberation Force, JNDLF. The group who had last week, threatened to test six missiles in the Niger Delta states, beginning from tomorrow, said: 'The Military can’t locate Tompolo but we have identified where he is now.' Speaking on behalf of the group, General Akotebe Darikoro, Commander, General Duties, General Torunanaowei Latei, Creeks Network Coordi",
      "url": "http://www.nigeriasun.com/index.php/sid/244712189"
    },
    {
      "title": "Accused in Jagtar Gill murder trial told police she cut hand opening bag of potatoes",
      "location": "45.4167,-75.7",
      "locationName": "Ottawa, Ontario, Canada",
      "description": "'Who would want to do this?' Jagtar Gill murder trial hears interview with daughter An Ottawa woman whose blood was found at the brutal stabbing death of her alleged lover's wife told police the day after the killing that she cut her fingers opening a bag of potatoes, an Ottawa court heard Tuesday.  Gurpreet Ronald, 37, and Bhupinderpal Gill, 40, are on trial for first-degree murder in the death of Gill's wife, Jagtar Gill. The 43-year-old mother of three was found on January 29, 2014, bludgeoned and stabbed multiple times in her home in the Ottawa community of Barrhaven. The co-accused are being tried together but have separate legal teams.  In court on Tuesday, Crown prosecutors played a nearly two-and-a-half hour video-taped police interview done with Gurpreet Ronald the day after Jagtar Gill's death. 'I'm having a breakdown' Ronald tells officer Jagtar Gill, 43, was found dead in her home on Jan. 29, 2014. (Gill family) Ottawa police acting Staff Sgt. Alison Cookson brought Ronald into police headquarters on Elgin Street at 9:30 p.m. to begin the lengthy session.  At the end of the interrogation, Ronald and Cookson get up and walk out of view of the camera but their voices can still be heard. The officer asked Ronald what was wrong.  'I'm having a breakdown and  I'm trying to be strong,' replies a crying Ronald. 'Would you tell me what really happened — I don't have the nerves to ask anybody.'  Cookson said ...",
      "url": "http://www.cbc.ca/news/canada/ottawa/gill-ronald-trial-day-ten-1.3621182"
    }
  ];

  function getData(id) {
    console.log(`retrieve data for id, ${id}`);
    return data;
  }

  return {
    data: getData
  };
});