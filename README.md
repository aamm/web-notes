# Description

This project consists of:

1. A Python REST API based on Flask that can be used to store and retrieve notes. Each note consists of a a note title and a note content. The note title is used as the unique ID of a note.
2. A single HTML page with a JS script that reads and writes notes using the REST API

The REST API has only 3 functions:

1. GET the list of all notes.
2. Given the note title, GET the text of this note.
3. Given the note title and text, POST a new note, or update an existing note.

# How to run this project

## 0. Prerequisites

You need to have Docker installed. All other prerequisites will be downloaded
by Docker itself.

## 1. Clone the git repository

```shell
git clone https://github.com/aamm/web-notes.git
```

## 2. Build the Docker container image

```shell
cd web-notes
docker build -t web-notes:1.0.0 .
```

## 3. Run the container

```shell
docker run -it -p 5000:5000 --rm --name web-notes web-notes:1.0.0
```

This will run the container in interactive mode.

You can now open this URL on a local browser: `http://localhost:5000/`.

### 4. Terminate the container

You just need to press `Control+C` to terminate and delete the container.

Alternatively, you can terminate the container the "Docker way":

```shell
docker stop web-notes
```

The `--rm` option on the `docker run` command tells Docker to completely
destroy the container, including its data, when the container is no long
running.

# Notes

## 1. CLI tools

We have added some CLI tools to the container. These tools call the REST API
using the loopback interface within the running container. Such CLI scripts can
be used to develop integration tests or to simply try the REST API.

### 1.1. To create a new note using the command line

```shell
docker exec web-notes post-note "Note title" "Note contents"
```

### 1.2. To list the notes using the command line

```shell
docker exec web-notes list-notes
```

# How to run the integration tests

Create a new container and then run the following on another terminal:

```shell
docker exec web-notes python3 /tests/RestTest.py
```

If the tests are successful, you should see an output similar with the
following:

```
$ docker exec web-notes python3 /tests/RestTest.py                                                                                                                             
.                                                                                                                                                                                                                  
----------------------------------------------------------------------
Ran 1 test in 0.017s

OK
```

Note that the integration tests invoke the REST API to create notes and to
confirm that the notes were created. Therefore, these tests may be executed on
a brand new container, otherwise the data when the tests start may not match
what the tests expect to find.

## 2. Page development

Client and server sides are as decoupled as possible to allow for the
indepentent development of each part of the system.

A developer can directly open the `index.html` file using a `file:///` URL in
order to work on the page layout (HTML and CSS) and scripting (`script.js`)
without the need to stand up the server side to see the page fully functional.

When opening the HTML page directly on a web browser using `file:///` URLs,
the remote REST API is replaced by a mock implementation on the `rest_api.js`
file. The Docker packaging script replaces this mock implementation with the
`rest_api_prod.js` script so the mock version does not get deployed on the
server.

## 3. Running the container in the background

The container can also be started in the background using:

```shell
docker run -d -p 5000:5000 --rm --name web-notes web-notes:1.0.0
```

To terminate the container, run:

```shell
docker stop web-notes
```

### 4. Editting a note

Each note is identified by its title. So posting a note with the same title
of an existing note will change the contents of the existing note instead of
creating a new note.

