import { AboutMe } from "../model/aboutme";
import { Project } from "../model/project";


export const mockLogin = (userName: string, password: string) => new Promise<TokenResponse>(function (resolve, rejected) {
    setTimeout(() => {
        if (userName === "alter@ego.com" && password === "aji_verde") {
            resolve(JSON.parse(
                `{
                 "access_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcklkIjo2NjYsInJvbGUiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkaXNwbGF5TmFtZSI6ImFkbWluIn0sImlhdCI6MTYwMTAyNzU1MywibmJmIjoxNjAxMDI3NTUzLCJleHAiOjE2MDExMTM5NTN9.vHgVtxKGmwDDLLVuT63UBkP8xe4a9hH0B3kkCsAh7K8",
                 "expires_in": 3600,
                 "token_type": "bearer"
                 }`
            ));
        } else {
            rejected(new Unauthorized());
        }
    }, 2000);
    
})
export interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface ApiError {
    description?: string;
}
export class Unauthorized implements ApiError { }

export interface DynamicProject {
    title: string,
    description: string,
    tags: string,
    version: string,
}


export const mockPrintProject = (data: DynamicProject) => new Promise<DynamicProject>((resolve, reject) => {
    setTimeout(() => {
        resolve(data);
    }, 500);
});



export const mockAboutme = () => new Promise<AboutMe>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `{
            "id":"12389asdfasf8",
            "name":"Andrés Maldonado",
            "birthday":596516400000,
            "nationality":"Chilean - French",
            "job":"Wom Chile",
            "github":"https://github.com/devandmus"
            }`
        ));
    }, 500);

});

export const mockProjects = () => new Promise<Project[]>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `[
                {
                "id":"12349as8df90",
                "title":"PWA Gatsby",
                "description":"Proyecto personal PWA con serviceWorker para apps standalone, utilizando Framework Gatsby",
                "version":"1.0.0",
                "link":"https://github.com/devandmus/pwa-gatsby",
                "tag":"JavaScript, Gatsby, React, PWA",
                "timestamp":"765817712000"
                },
                {
                "id":"789asdfas89",
                "title":"PWA Vanilla",
                "description":"Proyecto personal PWA con serviceWorker para apps standalone, utilizando Vanilla Javascript",
                "version":"1.0.0",
                "link":"https://github.com/devandmus/pwa-vanilla",
                "tag":"Javascript, PWA",
                "timestamp":"765817712001"
                },
                {
                "id":"56765asdfasdf8",
                "title":"Koa simple server",
                "description":"Base para levantar servidores en Koa rápidamente",
                "version":"1.0.0",
                "link":"https://github.com/devandmus/koa-simple-server",
                "tag":"Node, JavaScript, Koa",
                "timestamp":"765817712002"
                },
                {
                "id":"56765asdfasdf8",
                "title":"React i18next SuperWay",
                "description":"Internacionalización de nuestro proyecto en React, con descripción modificada.",
                "version":"19.9.2",
                "link":"https://react.i18next.com",
                "tag":"JavaScript, i18n, React",
                "timestamp":"765817712003"
                },
                {
                "id":"25634iuoasdf8",
                "title":"React Lottie Smottie",
                "description":"Animaciones en alta calidad que cuentan con distintos tipos de reproducción, con descripción editada.",
                "version":"1.2.3",
                "link":"https://airbnb.design/lottie/",
                "tag":"Animation, React, Aribnb",
                "timestamp":"765817712004"
                },
                {
                "id":"7890asdf890",
                "title":"Swagger Wagger Magger",
                "description":"Extensión para Swagger, completamente inventada",
                "version":"3.0,2",
                "link":"https://swagger.io",
                "tag":"API, OpenAPI",
                "timestamp":"765817712006"
                }
            ]`
        ));
    }, 500);

});