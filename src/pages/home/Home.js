import React, { Fragment, useMemo } from 'react';
import './scss/home.scss';
import { Row, Col, Typography, Progress, Divider } from 'antd';
const { Title } = Typography;

export default function Home() {
  let frontEndStack = [];
  frontEndStack.length = 3;
  frontEndStack.fill(1);
  let frontEndStackMemo = frontEndStack.map(() => {
    return {
      percent: (Math.random() * 100) >> 0,
      icon: `${process.env.PUBLIC_URL}/home/vue-icon.png`,
      stack: 'vuejs'
    }
  }, [frontEndStack]);
  console.log(frontEndStack);
  const frontEndHTML = useMemo(() => {
    return frontEndStackMemo.map((tech) => {
      return (<Fragment>
        <Progress className="progress" percent={tech.percent} showInfo={false} />
        <label htmlFor={tech.stack} className="progress-label">
          <Title level={5}>{tech.stack}</Title>
        </label>
      </Fragment>)
    });
  }, [frontEndStackMemo]);
  const databaseHTML = useMemo(() => {
    return frontEndStackMemo.map((tech) => {
      return (<Fragment>
        <Progress className="progress" percent={tech.percent} showInfo={false} />
        <label htmlFor={tech.stack} className="progress-label">
          <Title level={5}>{tech.stack}</Title>
        </label>
      </Fragment>)
    });
  }, [frontEndStackMemo])
  const backendHTML = useMemo(() => {
    return frontEndStackMemo.map((tech) => {
      return (<Fragment>
        <Progress status={'active'} className="progress" percent={tech.percent} showInfo={false} />
        <label htmlFor={tech.stack} className="progress-label">
          <Title level={5}>{tech.stack}</Title>
        </label>
      </Fragment>)
    });
  }, [frontEndStackMemo])
  const TEMPLATE = (
    <section className="homepg">
      <article className="homepg__rowone">
        <Row justify="space-around" align="middle">
          <Col xs={24} lg={12} sm={12}>
            <section className="rowone-colone">
              
              <img src={`${process.env.AZURE_ASSETS}/profile_splash.png`} alt="Author splash"/>
            </section>
          </Col>
          <Col xs={20} lg={12} sm={12}>
            <section className="rowone-coltwo">
              <Title level={2}>
                Hi My Name is Manas Singh
                </Title>
                <Title level={3}>
                  I am Software Developer at walmart as Senior Software Engineer.
                  I have 9 years of expreience in web technology domain primarly.
              </Title>
            </section>
          </Col>
        </Row>
      </article>
      <Divider type="horizontal" />
      <article className="homepg__rowtwo">
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} lg={24} sm={24}>
            <Title>Technology Stack</Title>
            <Title level={4}>I started my career with Web application devevelopment for Samsung products using latest framework and moving forware learning and applying in backend technologies/framework</Title>
          </Col>
        </Row>
        <Row justify="space-around" align="top">
          <Col xs={{span: 20, push: 2 }} lg={8} md={{span: 20, push: 2 }} sm={{span: 20 }}>
            <section className="rowtwo-colone">
              <Title level={2}>BackEnd Stack</Title>
              {backendHTML}
            </section>
          </Col>
          <Col xs={{span: 20, push: 2 }} lg={8} md={{span: 20, push: 2 }} sm={{span: 20}}>
            <section className="rowtwo-coltwo">
                <Title level={2}>FrontEnd Stack</Title>
                {frontEndHTML}
            </section>
          </Col>
          <Col xs={{span: 20, push: 2 }} lg={8} md={{span: 20, push: 2 }} sm={{span: 20 }}>
            <section className="rowtwo-coltwo">
                <Title level={2}>Database Stack</Title>
                {databaseHTML}
            </section>
          </Col>
        </Row>
      </article>
      <Divider type="horizontal" />
      {/* <article className="homepg__rowthree"> Make this into timeline
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} lg={24} sm={24}>
            <Title>Tools</Title>
            <Title level={4}>I started my career with Web application devevelopment for Samsung products using latest framework and moving forware learning and applying in backend technologies/framework</Title>
          </Col>
        </Row>
      </article> */}
      <Divider type="horizontal" />
      <article className="homepg__rowfour">
        <Row  align="top">
          <Col xs={{span: 20, offset: 2 }} lg={24} sm={24}>
            <Title>Product/Device Worked on</Title>
            <Title level={4}>I started my career with Web application devevelopment for Samsung products using latest framework and moving forware learning and applying in backend technologies/framework</Title>
          </Col>
        </Row>
      </article>
    </section>
  );
  return TEMPLATE;
}