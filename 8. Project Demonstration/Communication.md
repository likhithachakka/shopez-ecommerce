# Communication — ShopEZ E-Commerce Platform

## Project Communication Strategy

| Field | Value |
|---|---|
| **Project** | ShopEZ — Curated E-Commerce Platform |
| **Team ID** | ShopEZ Team |
| **Date** | July 2026 |

---

## 1. Team Communication Channels

| Channel | Purpose | Frequency |
|---|---|---|
| **Daily Stand-up (Scrum)** | Status updates, blockers, next steps | Daily (15 min) |
| **Slack / Teams** | Async communication, quick questions, sharing updates | Continuous |
| **GitHub Issues** | Bug tracking, feature requests, task assignment | As needed |
| **Sprint Planning** | Sprint backlog creation, story point estimation | Every 14 days |
| **Sprint Review** | Demo completed work to stakeholders | Every 14 days |
| **Sprint Retrospective** | Process improvement, what went well/what to improve | Every 14 days |

---

## 2. Communication Flow

```
                    ┌─────────────────────────────┐
                    │     Product Owner           │
                    │  (Defines vision,           │
                    │   prioritizes backlog)      │
                    └────────────┬────────────────┘
                                 │
                    ┌────────────▼────────────────┐
                    │     Project Manager         │
                    │  (Coordinates sprints,      │
                    │   removes blockers)         │
                    └────────────┬────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│ Full-Stack    │      │ UX Designer   │      │ QA / Tester  │
│ Developer     │      │               │      │               │
│               │      │               │      │               │
│ • Backend API │      │ • UI/UX flow  │      │ • Test cases  │
│ • Frontend UI │      │ • Wireframes  │      │ • Bug reports │
│ • Database    │      │ • Prototypes  │      │ • UAT        │
└───────────────┘      └───────────────┘      └───────────────┘
```

---

## 3. Weekly Communication Schedule

| Day | Activity | Participants | Duration |
|---|---|---|---|
| **Monday** | Sprint Planning (Week 1) / Stand-up (Week 2+) | Full team | 30 min / 15 min |
| **Tuesday** | Stand-up + Technical discussion | Dev + QA | 15 min |
| **Wednesday** | Stand-up + Design review | Full team | 15 min |
| **Thursday** | Stand-up + Bug triage | Dev + QA | 15 min |
| **Friday** | Sprint Review + Retrospective (Week 2) | Full team + Stakeholders | 60 min |

---

## 4. Reporting Structure

| Report | Audience | Frequency | Content |
|---|---|---|---|
| **Sprint Burndown** | Full team | Daily (auto-updated) | Remaining story points vs time |
| **Velocity Report** | Product Owner | After each sprint | Story points completed, trend |
| **Bug Dashboard** | Dev + QA | Continuous | Open/resolved bugs by severity |
| **Status Summary** | Stakeholders | Weekly | Progress, blockers, next steps |
| **UAT Report** | Product Owner + Stakeholders | After UAT cycle | Pass/fail rates, defect log |

---

## 5. Meeting Templates

### Daily Stand-up Template

```
1. What did I complete yesterday?
2. What am I working on today?
3. Any blockers?
```

### Sprint Review Template

```
1. Completed user stories (with demo)
2. What wasn't completed and why
3. Performance metrics (if applicable)
4. Stakeholder feedback
```

### Retrospective Template

```
1. What went well? 👍
2. What could be improved? 🔧
3. Action items for next sprint ✅
```

---

## 6. Tools Used

| Tool | Purpose | Link / Access |
|---|---|---|
| **GitHub** | Version control, code review, issues | [github.com/likhithachakka/shopez-ecommerce](https://github.com/likhithachakka/shopez-ecommerce) |
| **GitHub Projects** | Sprint/kanban board | GitHub repository |
| **Markdown** | Documentation | Project repository |
| **k6** | API performance testing | Local / CI |
| **Lighthouse CI** | Frontend performance | Local / CI |

---

## 7. Roles & Responsibilities

| Role | Person | Responsibilities |
|---|---|---|
| **Product Owner** | Team Lead | Vision, backlog prioritization, stakeholder liaison |
| **UX Designer** | Design Lead | User flows, wireframes, UI consistency |
| **Full-Stack Developer** | Dev Lead | Architecture, implementation, code review |
| **QA / Tester** | QA Lead | Test planning, execution, defect tracking |
