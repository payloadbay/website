"use client";

import { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Chip,
  Link,
  Modal,
  Tabs,
  buttonVariants,
} from "@heroui/react";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconDatabase,
  IconMail,
  IconMenu2,
  IconRefresh,
  IconRoute,
  IconServer,
  IconShieldCheck,
  IconWebhook,
  IconX,
} from "@tabler/icons-react";
import { alphaEmail, asset, sourceUrl } from "@/lib/site";

const navigation = [
  ["How it works", "#how-it-works"],
  ["Features", "#features"],
  ["Hosting", "#hosting"],
] as const;

function ActionLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${buttonVariants({ variant: secondary ? "secondary" : "primary", size: "lg" })} ${className}`}
    >
      {children}
    </Link>
  );
}

function Brand() {
  return (
    <a className="brand" href="#" aria-label="Payload Bay home">
      <img
        src={asset("assets/logo.svg")}
        alt="Payload Bay"
        width="200"
        height="44"
      />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="container navigation" aria-label="Main navigation">
        <Brand />
        <div className="desktop-links">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link
            className="github-link"
            aria-label="Payload Bay on GitHub"
            href={sourceUrl}
          >
            <IconBrandGithub size={22} />
          </Link>
          <ActionLink className="desktop-cta" href={alphaEmail}>
            Request alpha access <IconArrowUpRight size={17} />
          </ActionLink>
          <Button
            className="mobile-menu-trigger"
            variant="secondary"
            isIconOnly
            aria-label="Open navigation"
            onPress={() => setOpen(true)}
          >
            <IconMenu2 size={22} />
          </Button>
        </div>
        <Modal isOpen={open} onOpenChange={setOpen}>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="navigation-dialog">
                <Modal.CloseTrigger aria-label="Close navigation">
                  <IconX size={22} />
                </Modal.CloseTrigger>
                <Modal.Header>
                  <Modal.Heading>Explore Payload Bay</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <nav className="mobile-links" aria-label="Mobile navigation">
                    {navigation.map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        onPress={() => setOpen(false)}
                      >
                        {label}
                        <IconArrowRight size={20} />
                      </Link>
                    ))}
                  </nav>
                </Modal.Body>
                <Modal.Footer>
                  <ActionLink className="full-width" href={alphaEmail}>
                    Request alpha access <IconArrowUpRight size={18} />
                  </ActionLink>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </nav>
    </header>
  );
}

const payload = `{
  "type": "purchase.completed",
  "data": {
    "orderId": "order_001",
    "amount": 4900,
    "currency": "EUR"
  }
}`;

function DeliveryExample() {
  return (
    <Card
      className="delivery-preview"
      aria-label="Illustrative event inspection"
    >
      <Card.Header className="preview-header">
        <span className="preview-heading">
          <IconWebhook size={21} /> Event inspection
        </span>
        <Chip size="sm" variant="secondary">
          Example
        </Chip>
      </Card.Header>
      <Card.Content className="preview-content">
        <div className="event-heading">
          <div>
            <span className="overline">Incoming event</span>
            <h2>purchase.completed</h2>
          </div>
          <Chip size="sm" variant="soft" color="success">
            <IconCheck size={13} />
            <Chip.Label>Delivered</Chip.Label>
          </Chip>
        </div>
        <div className="route-line">
          <span>Provider</span>
          <IconArrowRight size={15} />
          <strong>Payload Bay</strong>
          <IconArrowRight size={15} />
          <span>Your app</span>
        </div>
        <Tabs defaultSelectedKey="attempts" className="preview-tabs">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Event details">
              <Tabs.Tab id="attempts">
                Delivery attempts
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="payload">
                Payload
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="attempts">
            <ol className="attempts">
              <li>
                <span className="attempt-dot received">
                  <IconDatabase size={16} />
                </span>
                <div>
                  <strong>Received and stored</strong>
                  <span>Ready for processing</span>
                </div>
                <time>12:04:01</time>
              </li>
              <li>
                <span className="attempt-dot retry">
                  <IconRefresh size={16} />
                </span>
                <div>
                  <strong>Application unavailable</strong>
                  <span>HTTP 503 · Retry scheduled</span>
                </div>
                <time>12:04:02</time>
              </li>
              <li>
                <span className="attempt-dot delivered">
                  <IconCheck size={17} />
                </span>
                <div>
                  <strong>Successfully delivered</strong>
                  <span>HTTP 200 · Attempt 2</span>
                </div>
                <time>12:04:32</time>
              </li>
            </ol>
          </Tabs.Panel>
          <Tabs.Panel id="payload">
            <div className="payload-code">
              <span className="code-label">
                JSON <span>application/json</span>
              </span>
              <pre>
                <code>{payload}</code>
              </pre>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Card.Content>
      <Card.Footer className="preview-footer">
        <IconShieldCheck size={17} /> One event. Its complete delivery story.
      </Card.Footer>
    </Card>
  );
}

const capabilities = [
  {
    icon: IconRefresh,
    title: "Recover with the full picture.",
    text: "Inspect the original request, processing runs and delivery responses together. Retry a failed delivery or replay an event with a chosen version.",
    tag: "Event history & replay",
  },
  {
    icon: IconCode,
    title: "Your logic. A version you can trust.",
    text: "Verify signatures, transform payloads and route events with TypeScript. Test your changes before publishing an immutable revision.",
    tag: "TypeScript handlers",
  },
  {
    icon: IconShieldCheck,
    title: "Give every team its own space.",
    text: "Organize integrations into organizations, workspaces and projects, with scoped membership, API keys and secrets.",
    tag: "Scoped access",
  },
];
const steps = [
  {
    icon: IconWebhook,
    title: "Receive & verify",
    text: "Give providers an ingress URL. Check signatures and decide how to respond using the original request.",
  },
  {
    icon: IconDatabase,
    title: "Store & process",
    text: "Keep accepted events ready for processing. Transform their data and route them to configured destinations.",
  },
  {
    icon: IconRoute,
    title: "Deliver & recover",
    text: "See what your application returned. Retry when it is ready, with a history of each attempt.",
  },
];
const questions = [
  [
    "Can I use Payload Bay today?",
    "Payload Bay is in private alpha and is not publicly available as a hosted service yet. Email us about your integration to request access. You can follow the source and release progress on GitHub.",
  ],
  [
    "Can I run it on my own infrastructure?",
    "Self-hosting is part of Payload Bay’s foundation. The first release is being prepared with Docker images and PostgreSQL. Until it is published, the repository is the place to follow its progress.",
  ],
  [
    "What happens when my application is down?",
    "Your provider and your application do not have to be available at the same time. Accepted events are stored for processing, and you can inspect delivery failures, retry or replay them.",
  ],
  [
    "Does it guarantee exactly-once delivery?",
    "Delivery is at least once. Retries and replay can produce duplicates, so your receiving application should deduplicate events.",
  ],
  [
    "Will there be a hosted plan?",
    "That is the plan. Hosted pricing and paid plans are not available yet. We are first testing the alpha with early adopters and gathering feedback.",
  ],
];

export default function Landing() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Chip variant="soft" color="accent" className="alpha-chip">
              <span className="status-dot" />
              <Chip.Label>Private alpha · Built in the open</Chip.Label>
            </Chip>
            <h1 id="hero-title">
              A safe landing place for <span>every event.</span>
            </h1>
            <p className="hero-lead">
              Your providers keep sending.
              <br />
              Your applications don’t have to keep up.
            </p>
            <p className="hero-description">
              Receive, verify and route webhooks. When delivery fails, see what
              happened and pick up where you left off.
            </p>
            <div className="hero-actions">
              <ActionLink href={alphaEmail}>
                Request alpha access <IconArrowUpRight size={19} />
              </ActionLink>
              <ActionLink secondary href={sourceUrl}>
                <IconBrandGithub size={19} /> View on GitHub
              </ActionLink>
            </div>
            <p className="availability">
              Not publicly available yet. Tell us what you’re building.
            </p>
          </div>
          <div className="hero-visual">
            <DeliveryExample />
            <div className="visual-caption">
              <span className="caption-line" />
              Your application can come back. Your events should still be there.
            </div>
          </div>
        </section>
        <div className="container trust-strip">
          <span>
            <IconServer /> Self-hostable by design
          </span>
          <span>
            <IconCode /> TypeScript at the core
          </span>
          <span>
            <IconBrandGithub /> Developed in the open
          </span>
        </div>
        <section
          id="how-it-works"
          className="section container"
          aria-labelledby="flow-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Between the event and your application</p>
            <h2 id="flow-title">
              Keep the webhook.
              <br />
              Lose the guesswork.
            </h2>
            <p>
              A controlled path from the request that arrived to the response
              your application returned.
            </p>
          </div>
          <ol className="workflow">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <div className="step-top">
                  <span className="step-icon">
                    <Icon size={24} />
                  </span>
                  <span className="step-index">0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          id="features"
          className="feature-section"
          aria-labelledby="features-title"
        >
          <div className="section container">
            <div className="section-heading">
              <p className="eyebrow">More than an endpoint</p>
              <h2 id="features-title">The tools for what happens next.</h2>
              <p>
                Write your integration logic. Understand failures. Stay in
                control of the delivery.
              </p>
            </div>
            <div className="feature-grid">
              {capabilities.map(({ icon: Icon, title, text, tag }) => (
                <Card key={title} className="feature-card">
                  <Card.Header>
                    <span className="feature-icon">
                      <Icon size={24} />
                    </span>
                    <Card.Title>{title}</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p>{text}</p>
                  </Card.Content>
                  <Card.Footer>
                    <span className="feature-tag">{tag}</span>
                  </Card.Footer>
                </Card>
              ))}
            </div>
            <div className="feature-note">
              <IconCode size={20} />
              <p>
                Verification and routing stay in your hands. Use shared helpers
                and middleware without giving up real TypeScript.
              </p>
            </div>
          </div>
        </section>
        <section
          id="hosting"
          className="section container"
          aria-labelledby="hosting-title"
        >
          <div className="section-heading">
            <p className="eyebrow">A foundation you can run yourself</p>
            <h2 id="hosting-title">
              Your infrastructure.
              <br />
              Your choice.
            </h2>
            <p>
              We’re preparing the first release. For now, join the private alpha
              or follow the self-hosting work.
            </p>
          </div>
          <div className="hosting-grid">
            <Card className="hosting-card">
              <Card.Header>
                <IconServer className="hosting-icon" size={28} />
                <span className="eyebrow">Self-hosted</span>
                <Card.Title>Keep events close.</Card.Title>
                <Card.Description>
                  For teams who want to run their own infrastructure.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ul className="check-list">
                  {[
                    "Your deployment and your data",
                    "Docker images and PostgreSQL",
                    "Versioned code, retries and replay",
                    "AGPLv3 source in the upcoming release",
                  ].map((x) => (
                    <li key={x}>
                      <IconCheck size={18} />
                      {x}
                    </li>
                  ))}
                </ul>
              </Card.Content>
              <Card.Footer>
                <ActionLink secondary className="full-width" href={sourceUrl}>
                  Follow release progress <IconArrowUpRight size={18} />
                </ActionLink>
              </Card.Footer>
            </Card>
            <Card className="hosting-card alpha-plan">
              <Card.Header>
                <div className="plan-top">
                  <IconWebhook className="hosting-icon" size={28} />
                  <Chip size="sm" color="accent" variant="soft">
                    Private alpha
                  </Chip>
                </div>
                <span className="eyebrow">Hosted</span>
                <Card.Title>Build with us.</Card.Title>
                <Card.Description>
                  Early access, close feedback and real integrations.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ul className="check-list">
                  {[
                    "Access by invitation",
                    "The same Payload Bay application",
                    "Direct feedback with the maintainers",
                    "No public sign-ups or paid plans yet",
                  ].map((x) => (
                    <li key={x}>
                      <IconCheck size={18} />
                      {x}
                    </li>
                  ))}
                </ul>
              </Card.Content>
              <Card.Footer>
                <ActionLink className="full-width" href={alphaEmail}>
                  Ask to join the alpha <IconMail size={18} />
                </ActionLink>
              </Card.Footer>
            </Card>
          </div>
        </section>
        <section
          className="section container faq-section"
          aria-labelledby="faq-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Before you get started</p>
            <h2 id="faq-title">A few useful details.</h2>
            <p>Early days. Clear expectations.</p>
          </div>
          <Accordion className="faq" allowsMultipleExpanded>
            {questions.map(([question, answer], i) => (
              <Accordion.Item key={question} id={`question-${i}`}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    {question}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>{answer}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>
        <section className="container closing">
          <span className="eyebrow">Receive instantly. Deliver reliably.</span>
          <h2>
            Give your next webhook
            <br />a safe landing place.
          </h2>
          <p>Have an integration in mind? We’d love to hear about it.</p>
          <ActionLink href={alphaEmail}>
            Let’s talk about alpha access <IconArrowUpRight size={19} />
          </ActionLink>
        </section>
      </main>
      <footer className="container site-footer">
        <div>
          <Brand />
          <p>Built for the events that matter.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href={sourceUrl}>
            GitHub <IconArrowUpRight size={14} />
          </Link>
          <Link href="https://github.com/payloadbay/.github/security/policy">
            Security
          </Link>
          <Link href={alphaEmail}>Contact</Link>
        </nav>
        <p className="footer-stage">
          Private alpha. No public hosted sign-ups yet.
        </p>
      </footer>
    </>
  );
}
