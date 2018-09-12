import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
// import Map from './Map';
import logo from './logo.svg';
// import  Button  from 'react-bootstrap';
import './App.css';
import _ from 'lodash'
import { getSectionsDB,InsertData , init  } from '../src/javascript/firebase'


const steps = [
  {
    id: '0',
    message: 'Hello ! Namaste !  Welcome to Village Manifesto…',
    trigger: '1',
  },
  {
    id: '1',
    message: 'During our Conversation I would like to know about your expectation from your MLA and Corporators…',
    trigger: '2',
  }, {
    id: '2',
    message: 'It will take abt 5 min to complete all the questions and you can anytime Pause, comeback and resume same…So Can we Start ?',
    trigger: '3',
  },
  {
    id: '3',
    options: [
      { value: 'YES', label: 'YES', trigger: '4' },
      { value: 'NO', label: 'NO', trigger: '3' },
    ],
  },
  // {
  //   id: '4',
  //   message: 'Thank you let me ask your first your self…',
  //   trigger: '5'
  // },
  {
    id: '4',
    message: 'Glad you chose to identify the problems in your village. May we know your name please. ',
    trigger: '6'
  },
  {
    id: '6',
    user: true,
    trigger: '7',
  },
  {
    id: '7',
    message: 'Thanx!, May we know your phone number please. ',    
    trigger: '8'
  },
  {
    id: '8',
    user: true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'value should be a number';
      }
      return true;
    },
    trigger: '9',
  },
  {
    id:'9',
    message:'Please select your district',
    trigger:'10'
  },
  {
    id: '10',
    options: [
      { value: 'Anantapur', label: 'Anantapur', trigger: '11' },
      { value: 'Chittoor', label: 'Chittoor', trigger: '13' },
      { value: 'Cuddapah', label: 'Cuddapah', trigger: '15' },
      { value: 'Kurnool', label: 'Kurnool', trigger: '17' },
      { value: 'Prakasam', label: 'Prakasam', trigger: '19' },

      // { value: 'Nellore', label: 'Nellore', trigger: '3' },
      // { value: 'Guntur', label: 'Guntur', trigger: '3' },
      // { value: 'Krishna', label: 'Krishna', trigger: '3' },
      // { value: 'Visakhapatnam', label: 'Visakhapatnam', trigger: '3' },
      // { value: 'Srikakulam', label: 'Srikakulam', trigger: '3' },


    ],
  },
  {
    id:'11',
    message:'Please select your Mandal',
    trigger:'12'
  },
  {
    id: '12',
    options: [
      { value: 'D.HIRCHAL', label: 'D.HIRCHAL', trigger: '21' },
      { value: 'BOMMANAHAL', label: 'BOMMANAHAL', trigger: '23' },
      { value: 'VIDAPANAKAL', label: 'VIDAPANAKAL', trigger: '25' },
      { value: 'GUNTAKAL', label: 'GUNTAKAL', trigger: '27' },
      { value: 'GOOTY', label: 'GOOTY', trigger: '29' },
    ],
  },
  {
    id:'13',
    message:'Please select your Mandal',
    trigger:'14'
  },
  {
    id: '14',
    options: [
      { value: 'THAMBALLAPALLE', label: 'THAMBALLAPALLE', trigger: '4' },
      { value: 'MULAKALACHERUVU', label: 'MULAKALACHERUVU', trigger: '3' },
      { value: 'PEDDATHIPPASAMUDRAM', label: 'PEDDATHIPPASAMUDRAM', trigger: '3' },
      { value: 'B KOTHAKOTA', label: 'B KOTHAKOTA', trigger: '3' },
      { value: 'GURRAMKONDA', label: 'GURRAMKONDA', trigger: '3' },
      { value: 'KALAKADA', label: 'KALAKADA', trigger: '3' }, 
    ],
  },
  {
    id:'15',
    message:'Please select your Mandal',
    trigger:'16'
  },
  {
    id: '16',
    options: [
      { value: 'KONDAPURAM', label: 'KONDAPURAM', trigger: '4' },
      { value: 'MYLAVARAM', label: 'MYLAVARAM', trigger: '3' },
      { value: 'BRAHMAMGARIMATTAM', label: 'BRAHMAMGARIMATTAM', trigger: '3' },
      { value: 'B KODUR', label: 'B KODUR', trigger: '3' },
      { value: 'KALASAPADU', label: 'KALASAPADU', trigger: '3' },
      { value: 'PORUMAMILLA', label: 'PORUMAMILLA', trigger: '3' }, 
    ],
  },
  {
    id:'17',
    message:'Please select your Mandal',
    trigger:'18'
  },
  {
    id: '18',
    message:'Please select your Mandal',
    options: [
      { value: 'NANDYAL', label: 'NANDYAL', trigger: '4' },
      { value: 'MAHANANDI', label: 'MAHANANDI', trigger: '3' },
      { value: 'SIRVEL', label: 'SIRVEL', trigger: '3' },
      { value: 'RUDRAVARAM', label: 'RUDRAVARAM', trigger: '3' },
      { value: 'ALLAGADDA', label: 'ALLAGADDA', trigger: '3' },
      { value: 'CHAGALAMARRI', label: 'CHAGALAMARRI', trigger: '3' }, 
    ],
  },
  {
    id:'19',
    message:'Please select your Mandal',
    trigger:'20'
  },
  {
    id: '20',
    message:'Please select your Mandal',
    options: [
      { value: 'TRIPURANTHAKAM', label: 'TRIPURANTHAKAM', trigger: '4' },
      { value: 'ULAVAPADU', label: 'ULAVAPADU', trigger: '3' },
      { value: 'VELIGANDLA', label: 'VELIGANDLA', trigger: '3' },
      { value: 'VOLETIVARIPALEM', label: 'VOLETIVARIPALEM', trigger: '3' },
      { value: 'YEDDANAPUDI', label: 'YEDDANAPUDI', trigger: '3' },
      { value: 'YERRAGONDAPALEM', label: 'YERRAGONDAPALEM', trigger: '3' }, 
    ],
  },
  {
    id:'21',
    message:'Please select your Village',
    trigger:'22'
  },
  {
    id: '22',
    options: [
      { value: 'MALAPANAGUDI', label: 'MALAPANAGUDI', trigger: '31' },
      { value: 'OBULAPURAM', label: 'OBULAPURAM', trigger: '31' },
      { value: 'D.HIREHAL', label: 'D.HIREHAL', trigger: '31' },
      { value: 'LAKSHMIPURAM', label: 'LAKSHMIPURAM', trigger: '31' },
      { value: 'PULAKURTHI', label: 'PULAKURTHI', trigger: '31' },
      { value: 'SOMALAPURAM', label: 'SOMALAPURAM', trigger: '31' }, 
    ],
  },
  {
    id:'23',
    message:'Please select your Village',
    trigger:'24'
  },
  {
    id: '24',
    options: [
      { value: 'SIDDARAMPURAM', label: 'SIDDARAMPURAM', trigger: '4' },
      { value: 'HARESAMUDRAM', label: 'HARESAMUDRAM', trigger: '3' },
      { value: 'UNTHAKAL', label: 'UNTHAKAL', trigger: '3' },
      { value: 'UDDEHAL', label: 'UDDEHAL', trigger: '3' },
      { value: 'KALLUDEVANAHALLI', label: 'KALLUDEVANAHALLI', trigger: '3' },
      { value: 'KOLAGANAHALLI', label: 'KOLAGANAHALLI', trigger: '3' }, 
    ],
  },
  {
    id:'25',
    message:'Please select your Village',
    trigger:'26'
  },
  {
    id: '26',
    options: [
      { value: 'Anantapur', label: 'Anantapur', trigger: '4' },
      { value: 'Chittoor', label: 'Chittoor', trigger: '3' },
      { value: 'Cuddapah', label: 'Cuddapah', trigger: '3' },
      { value: 'Kurnool', label: 'Kurnool', trigger: '3' },
      { value: 'Nellore', label: 'Nellore', trigger: '3' },
      { value: 'Prakasam', label: 'Prakasam', trigger: '3' }, 
    ],
  },
  {
    id:'27',
    message:'Please select your Village',
    trigger:'28'
  },
  {
    id: '28',
    options: [
      { value: 'Anantapur', label: 'Anantapur', trigger: '4' },
      { value: 'Chittoor', label: 'Chittoor', trigger: '3' },
      { value: 'Cuddapah', label: 'Cuddapah', trigger: '3' },
      { value: 'Kurnool', label: 'Kurnool', trigger: '3' },
      { value: 'Nellore', label: 'Nellore', trigger: '3' },
      { value: 'Prakasam', label: 'Prakasam', trigger: '3' }, 
    ],
  },
  {
    id:'29',
    message:'Please select your Village',
    trigger:'30'
  },
  {
    id: '30',
    options: [
      { value: 'Anantapur', label: 'Anantapur', trigger: '4' },
      { value: 'Chittoor', label: 'Chittoor', trigger: '3' },
      { value: 'Cuddapah', label: 'Cuddapah', trigger: '3' },
      { value: 'Kurnool', label: 'Kurnool', trigger: '3' },
      { value: 'Nellore', label: 'Nellore', trigger: '3' },
      { value: 'Prakasam', label: 'Prakasam', trigger: '3' }, 
    ],
  },
  {
    id: '31',
    message: 'Please select Sub Sectors',
    trigger: '32'
  },
  // {
  //   id: '10',
  //   user: true,
  //   trigger: '11',
  // }, {
  //   id: '11',
  //   message: 'Ohh good to know that you are from {previousValue} there are all ready some People Submitted Manifesto from your Village. I would like to know your concern about your village.',
  //   trigger: '12',
  // },
  {
    id: '32',
    options: [
      { value: 1, label: 'General Vilalge Info', trigger: '33' },
      { value: 2, label: 'Health', trigger: '33' },
      { value: 3, label: 'Anganvadi', trigger: '33' },
      { value: 4, label: 'Education', trigger: '33' },
    ],
  },
  // {
  //   id:'13',
  //   component: (
  //     <div> 
        
  //     <span trigger='14'>Hello</span>  
  //     </div>
  //   )
  // },
   {
    id: '33',
    message: 'Bye!',
    end: true,
  },


  // {
  //   id: '0',
  //   message: 'Welcome to react chatbot!',
  //   trigger: '1',
  // },
  // {
  //   id: '1',
  //   user: true,
  //   trigger: '2',
  // }, {
  //   id: '2',
  //   message: 'bye',
  //   end: true,
  // },
];

