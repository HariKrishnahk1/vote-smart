fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDczPxz-Qh1oCxft0DY-N62-gsyojZQoSw').then(r => r.json()).then(d => console.log(d.models.map(m=>m.name)));
