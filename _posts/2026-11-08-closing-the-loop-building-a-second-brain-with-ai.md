---
title: "From Single-Threaded to Closed-Loop: Building a Second Brain with AI"
lang: en
section: ai
image: /assets/img/from-single-thread-to-closed-loop.jpg
translation: /posts/2026/11/from-single-thread-to-closed-loop/
---

The longer I work with AI, the more I believe it should become everyone's second brain. That is the foundation of how we work with it.

The most important part is that the whole mechanism has to form a closed loop with feedback, instead of single-threaded question and answer.

It clicked for me during this year's first-half review. I handed AI all 258 of my flomo notes from January to June at once. When it finished, it pointed out something that seemed trivial: on the same issue, it had already called me out twice, in March and in April. Both times I agreed with it, and then... nothing changed.

That was because my conversations with AI were single-threaded back then. Once a chat closed, the response stayed in the chat history. The next window remembered nothing of what had been promised, and nobody checked whether anything had changed afterward.

To close that gap, I spent the past two-plus months building a closed-loop system. Here I want to share some of the design and the mistakes along the way, for example:

1. What should AI know about me every time it starts work?
2. What does it take for these files to keep updating and iterating?
3. Where does this whole thing break down?

## 01. Introduction

The system's read path is three files, written for every AI agent to read:

- soul.md: who I am. My work, family setup, two north stars (one for life, one for thinking), long-term decision principles, and a section called "where I'm most easily misread."
- ai.md: how we work together. How I define the role of my AI, how to identify the type of task, basic rules for communication and judgment, and boundaries on autonomy and engineering discipline.
- memory.md: what has been happening lately. Current choices, recent facts, observations and counterexamples, with a review date on every important entry.

The entry point lives in global rule files like AGENTS.md and CLAUDE.md, so Codex and Claude Code read all three before they start work.

Why three files instead of one?

Because the three kinds of information change at very different speeds:

Identity (changes every few years) → How we collaborate (every few months) → Recent life (every week)

If they all sat in one file, every update about my week would touch the part about who I am.

I also added one more rule: all three files get read every time, but the personal model is only invoked for tasks like life choices, value trade-offs, and self-review. Otherwise AI could easily end up analyzing your personality while helping you debug.

## 02. Three Core Elements of the Write Path

The read path takes care of "AI knows who I am." That part is static.

What actually makes the files move is the write path: regular reviews in which AI updates those three documents. In my experience, it has to get three things right.

### 1. Rhythm

- 1st of every month: a scheduled task kicks off a full review of the previous month
- Every quarter: roll up the three monthly reports and look for trends across months
- January 2 every year: the annual review

I started with quarterly reviews only, and added monthly reviews this month. This frequency suits me better.

Every important entry in memory has to carry a review date. That splits a judgment into two steps, "write it down now" and "look again when it's due." When the date arrives, it must be reconfirmed, rewritten, or archived. It cannot quietly become a permanent rule.

### 2. Evidence

Every review has to look at three kinds of evidence at once:

- Subjective records: what I wrote down in flomo
- Objective actions: what my code and documents show I actually did
- External results: what got published and delivered, and how other people responded

Give AI the most complete context you can.

### 3. Rules

AI is very good at explaining things. Something you didn't do once, it can describe as avoidance. A passing emotion, it can describe as personality. If that kind of explanation goes straight into soul, an observation turns into a definition of me, and every future collaboration will reinterpret me through that definition.

So writing back has to be layered:

A single event (an observation) → Something that recurs across time and situations and has been checked against counterexamples (a candidate pattern) → Values and long-term priorities (only I can claim these)

New material goes into memory by default. Only what affects how we work together changes ai.md, and soul.md has the highest bar of all.

The last step of every review is generating proposed changes to the three files (a diff). I go through them one by one. Once I approve, a snapshot of the old version is saved first, then the text is updated and the changelog written.

## 03. Use Case

Here is an example of the loop closing.

I built an asset allocation dashboard, and the Q3 review found that I rarely opened it. AI's leading explanation was a rhythm mismatch: the dashboard updated daily, but my allocation approach is low-frequency, so there was no reason to open it every day.

Here is what happened next:

Q3 review finds it's rarely used → "rhythm mismatch" hypothesis → early October, changed to one weekly entry point that runs only on weekdays → a concentrated session over a weekend in mid-October → written into memory, with a counterexample noted alongside it → to be tested again in the Q4 review

If usage drops again next quarter, this explanation will have to change.

That way, AI and I work out together the dashboard setup that suits me best.

## 04. Where Does It Break Down?

### 1. Evidence

In other words, context. This is the most fundamental problem. Code and documents mostly record what you did. Experiences, relationships, and what moved you to act depend on keeping a record over time. I mostly use flomo voice notes, at least one a day. flomo's MCP also makes this easy now, since agents can read the notes automatically.

Wherever the evidence is thin, that area updates more slowly. When that happens, it is better to honestly write "insufficient evidence" than to fill the gap with inference.

### 2. Approval

If proposed changes pile up unread, the write path breaks, and the system slides back into an increasingly outdated profile.

Give it regular reviews and a clear approver, and it will keep updating and iterating.

/


What suits you best is what's best. Everyone needs to build their own second brain with their own hands, so that it adapts to you, fits you, and becomes a partner who knows you closely. Surprises will follow.

<small>Cover image from "[The Brain System](https://artsandculture.google.com/story/PQVxdHp5nUTNIg)," an exhibit at Corporea, the interactive museum of the human body, Fondazione Idis - Città della Scienza, via Google Arts & Culture.</small>
