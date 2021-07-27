import React, { useEffect, useMemo, useState } from 'react';
import './scss/home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '@@/store/actions/profile';
import { Row, Col, Timeline, Card, Tag, Badge, Typography, Progress, Divider, Skeleton } from 'antd';
import listeners from '@@/services/listeners';
import CustomSkeleton from '@@/components/skeleton/skeleton';
const { Title, Text } = Typography;

export default function Home() {
  const dispatch = useDispatch();
  const {  
    name = '',
    splash_image = '',
    splash_intro = '',
    userID = 'manas22@gmail.com',
    tech_skills = {},
    tech_products = {},
    projects = {},
    career_path = [],
    education_path = [],
   } = useSelector(state => state.profile);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [listenerID, setListenerID] = useState(window.innerWidth);
  const breakEvenpoint = 420;
  const componentDidUnmount = () => {
   listeners.removeWindowResizeListener(listenerID);
  };
  const windowResize = () => {
    setWindowSize(window.innerWidth);
  }
  useEffect(() => {
    dispatch(getProfile(userID));
    let ID = listeners.addWindowResizeListener(windowResize);
    setListenerID(ID);
    return componentDidUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const productCardHTML = useMemo(() => {
    return (
      <ul className="productlist">
        {
          tech_products.products.map((product) => {
            return (
              <li className="products">
                <Card>
                    <figure>
                      <img src={product.url} alt={product.title}/>
                      <Divider type="horizontal" />
                        <figcaption>
                          <Title level={4}>{product.title}</Title>
                        </figcaption>
                    </figure>
                  </Card>
              </li>
            )
          })
        }
      </ul>
    );
  }, [tech_products]);
  const careerTimelineHTML = useMemo(() => {
    console.log(windowSize);
    return (
      <Timeline mode={windowSize > breakEvenpoint ? 'alternate': 'left'} className={{"career__line": true}}>
        {
          career_path.path.map((career) => {
            return (
              <Timeline.Item className={{ "career__stop": true, "career__stop--alternate": (windowSize > breakEvenpoint) }} >
                <Card className={"career__stop-desc"}>
                 <figure>
                    <img src={career.url} width="50px" alt="Organisation Logo"/>
                    <figcaption>
                      <Title level={3}>{career.org}</Title>
                    </figcaption>
                </figure> 
                 <section>
                 <p code>{career.group}</p>
                 <Text code>{career.role}</Text>
                 <br/>
                 <Text disabled>{career.more}</Text>
                 </section> 
                </Card>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    );
  }, [windowSize, career_path]);
  const educationTimelineHTML = useMemo(() => {
    return (
      <Timeline mode={windowSize > breakEvenpoint ? 'alternate': 'left'} className={{"career__line": true}}>
        {
          education_path.path.map((career) => {
            return (
              <Timeline.Item className={{ "career__stop": true, "career__stop--alternate": (windowSize > breakEvenpoint) }} >
                <Card className={"career__stop-desc"}>
                 <figure>
                  <img src={career.url} width="50px" alt="Organisation Logo"/>
                    <figcaption>
                      <Title className="pulldown-h3" level={3}>{career.org}</Title>
                    </figcaption>
                </figure> 
                 <section>
                 <p>{career.stream}</p>
                 <Text code>{career.role}</Text>
                 <br/>
                 <Text disabled>{career.more}</Text>
                 </section> 
                </Card>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    );
  }, [windowSize, education_path]);
  const projectHTML = useMemo(() => {
    return projects.history.map((prjt) => {
     return (
    <Card>
        <section className="project">
          <figure className="project__figure">
            <img src={prjt.company_url} className="project__figure-img" alt="Organisation Logo"></img>
            <figcaption className="project__figure-caption">
              <Title level={3}>{prjt.title}</Title>
            </figcaption>
          </figure>
        </section>
        <Divider type="horizontal" />
        <section className="details">
          <details open>
            <summary className="project__technology">
              <span  className="project__technology-head">Technology</span>
            </summary>
            {
              prjt.technology.map((tech) => {
                return (
                  <Tag color="default">
                      {tech}
                  </Tag>
                )
              })
            }
          </details>
          <details open>
            <summary className="project__summary">
              <span  className="project__summary-head">Project Brief</span>
            </summary>
            <p className="project__info">
              {prjt.summary}
            </p>
          </details>
        </section>
    </Card>)
    })
  }, [projects]);
  const skillsCardHTML = useMemo(() => {
    // console.log(tech_skills);
      return tech_skills.skills.map((skillArr) => {
        return (
          <Col className={{[skillArr[0]]: true, 'skill-col': true}} xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 8, offset: 2}}  sm={{ span: 20, offset: 2}} >
            <Card>
              <Title level={3}>{skillArr[0]}</Title>
              <Divider type="horizontal" />
              <ul className="">
              {(skillArr[1].map(skill => {
                const yearExp = skill.exp >> 0;
                const monthexp = skill.exp - yearExp;
                return (
                  <li className="skill">
                    {/* <Tag color="#108ee9"> */}
                    <Badge color={'gold'}/>
                    <Text strong>{skill.title}</Text>
                    <Text className="skill__experience" code>{yearExp > 0 ? `${yearExp} yrs`: ''} {(monthexp > 0 ? `${(monthexp * 10) >> 0} mnth` : '')}</Text>
                    <Progress percent={skill.rate * 100}  status={skill.running} format={() =>skill.icon } />
                  </li>
                )
              }))}
            </ul>
            </Card>
          </Col>
        )
      });
  }, [tech_skills])
  const TEMPLATE = (
    <section className="homepg">
      <article className="homepg__rowone">
        <Row justify="space-around" align="middle" className="homepg__rowonewrap">
          <Col xs={24} lg={10} sm={12}>
          <section className="rowone-colone">
            {(name ?  
              (
                <img src={splash_image} alt="Author splash"/>
              )
                :
              (<Skeleton.Image active={true}/>)
            )}
            </section>
          </Col>
          <Col xs={20} lg={14} sm={12}>
            <section className="rowone-coltwo">
              {(name ? (
                <>
                  <Title level={2}>
                    Hi My Name is {name}
                    </Title>
                    <Title level={3}>
                      {splash_intro}
                  </Title>
                </>
              ):
              (
                <Skeleton active={true}  width={"100%"}/>
              )
              )}
            </section>
          </Col>
        </Row>
      </article>
      <Divider type="horizontal" orientation="left"><Title className="headingTitle">Technology Stack </Title></Divider>
      <article className="homepg__rowtwo">
        <Row  align="top" className="homepg__rowtwo_colone">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
            
            {
              (tech_skills.intro) ? 
              (
                <Title level={4}>{tech_skills.intro}</Title>
              )
              :
                (<Skeleton active={true}/>)
            }
          </Col>
        </Row>
        <Row align="top">
            {skillsCardHTML}
        </Row>
      </article>
      <Divider type="horizontal" orientation="left"><Title className="headingTitle">Product Experience</Title></Divider>
        <article className="homepg__rowthree">
        <CustomSkeleton loading={tech_products.intro ?? true}>
          <Row  align="top">
            <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
              <Title level={4}>{tech_products.intro}</Title>
            </Col>
          </Row>
          <Row align="top">
            <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
              {productCardHTML}
            </Col>
          </Row>
        </CustomSkeleton>
      </article>
      <Divider type="horizontal" orientation="left"><Title className="headingTitle">Industrial Projects</Title></Divider>
      <article className="homepg__rowfour">
        <CustomSkeleton loading={projects.intro ?? true}>
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
            <Title level={4}>{projects.intro}</Title>
          </Col>
        </Row>
        <Row align="top">
          <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
            {projectHTML}
          </Col>
        </Row>
      </CustomSkeleton>
      </article>
      <Divider type="horizontal" orientation="left"><Title className="headingTitle">Career Journey</Title></Divider>
      <article className="homepg__rowfive">
      <CustomSkeleton loading={career_path.intro ?? true}>
          <Row  align="top">
            <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
              <Title level={4}> {career_path.intro}</Title>
            </Col>
          </Row>
          <Row align="top">
            <Col xs={{span: 20, push: 0, offset: 2}} md={{ span: 18, push: 3, offset: 0 }} lg={{ span: 20, push: 2, offset: 0 }}  sm={{span: 20, push: 0, offset: 2}} >
              {careerTimelineHTML}
            </Col>
          </Row>
      </CustomSkeleton>
      </article>
      <Divider type="horizontal" orientation="left"><Title className="headingTitle">Education Journey</Title></Divider>
      <article className="homepg__rowfive">
        <CustomSkeleton loading={education_path.intro ?? true}>
          <Row  align="top">
            <Col xs={{span: 20, offset: 2 }} md={{ span: 20, offset: 2}} lg={{ span: 20, offset: 2}}  sm={{ span: 20, offset: 2}} >
              <Title level={4}> {education_path.intro}</Title>
            </Col>
          </Row>
          <Row align="top">
            <Col xs={{span: 20, push: 0, offset: 2}} md={{ span: 18, push: 3, offset: 0 }} lg={{ span: 20, push: 2, offset: 0 }}  sm={{span: 20, push: 0, offset: 2}} >
              {educationTimelineHTML}
            </Col>
          </Row>
        </CustomSkeleton>
      </article>
    </section>
  );
  return TEMPLATE;
}