class App extends Component {
  constructor(props) {
    super(props);
    init()
    this.state = {
      name: '',
      gender: '',
      age: '',
      Emplist : []
    };
  }

  HandleGetAllEmployee(list) {
    this.setState({ employee: list });
  }

  componentWillMount() {
    
  }
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  insertdata(){
   
  }
  handleEnd({ steps, values }){
debugger
var data = {
  "1032":{
    que1: steps[4].message,
    ans1: steps[6].message,
    que2 : steps[7].message,
    ans2: steps[8].message,
    que3: steps[9].message,
    ans3: steps[10].message,
    que4: steps[11].message,
    ans4: steps[12].message,
    que4: steps[21].message,
    ans4: steps[22].message,
    que4: steps[31].message,
    ans4: steps[32].message,

  }
}
    InsertData(data).then(data => {
      debugger
    })
  }

  render() {
    return (
      // <Grid>
      // <Row className='show-grid'>
      <div>
        <div>
          {/* <input type="button" value="insert" onClick={this.insertdata} /> */}
        </div>
      <div>
       
     
  </div>


      <div className='show-grid' xs={12} md={8}>
        <div className='logi'>
          <img src='logo.png' class='logo_launch'/>
        </div>
        <ChatBot
        headerTitle="My Village My Manifesto"
        recognitionEnable={true}
        width='100%'
        botAvatar="icon.jpg"
        steps={steps}
        handleEnd={this.handleEnd} />
      </div>
      </div>
      // </Row>
      // </Grid>
      // document.getElementById('root')
    );
  }
}

export default App;
