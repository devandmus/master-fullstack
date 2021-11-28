import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";
import { mockPrintProject, DynamicProject } from '../../utils/mock-response';

const ProjectPanel = () => {
    let history = useHistory();
    let location = useLocation();
    const { t } = useTranslation();
    let { from } = (location.state as any) || { from: { pathname: "/" } };

    const [title, setTitle] = useState('' as string);
    const [description, setDescription] = useState('' as string);
    const [tags, setTags] = useState('' as string);
    const [version, setVersion] = useState('' as string);

    const setTypeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const currentValue = e.target.value;
        switch (e.target.name) {
            case "title":
                setTitle(currentValue);
                break;
            case "description":
                setDescription(currentValue);
                break;
            case "tags":
                setTags(currentValue);
                break;
            case "version":
                setVersion(currentValue)
                break;
            default:
                break;
        }
    }

    const isValid = (e: FormEvent): void => {
        e.preventDefault();
        if(
            title !== ''
            && description !== ''
            && tags !== ''
            && version !== ''
        ) {
            mockPrintProject({ title, description, tags, version } as DynamicProject)
                .then(data => {
                    alert(`Object data:\n\n ${
                        Object
                            .keys(data)
                            .map((key: string) => `${key}: ${data[key as keyof DynamicProject]}`)
                            .join('\n')
                        }
                    `)
                })
        }
    }

    return (
        <Wrapper>
            <ContentWrapper>
                <TitleForm>{t("project.project_title")}</TitleForm>
                <ProjectInputPannel onSubmit={isValid}>
                    <ProjectForm name="title" type="text" placeholder={t("project.title_placeholder")} value={title} onChange={setTypeText}/>
                    <ProjectForm name="description" type="text" placeholder={t("project.description_placeholder")} value={description} onChange={setTypeText}/>
                    <ProjectForm name="tags" type="text" placeholder={t("project.tags_placeholder")} value={tags} onChange={setTypeText}/>
                    <ProjectForm name="version" type="text" placeholder={t("project.version_placeholder")} value={version} onChange={setTypeText}/>
                    <FooterForm>
                        <ButtonForm className="bk" type="submit" value={t("project.button_delete") != null ? t("project.button_delete") as string: "Delete"} />
                        <ButtonForm type="submit" value={t("project.button_post") != null ? t("project.button_post") as string: "Post"} />
                    </FooterForm>
                </ProjectInputPannel>
            </ContentWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const FooterForm = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  font-size: 45px;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`

const ProjectInputPannel = styled.form`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
  }


`;

const ErrorDescription = styled(Caption)`

  color: ${themes.light.warning};


`;

const ProjectForm = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }

`;

const ButtonForm = styled.input`
  padding: 11px 28px;
  border-radius: 4px;
  margin-left: 10px;
  border: none;
  background-color: ${({ className }) => className ? themes.light.warning : themes.light.primary};
  color: ${themes.dark.text1};

`;


export default ProjectPanel;
