import '../../style';
import React from 'react';
import querystring from 'querystring';
import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';

const url = 'https://www.ahgora.com.br';

class Login extends React.Component {

    handleOnClick(){
      axios.post(`${url}/externo/login`, querystring.stringify({
        empresa: 'a821664',
        matricula: '17',
        senha: 2432,
      }), {
        headers: [
          { 'Content-Type': 'application/x-www-form-urlencoded' },
          { 'Access-Control-Allow-Origin': 'http://localhost:8080' }
        ]
      }).then(function(loginData) {
        const cookie = loginData.headers['set-cookie'][0];

        axios.get(`${url}/externo/batidas`, {
          headers: {
            'Cookie': cookie.split(';')[0],
          },
        }).then(function(data) {
          const $ = cheerio.load(data.data);
          $('#tableTotalize').remove();

          let tableTimes = $('#content table').text();

          tableTimes = tableTimes.replace(/\d{2}:\d{2}~\d{2}:\d{2}/g, '');

          const matchTime = /^\s+\d{2}[:]\d{2}(, \d{2}[:]\d{2}){0,3}/gm;

          const times = tableTimes.match(matchTime).map(time => time.trim());

          let [ hour, minute ] = [0, 0];

          const today = times[times.length - 1].split(', ');
          let [ t1, t2, t3, t4 ] = getTimes(today);

          console.log('');

          console.log(today);

          switch (today.length) {
            case 1:
              console.log('You can go to lunch at 11:30');
              break;
            case 2:
              let backFromLunchAt = clone(t2);
              backFromLunchAt.setHours(backFromLunchAt.getHours() + 1);
              console.log(`You can come back from lunch at ${moment(backFromLunchAt).format('HH:mm')} (±10)`);
              break;
            case 3:
              let section = clone(t2);
              section.setHours(t2.getHours() - t1.getHours());
              section.setMinutes(t2.getMinutes() - t1.getMinutes());
              const first = section;

              let d = new Date();
              d.setSeconds(0);
              d.setMinutes(0);
              d.setHours(9);
              d.setHours(d.getHours() - first.getHours());
              d.setMinutes(d.getMinutes() - first.getMinutes());

              section = clone(t3);
              section.setHours(t3.getHours() + d.getHours());
              section.setMinutes(t3.getMinutes() + d.getMinutes());

              const beatTheDot = section;

              console.log(`You can leave at ${moment(beatTheDot).format('HH:mm')} (±10)`);
              break;
          }

          console.log('');
          console.log('');
          console.log('');
        });
      });
    }

    render() {
        return <div className='login'>
          <div className='parent'>
            <div className='child' style={{ margin: '0 auto;'}}>
              <div className="container">
                <div className="col-lg-12">
                  <div className="form-signin">
                    <div>
                      <input type="username" name="username" className="form-control" placeholder="Matrícula" required="" autofocus=""/>
                      <input type="password" name="password" className="form-control" placeholder="Password" required=""/>
                      <button className="btn btn-lg btn-primary" type="submit" onClick={ this.handleOnClick }>Go</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>;
    }
}

export default Login;

const getTime = t => {
  if (!t) return null;
  const date = new Date();
  const [ h, m ] = t.split(':');
  date.setSeconds(0);
  date.setMinutes(m);
  date.setHours(h);
  return date;
};
const getTimes = ([ t1, t2, t3, t4 ]) => {
  return [
    getTime(t1),
    getTime(t2),
    getTime(t3),
    getTime(t4),
  ];
};
