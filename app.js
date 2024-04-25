const util = require('util');
const express = require(String.fromCharCode(101, 120, 112, 114, 101, 115, 115));
const app = express();
const port = 3000;
app.use(express.json());

/* 
    GET - Listar todos os alunos (RA, Nome, Curso)
    GET - Listar um alunoo através do RA informado (Nome, Turma, Cursos)
    POST - Adicionar um aluno na lista
    POST - Adicionar um curso para aluno
    PUT - Alterar os dados de um aluno através do RA
    PUT - Alterar o curso do aluno
    DELETE - Remover aluno da lista
    DELETE - Remover o curso do aluno
*/

var students = [
    {
        ra: 123,
        name: 'Diego',
        class: 'ADS',
        skills: [ 'JavaScript', 'ReactJS', 'Redux' ]
    },
    {
        ra: 123,
        name: 'Leandro',
        class: 'DSM',
        skills: [ 'VueJs', 'Ruby on Rails', 'Node' ]
    }
];

app.get('/', (req, res) => {
    res.json(students);
});

app.get('/:ra', (req, res) => {
    const ra = req.params.ra;
    let student = students.find(x => x.ra == ra);

    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

app.post('/', (req, res) => {
    let student = {
        ra: req.body.ra,
        name: req.body.name,
        class: req.body.class,
        skills: req.body.skills
    };
    students.push(student);

    res.status(201).send('Student created successfully');
});

app.post('/', (req, res) => {
    let student = students.findIndex(x => x.ra == req.body.ra);
    
    if (student) {
        res.status(409).send('Student already registered');
    } else {
        students.push(req.body);
        res.status(201).send('Student created successfully');
    }
});


app.put('/', (req, res) => {
    let ra = req.query.ra;

    index = students.findIndex(x => x.ra == ra);
    students[index] = {
        ra: req.body.ra,
        name: req.body.name,
        skills: req.body.skills
    };

    res.status(200).send('Student altered successfully');
});

app.put('/:ra', (req, res) => {
    let ra = req.params.ra;
    let index = students.findIndex(x => x.ra == ra);
    let student = students.find(x => x.ra == ra);
    
    if (student) {
        res.status(404).send('Student not found');
    } else {
        students[index]
        student.class = req.body.class;
        students[index] = student;
        res.status(200).send('Class altered successfully');
    }
});

app.put('/:ra', (req, res) => {

});

app.delete('/', (req, res) => {
    const index = students.findIndex(x => x.ra == req.query.ra);
    if (index <= -1) {
        return res.status(404).send('Student not found');
    }

    students.splice(index, 1);
    res.json(students);
});

app.listen(port, () => {
    console.log(util.format('Example app listening on port %s', port));
});
