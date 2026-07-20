// Agents Reference Book Content Registry
// All page content in one place for easy editing and iteration

export interface ContentSection {
  id: string;
  title: string;
  content: string;
}

export interface RelatedTerm {
  slug: string;
  label: string;
}

export interface AgentPageContent {
  slug: string;
  title: string;
  lede: string;
  metaDescription: string;
  sections: ContentSection[];
  relatedTerms?: RelatedTerm[];
  keyTakeaways?: string[];
}

// =============================================================================
// HUB PAGE - /ai-agents
// =============================================================================
export const hubPageContent: AgentPageContent = {
  slug: "ai-agents",
  title: "AI Agents Reference",
  lede: "A comprehensive reference guide to AI agents, agentic workflows, and orchestration patterns. Designed for practitioners building intelligent systems.",
  metaDescription: "Reference guide to AI agents, agentic workflows, and orchestration. Learn core concepts, architecture patterns, and implementation examples.",
  sections: [
    {
      id: "about",
      title: "About This Reference",
      content: `This reference provides authoritative definitions, architectural patterns, and practical guidance for building AI agent systems. Each entry follows a consistent structure: definition, significance, common pitfalls, and where relevant, implementation examples from Esy's research workflows.

Use this guide to:
- **Understand foundational concepts** in the Core Terms section
- **Learn proven architecture patterns** for building reliable agent systems
- **See practical implementations** through Esy workflow examples
- **Navigate related concepts** via cross-references throughout`
    },
    {
      id: "structure",
      title: "How This Guide Is Organized",
      content: `**Core Terms** — Atomic definitions of fundamental concepts like the agentic loop, tool use, memory, and planning. Start here if you're new to agents.

**Architecture Patterns** — Proven approaches for structuring agent systems. Each pattern includes when to use it, potential failure modes, and trade-offs.

**Esy Workflows** — Implementation examples showing how these concepts apply in practice. These demonstrate real patterns, not theoretical abstractions.`
    }
  ],
  keyTakeaways: [
    "Agents are systems that autonomously perceive, reason, and act toward goals",
    "Effective agents combine planning, memory, tool use, and evaluation",
    "Architecture patterns help manage complexity and failure modes",
    "Human-in-the-loop design balances autonomy with oversight"
  ]
};

// =============================================================================
// CANONICAL PAGE - /ai-agents/what-are-ai-agents
// =============================================================================
export const canonicalPageContent: AgentPageContent = {
  slug: "what-are-ai-agents",
  title: "What are AI Agents?",
  lede: "AI agents are systems that perceive their environment, reason about goals, take actions, and evaluate outcomes—operating with varying degrees of autonomy.",
  metaDescription: "Understand AI agents: definition, the agentic loop (perceive-reason-act-evaluate), autonomy spectrum, and how agents differ from chatbots and scripts.",
  sections: [
    {
      id: "definition",
      title: "Definition",
      content: `An **AI agent** is a software system that uses artificial intelligence to autonomously pursue goals by perceiving its environment, reasoning about actions, executing those actions, and evaluating results. Unlike simple chatbots that respond to single prompts, agents maintain context across interactions and can take multiple steps to accomplish complex tasks.

The key distinguishing characteristics of agents are:
- **Goal-directed behavior**: Agents work toward specified objectives, not just respond to inputs
- **Autonomy**: Agents can operate with minimal human intervention (degree varies)
- **Environmental interaction**: Agents perceive and modify their environment through tools
- **Iterative refinement**: Agents evaluate outcomes and adjust their approach`
    },
    {
      id: "agents-vs-alternatives",
      title: "Agents vs. Chatbots vs. Scripts",
      content: `Understanding what agents are requires distinguishing them from related systems:

**Scripts** are deterministic programs that follow fixed instructions. Given the same input, they produce the same output. They cannot adapt to unexpected situations.

**Chatbots** use language models to generate responses to user inputs. They may be stateless (each message is independent) or maintain conversation context, but they respond rather than pursue goals.

**Agents** combine language model capabilities with goal pursuit, environmental interaction, and iterative refinement. They decide what actions to take, execute those actions, and adjust based on outcomes.

The boundary between these categories is not always sharp. A sophisticated chatbot with function calling capabilities begins to exhibit agent-like properties. The key question is whether the system autonomously pursues goals across multiple steps.`
    },
    {
      id: "agentic-loop",
      title: "The Agentic Loop",
      content: `Agents operate through a continuous cycle called the **agentic loop**:

**1. Perceive** — The agent gathers information about its environment, task state, and available resources. This might include reading documents, querying APIs, or parsing user instructions.

**2. Reason** — Using this information, the agent reasons about what action to take next. This involves understanding the current state relative to the goal, evaluating options, and selecting an approach.

**3. Act** — The agent executes the chosen action. This could be calling a tool, generating content, making an API request, or delegating to another agent.

**4. Evaluate** — After acting, the agent assesses the result. Did the action advance the goal? Were there errors? Should the approach change?

This loop repeats until the goal is achieved, a failure condition is met, or human intervention is requested. The sophistication of each phase varies by agent design—some agents have elaborate planning, others rely on simple heuristics.`
    },
    {
      id: "autonomy-spectrum",
      title: "The Autonomy Spectrum",
      content: `Agents exist on a spectrum from highly supervised to fully autonomous:

**Human-in-the-Loop** — The agent proposes actions but waits for human approval before execution. Maximum safety, minimum speed. Appropriate for high-stakes decisions.

**Human-on-the-Loop** — The agent executes autonomously but humans monitor progress and can intervene. Balances efficiency with oversight.

**Human-out-of-the-Loop** — The agent operates independently, with humans only involved in initial configuration and final review. Maximum efficiency, requires high confidence in agent reliability.

Most production systems use hybrid approaches: autonomous execution for routine operations with human checkpoints for critical decisions. The appropriate level of autonomy depends on task risk, agent reliability, and consequence severity.`
    },
    {
      id: "capabilities",
      title: "Core Agent Capabilities",
      content: `Effective agents typically combine several capabilities:

**Planning** — Decomposing high-level goals into actionable sub-tasks. Good planning improves efficiency and reduces errors.

**Memory** — Maintaining context across interactions. Short-term memory holds current task state; long-term memory stores learned information.

**Tool Use** — Interacting with external systems through defined interfaces. Tools extend agent capabilities beyond text generation.

**Orchestration** — Coordinating multiple agents or steps in complex workflows. Orchestration handles dependencies, failures, and resource allocation.

These capabilities are covered in detail in the Core Terms section of this reference.`
    },
    {
      id: "what-this-covers",
      title: "What This Reference Covers",
      content: `This Agents Reference provides:

**Core Terms** — Foundational definitions for agent concepts including agentic workflow, the agentic loop, tool use, memory, planning, orchestration, and human-in-the-loop patterns.

**Architecture Patterns** — Proven approaches for structuring agent systems, including planner-executor, router-supervisor, and reflect-revise patterns.

**Esy Workflows** — Practical implementation examples showing how these concepts apply in Esy's research automation platform.

Each entry includes why the concept matters, common misconceptions, and cross-references to related topics.`
    }
  ],
  relatedTerms: [
    { slug: "agentic-workflow", label: "Agentic Workflow" },
    { slug: "agentic-loop", label: "Agentic Loop" },
    { slug: "tool-use", label: "Tool Use" },
    { slug: "planning", label: "Planning" },
    { slug: "memory", label: "Memory" },
    { slug: "human-in-the-loop", label: "Human-in-the-Loop" }
  ],
  keyTakeaways: [
    "Agents pursue goals autonomously through perceive-reason-act-evaluate cycles",
    "They differ from chatbots in goal-directedness and multi-step execution",
    "Autonomy exists on a spectrum from human-in-the-loop to fully autonomous",
    "Effective agents combine planning, memory, tool use, and orchestration"
  ]
};

// =============================================================================
// TERM PAGES - /ai-agents/terms/*
// =============================================================================
export const termPagesContent: Record<string, AgentPageContent> = {
  "agentic-workflow": {
    slug: "agentic-workflow",
    title: "Agentic Workflow",
    lede: "An agentic workflow is a multi-step process where AI agents autonomously execute tasks, make decisions, and handle errors to accomplish a defined goal.",
    metaDescription: "Definition of agentic workflow: multi-step AI automation with autonomous decision-making. Learn components, benefits, and implementation patterns.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `An **agentic workflow** is a structured sequence of operations where one or more AI agents work toward a goal with significant autonomy. Unlike traditional automation (rigid, deterministic scripts) or simple AI calls (stateless, single-turn), agentic workflows involve:

- **Dynamic decision-making**: Agents decide what step to take based on current context
- **Error recovery**: The workflow can detect failures and attempt remediation
- **State management**: Context persists across steps, enabling coherent multi-step execution
- **Goal orientation**: All steps contribute to an overarching objective`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `Agentic workflows enable automation of tasks that were previously too complex or variable for traditional approaches:

**Handling ambiguity**: Unlike scripts that fail on unexpected inputs, agentic workflows can reason about ambiguous situations and make judgment calls.

**Adaptive execution**: Workflows can modify their approach based on intermediate results, rather than following a fixed path.

**Complex task completion**: Multi-step tasks that require different skills (research, analysis, synthesis) can be orchestrated coherently.

**Scaling expertise**: Domain expertise embedded in agent instructions can be applied consistently at scale.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"Agentic workflows are just complex prompts"**
While prompts are part of agent behavior, agentic workflows involve infrastructure: state management, tool integration, error handling, and orchestration logic.

**"More autonomy is always better"**
Excessive autonomy without appropriate guardrails leads to unpredictable behavior and errors. Effective workflows balance autonomy with checkpoints.

**"Agents can handle any task"**
Agents are effective for tasks that benefit from reasoning and adaptation. Highly deterministic tasks are often better served by traditional automation.`
      },
      {
        id: "practical-example",
        title: "Practical Example",
        content: `A research agentic workflow might:

1. **Parse** the research question and decompose into sub-questions
2. **Search** multiple sources for relevant information
3. **Evaluate** source credibility and relevance
4. **Synthesize** findings into coherent insights
5. **Draft** initial content with citations
6. **Review** for accuracy and completeness
7. **Revise** based on quality checks

Each step involves agent reasoning, and the workflow adapts based on what the agent finds at each stage.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-loop", label: "Agentic Loop" },
      { slug: "orchestration", label: "Orchestration" },
      { slug: "planning", label: "Planning" },
      { slug: "human-in-the-loop", label: "Human-in-the-Loop" }
    ]
  },
  
  "agentic-loop": {
    slug: "agentic-loop",
    title: "Agentic Loop",
    lede: "The agentic loop is the fundamental cycle through which agents operate: perceive the environment, reason about actions, execute, and evaluate outcomes.",
    metaDescription: "The agentic loop explained: perceive-reason-act-evaluate cycle that powers AI agents. Learn each phase and implementation considerations.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `The **agentic loop** describes the iterative process through which an agent pursues goals:

**Perceive** → **Reason** → **Act** → **Evaluate** → (repeat)

This loop continues until the agent achieves its goal, encounters a terminal failure, or requires human intervention. The loop is the atomic unit of agent operation—everything an agent does can be understood as iterations of this cycle.`
      },
      {
        id: "phases",
        title: "The Four Phases",
        content: `**Perceive**
The agent gathers information about its current state and environment. This includes parsing task instructions, reading retrieved documents, observing tool outputs, and noting previous action results.

**Reason**
Using available information, the agent determines what action to take. This involves understanding the goal, assessing progress, identifying gaps, evaluating options, and selecting an approach. Reasoning quality directly impacts agent effectiveness.

**Act**
The agent executes the chosen action. Actions might include generating text, calling tools, making API requests, delegating to sub-agents, or requesting human input.

**Evaluate**
After acting, the agent assesses results. Did the action succeed? Did it advance the goal? Are there errors to handle? Should the strategy change? Evaluation informs the next perception phase.`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `Understanding the agentic loop provides a mental model for:

**Debugging**: When agents fail, you can identify which phase broke down—poor perception (missing information), flawed reasoning (bad decisions), failed action (tool errors), or inadequate evaluation (not catching mistakes).

**Design**: Agent architectures should support each phase. Perception needs clean data interfaces, reasoning needs appropriate context, action needs reliable tools, evaluation needs clear success criteria.

**Optimization**: Each phase can be improved independently. Better prompts improve reasoning, better tools improve action, better metrics improve evaluation.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"The loop runs once"**
Complex tasks require many iterations. A research agent might loop dozens of times: searching, reading, re-searching, synthesizing.

**"Each phase is a separate call"**
In practice, phases often blend. A single language model call might include perception (processing context), reasoning (deciding action), and action specification (generating tool call).

**"Evaluation is optional"**
Without evaluation, agents cannot detect errors or progress. Even implicit evaluation (does output make sense?) is evaluation.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-workflow", label: "Agentic Workflow" },
      { slug: "planning", label: "Planning" },
      { slug: "tool-use", label: "Tool Use" },
      { slug: "memory", label: "Memory" }
    ]
  },
  
  "tool-use": {
    slug: "tool-use",
    title: "Tool Use",
    lede: "Tool use enables agents to interact with external systems—searching the web, executing code, calling APIs—extending their capabilities beyond text generation.",
    metaDescription: "AI agent tool use: how agents interact with external systems. Covers tool design, function calling, and best practices for reliable tool integration.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `**Tool use** refers to an agent's ability to invoke external functions or services to accomplish tasks that cannot be done through text generation alone. Tools bridge the gap between language model capabilities (reasoning, synthesis) and real-world actions (data retrieval, computation, system modification).

Common tool categories include:
- **Information retrieval**: Search engines, databases, APIs
- **Computation**: Code execution, calculators, data analysis
- **Communication**: Email, messaging, notifications
- **System interaction**: File operations, application control`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `Tool use is what transforms a chatbot into an agent. Without tools, a language model can only reason about information in its context window. With tools, an agent can:

**Access current information**: Language models have training cutoffs; tools provide real-time data.

**Perform precise computation**: Math in language is unreliable; code execution is deterministic.

**Take real action**: Agents can modify external state—creating documents, sending messages, updating systems.

**Scale capabilities**: New tools extend agent capabilities without retraining the underlying model.`
      },
      {
        id: "how-it-works",
        title: "How Tool Use Works",
        content: `Modern tool use typically follows this pattern:

1. **Tool definition**: Each tool has a schema describing its name, purpose, and parameters
2. **Context inclusion**: Tool schemas are included in the agent's context
3. **Selection**: The agent reasons about when to use which tool
4. **Invocation**: The agent outputs a structured tool call (typically JSON)
5. **Execution**: The system executes the tool with provided parameters
6. **Result integration**: Tool output is added to context for the next reasoning step

The key insight is that the agent doesn't execute tools directly—it specifies what tool to call and with what arguments. A separate system handles execution.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"More tools are always better"**
Too many tools create decision complexity. Agents may choose wrong tools or combine them ineffectively. Start with essential tools, add as needed.

**"Tools are reliable"**
Tools can fail: APIs timeout, services error, rate limits trigger. Robust agents handle tool failures gracefully.

**"The model understands what tools do"**
Models use tools based on descriptions, not true understanding. Poor tool descriptions lead to misuse.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-loop", label: "Agentic Loop" },
      { slug: "orchestration", label: "Orchestration" },
      { slug: "planning", label: "Planning" }
    ]
  },
  
  "memory": {
    slug: "memory",
    title: "Memory",
    lede: "Memory enables agents to retain information across interactions—maintaining task context (short-term) and accumulating knowledge (long-term).",
    metaDescription: "AI agent memory: short-term context and long-term knowledge. Learn memory types, implementation approaches, and design considerations.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `**Memory** in agent systems refers to mechanisms for storing and retrieving information across time. Unlike stateless systems where each request is independent, agents with memory can:

- Remember what happened earlier in a task
- Recall information from previous sessions
- Build cumulative knowledge over time
- Maintain consistent behavior based on history`
      },
      {
        id: "memory-types",
        title: "Types of Memory",
        content: `**Short-term (Working) Memory**
Information relevant to the current task: conversation history, intermediate results, current state. Typically implemented as context that persists within a session but not across sessions.

**Long-term Memory**
Information persisting across sessions: user preferences, learned facts, past interaction summaries. Typically implemented through external storage (databases, vector stores) with retrieval mechanisms.

**Episodic Memory**
Records of specific past events or interactions. Useful for "remember when we discussed X" scenarios.

**Semantic Memory**
General knowledge accumulated over time, abstracted from specific episodes. Useful for building expertise.`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `Memory is essential for:

**Complex tasks**: Multi-step workflows require remembering earlier steps and their outcomes.

**Personalization**: Agents that remember preferences provide better experiences.

**Efficiency**: Avoiding redundant work by recalling previous results.

**Coherence**: Maintaining consistent behavior across a long interaction.

Without memory, agents treat each interaction as novel, leading to repetition, inconsistency, and inability to build on prior work.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"Context window is memory"**
Context provides short-term memory, but it's limited and ephemeral. True long-term memory requires external storage.

**"More memory is better"**
Irrelevant memories create noise and confusion. Memory systems need curation—deciding what to remember and what to forget.

**"Memory is automatic"**
Effective memory requires design: what to store, how to retrieve, when to update, how to handle conflicts.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-loop", label: "Agentic Loop" },
      { slug: "planning", label: "Planning" },
      { slug: "agentic-workflow", label: "Agentic Workflow" }
    ]
  },
  
  "planning": {
    slug: "planning",
    title: "Planning",
    lede: "Planning is the agent capability of decomposing high-level goals into sequences of actionable steps, enabling complex task completion.",
    metaDescription: "Agent planning: goal decomposition and task sequencing. Learn planning approaches, evaluation, and when to use planning vs. reactive execution.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `**Planning** is the process by which an agent breaks down a complex goal into a sequence of achievable sub-tasks. Rather than immediately acting on a goal, a planning agent first reasons about what steps are needed, their order, dependencies, and potential obstacles.

Planning can be:
- **Explicit**: Generate a plan document before execution
- **Implicit**: Make step-by-step decisions without formal plan articulation
- **Static**: Plan once, then execute
- **Dynamic**: Re-plan as execution reveals new information`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `Planning improves agent performance on complex tasks:

**Reduces errors**: Thinking before acting catches potential problems early.

**Improves efficiency**: Good plans avoid redundant work and optimize step ordering.

**Enables complex tasks**: Some goals simply cannot be achieved without decomposition.

**Supports evaluation**: Plans provide checkpoints for progress assessment.

However, planning has costs. Time spent planning is time not acting. Over-planning can be as harmful as under-planning.`
      },
      {
        id: "approaches",
        title: "Planning Approaches",
        content: `**Single-shot planning**: Generate complete plan upfront, execute sequentially. Simple but brittle—plans break when assumptions fail.

**Iterative planning**: Plan a few steps, execute, then re-plan based on results. More adaptive but slower.

**Hierarchical planning**: High-level plan decomposes to mid-level, then to concrete actions. Handles complexity but requires careful abstraction.

**Reactive execution**: Don't explicitly plan; decide action at each step based on current state. Fast but may lack coherence on complex tasks.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"Always plan first"**
Simple tasks don't need planning. The overhead may exceed benefits.

**"Plans should be detailed"**
Over-detailed plans become rigid. Good plans specify enough to guide action while allowing adaptation.

**"Plans don't change"**
Plans should be updated as execution reveals new information. Rigid adherence to outdated plans causes failures.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-loop", label: "Agentic Loop" },
      { slug: "orchestration", label: "Orchestration" },
      { slug: "memory", label: "Memory" }
    ]
  },
  
  "orchestration": {
    slug: "orchestration",
    title: "Orchestration",
    lede: "Orchestration is the coordination of multiple agents, steps, or processes to accomplish complex goals—handling dependencies, failures, and resource allocation.",
    metaDescription: "Agent orchestration: coordinating multiple agents and workflow steps. Learn orchestration patterns, failure handling, and system design.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `**Orchestration** refers to the higher-level coordination of agent activities. While a single agent operates through the agentic loop, orchestration manages:

- **Multi-agent coordination**: Multiple agents working together on a task
- **Workflow sequencing**: Ordering steps with dependencies
- **Resource management**: Allocating compute, API calls, or other limited resources
- **Failure handling**: Detecting errors, retrying, or escalating
- **Result aggregation**: Combining outputs from multiple agents or steps`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `Most non-trivial agent applications require orchestration:

**Specialization**: Different agents excel at different tasks. Orchestration routes work appropriately.

**Reliability**: Orchestration layers add error handling, retries, and fallbacks.

**Scalability**: Coordinating parallel execution improves throughput.

**Observability**: Orchestration provides natural checkpoints for monitoring and debugging.

Without orchestration, agent systems become fragile, opaque, and difficult to maintain.`
      },
      {
        id: "patterns",
        title: "Orchestration Patterns",
        content: `**Sequential**: Steps execute in order, each feeding into the next. Simple, predictable, but slow.

**Parallel**: Independent steps execute simultaneously. Fast, but requires careful dependency management.

**Conditional**: Flow branches based on intermediate results. Flexible, but increases complexity.

**Supervisor**: A meta-agent coordinates worker agents, assigning tasks and reviewing outputs.

**Event-driven**: Steps trigger based on events rather than explicit sequencing. Decoupled but harder to reason about.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"Orchestration is just workflow automation"**
Traditional workflow automation is deterministic. Agent orchestration must handle the non-determinism inherent in language model outputs.

**"More agents mean better results"**
Coordination overhead can exceed benefits. Start with minimal agents, add complexity when needed.

**"Orchestration handles everything"**
Orchestration manages coordination, not capability. Poor underlying agents produce poor results regardless of orchestration quality.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-workflow", label: "Agentic Workflow" },
      { slug: "planning", label: "Planning" },
      { slug: "human-in-the-loop", label: "Human-in-the-Loop" }
    ]
  },
  
  "human-in-the-loop": {
    slug: "human-in-the-loop",
    title: "Human-in-the-Loop",
    lede: "Human-in-the-loop (HITL) refers to system designs where humans review, approve, or modify agent decisions before execution—balancing autonomy with oversight.",
    metaDescription: "Human-in-the-loop AI: balancing agent autonomy with human oversight. Learn HITL patterns, when to use them, and implementation approaches.",
    sections: [
      {
        id: "definition",
        title: "Definition",
        content: `**Human-in-the-loop (HITL)** describes agent system designs that incorporate human judgment at key decision points. Rather than fully autonomous operation, HITL systems pause for human review, approval, or modification before proceeding.

HITL exists on a spectrum:
- **Approval-required**: Agent proposes, human approves every action
- **Exception-based**: Agent acts autonomously, human reviews flagged cases
- **Audit-based**: Agent acts fully, human reviews samples after the fact`
      },
      {
        id: "why-it-matters",
        title: "Why It Matters",
        content: `HITL addresses fundamental limitations of autonomous systems:

**Error mitigation**: Humans catch mistakes that agents miss, especially in novel situations.

**Accountability**: Human review creates clear decision accountability.

**Trust building**: Users trust systems more when they maintain control.

**Regulatory compliance**: Many domains require human oversight of automated decisions.

**Edge case handling**: Humans excel at recognizing when situations fall outside normal parameters.`
      },
      {
        id: "design-considerations",
        title: "Design Considerations",
        content: `**What triggers human review?**
Low confidence, high stakes, unusual patterns, explicit user request.

**How is human input incorporated?**
Binary approval, selection from options, free-form modification, or escalation to specialist.

**What happens during wait?**
Queue for review, timeout with default, or block progress entirely.

**How to minimize friction?**
Good defaults, clear presentation, quick approval paths, learning from patterns.`
      },
      {
        id: "misconceptions",
        title: "Common Misconceptions",
        content: `**"HITL means slow"**
Well-designed HITL adds minimal latency for most cases. Only edge cases require review.

**"HITL eliminates errors"**
Humans make mistakes too. HITL reduces but doesn't eliminate errors.

**"Full automation is the goal"**
For many applications, human oversight is a feature, not a limitation. The goal is appropriate automation, not maximum automation.`
      }
    ],
    relatedTerms: [
      { slug: "orchestration", label: "Orchestration" },
      { slug: "agentic-workflow", label: "Agentic Workflow" },
      { slug: "planning", label: "Planning" }
    ]
  }
};

// =============================================================================
// PATTERN PAGES - /ai-agents/patterns/*
// =============================================================================
export const patternPagesContent: Record<string, AgentPageContent> = {
  "planner-executor": {
    slug: "planner-executor",
    title: "Planner-Executor Pattern",
    lede: "The planner-executor pattern separates planning from execution, using one agent (or phase) to create plans and another to carry them out.",
    metaDescription: "Planner-executor agent pattern: separate planning from execution for better reliability. Learn when to use, implementation approaches, and pitfalls.",
    sections: [
      {
        id: "problem",
        title: "What Problem It Solves",
        content: `When a single agent both plans and executes, several issues arise:

- **Context pollution**: Planning context interferes with execution context
- **Mode confusion**: The agent may switch between planning and acting inconsistently
- **Evaluation difficulty**: Hard to assess whether failures stem from bad plans or bad execution
- **Specialization limits**: Different capabilities may be optimal for planning vs. execution

The planner-executor pattern addresses these by assigning responsibilities to separate components.`
      },
      {
        id: "how-it-works",
        title: "How It Works",
        content: `**Planner Agent**
Receives the high-level goal and produces a structured plan—a sequence of steps with descriptions, expected inputs/outputs, and success criteria. The planner doesn't execute; it only reasons about what should be done.

**Executor Agent**
Receives individual plan steps and executes them. The executor focuses on carrying out specific actions without concern for overall strategy. It reports results back for evaluation.

**Coordinator**
Manages the interaction: feeds goals to planner, distributes plan steps to executor(s), tracks progress, handles failures, and determines when re-planning is needed.`
      },
      {
        id: "when-to-use",
        title: "When to Use / When to Avoid",
        content: `**Use when:**
- Tasks require distinct planning and execution capabilities
- You need clear separation for debugging and evaluation
- Plans can be meaningfully specified before execution
- You have sufficient task volume to justify the complexity

**Avoid when:**
- Tasks are simple enough for single-agent handling
- Plans cannot be specified without execution feedback (highly exploratory tasks)
- Latency is critical (separation adds coordination overhead)
- You're in early prototyping (simpler approaches validate faster)`
      },
      {
        id: "failure-modes",
        title: "Failure Modes",
        content: `**Over-specified plans**: Plans too detailed constrain executor flexibility, breaking on unexpected situations.

**Under-specified plans**: Plans too vague give executor insufficient guidance, leading to inconsistent execution.

**Plan-reality mismatch**: Plans assume conditions that don't hold during execution.

**Re-planning avoidance**: System continues with outdated plans rather than adapting.

**Coordination overhead**: For simple tasks, the pattern adds complexity without benefit.`
      },
      {
        id: "esy-example",
        title: "Esy Implementation Example",
        content: `In Esy's research workflows, the planner-executor pattern appears in the Research Agent:

**Research Planner** analyzes the user's question and produces a research plan: what sources to consult, what sub-questions to investigate, what evidence would answer the question.

**Research Executor** takes individual plan items and executes them: searching sources, evaluating documents, extracting relevant information.

A **Coordinator** tracks which plan items are complete, aggregates findings, and triggers re-planning when initial research reveals the question needs refinement.

This separation allows the planner to use models optimized for reasoning while executors use models optimized for tool use and extraction.`
      }
    ],
    relatedTerms: [
      { slug: "planning", label: "Planning" },
      { slug: "orchestration", label: "Orchestration" },
      { slug: "agentic-workflow", label: "Agentic Workflow" }
    ]
  },
  
  "router-supervisor": {
    slug: "router-supervisor",
    title: "Router-Supervisor Pattern",
    lede: "The router-supervisor pattern uses a central agent to dynamically route tasks to specialized workers and oversee their outputs for quality.",
    metaDescription: "Router-supervisor agent pattern: dynamic task routing with quality oversight. Learn architecture, implementation, and when to apply this pattern.",
    sections: [
      {
        id: "problem",
        title: "What Problem It Solves",
        content: `Complex tasks often require different capabilities:
- Research needs search and evaluation skills
- Writing needs composition and style control
- Analysis needs data processing and reasoning
- Formatting needs structural transformation

A single general-purpose agent may perform adequately at all tasks but excel at none. Specialized agents excel at specific tasks but can't handle variety. The router-supervisor pattern combines the benefits: a generalist routes to specialists.`
      },
      {
        id: "how-it-works",
        title: "How It Works",
        content: `**Router**
Analyzes incoming tasks and determines which worker agent(s) should handle them. The router understands worker capabilities and task requirements, making routing decisions based on task classification.

**Worker Agents**
Specialized agents optimized for specific task types. Each worker has focused prompts, appropriate tools, and potentially different underlying models suited to their specialty.

**Supervisor**
Reviews worker outputs for quality before passing to the next stage or returning to the user. The supervisor can accept output, request revision, or escalate to human review.`
      },
      {
        id: "when-to-use",
        title: "When to Use / When to Avoid",
        content: `**Use when:**
- Your application handles diverse task types
- Specialized agents significantly outperform generalists
- You have clear criteria for routing decisions
- Quality oversight is important

**Avoid when:**
- Task types are uniform (no routing needed)
- Specialization doesn't meaningfully improve quality
- Latency is critical (routing adds overhead)
- You're early in development (validate with simpler approaches first)`
      },
      {
        id: "failure-modes",
        title: "Failure Modes",
        content: `**Routing errors**: Tasks sent to wrong specialists produce poor results. Mitigation: include confidence in routing; fallback to general agents when uncertain.

**Supervisor bottleneck**: All outputs flowing through one supervisor creates throughput limits. Mitigation: parallelize supervision or use sampling.

**Inconsistent quality**: Different workers produce outputs with varying style/quality. Mitigation: clear output specifications and supervisor normalization.

**Escalation floods**: Too many edge cases escalate to human review. Mitigation: improve routing and worker capabilities based on escalation patterns.`
      },
      {
        id: "esy-example",
        title: "Esy Implementation Example",
        content: `Esy's essay generation workflow uses router-supervisor for the writing phase:

**Router** analyzes each paragraph requirement (introductory hook, evidence presentation, analysis, transition, conclusion) and routes to appropriate specialists.

**Writing Workers** include: Hook Writer (engaging openings), Evidence Integrator (source incorporation), Analyst (interpretation and argument), and Synthesizer (conclusions and connections).

**Supervisor** reviews each section for quality criteria (clarity, evidence use, logical flow) and either approves, requests revision, or flags for human review.

This allows each writing component to be optimized independently while maintaining coherent overall output.`
      }
    ],
    relatedTerms: [
      { slug: "orchestration", label: "Orchestration" },
      { slug: "human-in-the-loop", label: "Human-in-the-Loop" },
      { slug: "agentic-workflow", label: "Agentic Workflow" }
    ]
  },
  
  "reflect-revise": {
    slug: "reflect-revise",
    title: "Reflect-Revise Pattern",
    lede: "The reflect-revise pattern has agents evaluate their own outputs against criteria, then iteratively improve based on self-identified issues.",
    metaDescription: "Reflect-revise agent pattern: self-evaluation and iterative improvement. Learn implementation, stopping criteria, and common pitfalls.",
    sections: [
      {
        id: "problem",
        title: "What Problem It Solves",
        content: `First-draft outputs from language models are often imperfect:
- Missing information or coverage gaps
- Logical inconsistencies or errors
- Style or tone mismatches
- Structural problems

External evaluation catches some issues, but models can often identify problems in their own outputs when explicitly prompted to evaluate them. Reflect-revise systematizes this self-improvement capability.`
      },
      {
        id: "how-it-works",
        title: "How It Works",
        content: `**Generate Phase**
Agent produces initial output for the given task.

**Reflect Phase**
Agent (often with different prompting or even a different model) evaluates the output against explicit criteria:
- Does it fully address the task?
- Is the reasoning sound?
- Are there factual errors?
- Does it meet quality standards?

**Revise Phase**
If reflection identifies issues, agent produces an improved version, specifically addressing the identified problems.

**Iterate**
Reflect-revise cycles continue until output meets criteria or iteration limit is reached.`
      },
      {
        id: "when-to-use",
        title: "When to Use / When to Avoid",
        content: `**Use when:**
- Quality matters more than speed
- You have clear evaluation criteria
- First-draft quality is insufficient
- Self-evaluation meaningfully catches errors

**Avoid when:**
- Latency is critical
- First drafts are typically sufficient
- Evaluation criteria are unclear (reflection has nothing to check against)
- The task is simple (overhead exceeds benefit)`
      },
      {
        id: "failure-modes",
        title: "Failure Modes",
        content: `**Infinite loops**: Agent never satisfies criteria, revising forever. Mitigation: hard iteration limits and diminishing return detection.

**Degradation**: Revisions make output worse. Mitigation: compare revision quality to original; revert if degraded.

**Surface-level fixes**: Reflection identifies real issues but revision only addresses superficially. Mitigation: specific revision prompts targeting identified issues.

**Evaluation blindness**: Reflection consistently misses certain error types. Mitigation: diverse evaluation criteria and occasional external checks.`
      },
      {
        id: "esy-example",
        title: "Esy Implementation Example",
        content: `Esy's essay quality assurance uses reflect-revise:

**Draft Phase**: Initial essay content is generated with sources integrated.

**Reflect Phase**: A QA agent evaluates the draft against criteria:
- Are all claims supported by cited sources?
- Is the argument logically structured?
- Does the tone match the specified audience?
- Are transitions between sections smooth?

**Revise Phase**: If issues are found, specific revisions target each identified problem. The revision prompt includes both the original draft and the specific critique.

**Quality Gate**: After maximum iterations (typically 2-3), output is either accepted or flagged for human review if criteria still aren't met.

This systematically improves essay quality while maintaining reasonable generation times.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-loop", label: "Agentic Loop" },
      { slug: "planning", label: "Planning" },
      { slug: "human-in-the-loop", label: "Human-in-the-Loop" }
    ]
  }
};

// =============================================================================
// WORKFLOW PAGES - /ai-agents/workflows/*
// =============================================================================
export const workflowPagesContent: Record<string, AgentPageContent> = {
  "gated-agent-pipeline": {
    slug: "gated-agent-pipeline",
    title: "Gated Agent Pipeline",
    lede: "A gated pipeline structures agent workflows with explicit quality checkpoints between stages, ensuring outputs meet criteria before advancing.",
    metaDescription: "Gated agent pipeline: quality gates between workflow stages. Learn how gates improve reliability and when to implement checkpoint-based workflows.",
    sections: [
      {
        id: "overview",
        title: "What This Workflow Is",
        content: `A **gated agent pipeline** organizes workflow stages with explicit quality gates between them. Each gate evaluates the preceding stage's output against defined criteria before allowing progression to the next stage.

Unlike linear pipelines where output flows automatically, gated pipelines ensure quality at each transition. Failures at gates trigger revision, alternative processing, or escalation rather than propagating errors downstream.`
      },
      {
        id: "inputs-outputs",
        title: "Inputs and Outputs",
        content: `**Inputs:**
- Task specification (what the workflow should accomplish)
- Stage definitions (what each stage does)
- Gate criteria (what quality means at each transition)
- Failure policies (what happens when gates fail)

**Outputs:**
- Final processed result (if all gates pass)
- Stage-by-stage audit trail
- Quality scores at each gate
- Failure reports with specific issues (if workflow fails)`
      },
      {
        id: "steps",
        title: "Workflow Steps",
        content: `**1. Stage Execution**
Each stage performs its designated task: research, analysis, writing, formatting, etc.

**2. Gate Evaluation**
After each stage, a gate evaluates output against criteria specific to that stage. Gates may use rules, models, or human review.

**3. Decision Point**
Based on evaluation:
- **Pass**: Output advances to next stage
- **Conditional**: Output advances with noted concerns for later review
- **Fail → Revise**: Stage re-executes with feedback from gate
- **Fail → Escalate**: Human review required before proceeding

**4. Progression**
Successful outputs move through stages sequentially until final gate produces accepted output.

**5. Audit**
All gate decisions, scores, and any revisions are logged for transparency.`
      },
      {
        id: "cost-safety",
        title: "Cost and Safety Considerations",
        content: `**Costs:**
- Gates add latency (evaluation takes time)
- Revisions add compute cost
- Complex gates may require specialized evaluators

**Safety benefits:**
- Errors caught early don't propagate
- Quality is guaranteed at each stage
- Audit trails support accountability
- Graceful degradation through escalation

**Trade-offs:**
Adjust gate strictness based on task criticality. High-stakes outputs warrant stricter gates; routine tasks may use lighter evaluation.`
      },
      {
        id: "related-concepts",
        title: "Related Concepts",
        content: `This workflow combines several patterns from this reference:

**Orchestration**: Gates are orchestration checkpoints managing flow between stages.

**Reflect-Revise**: Gate failures that trigger revision implement the reflect-revise pattern.

**Human-in-the-Loop**: Escalation paths bring humans into the loop for edge cases.

**Planning**: Well-designed gates require clear success criteria—a form of upfront planning.`
      }
    ],
    relatedTerms: [
      { slug: "orchestration", label: "Orchestration" },
      { slug: "human-in-the-loop", label: "Human-in-the-Loop" },
      { slug: "agentic-workflow", label: "Agentic Workflow" }
    ]
  },
  
  "research-agent-workflow": {
    slug: "research-agent-workflow",
    title: "Research Agent Workflow",
    lede: "A research agent workflow automates the research process: understanding questions, gathering sources, evaluating credibility, and synthesizing findings.",
    metaDescription: "Research agent workflow: automated research from question to synthesis. Learn stages, evaluation criteria, and implementation considerations.",
    sections: [
      {
        id: "overview",
        title: "What This Workflow Is",
        content: `A **research agent workflow** automates the research process that humans perform when investigating a topic:

1. Understanding what's being asked
2. Identifying relevant sources
3. Gathering information
4. Evaluating source credibility
5. Synthesizing findings
6. Presenting conclusions with citations

The workflow uses multiple specialized agents coordinated through orchestration, with quality gates ensuring reliable outputs.`
      },
      {
        id: "inputs-outputs",
        title: "Inputs and Outputs",
        content: `**Inputs:**
- Research question or topic
- Scope parameters (depth, breadth, time constraints)
- Source preferences (academic, news, specific domains)
- Output format (summary, detailed report, structured data)

**Outputs:**
- Synthesized findings addressing the question
- Source list with credibility assessments
- Key quotes and evidence
- Confidence levels for claims
- Gaps or limitations in available information`
      },
      {
        id: "steps",
        title: "Workflow Steps",
        content: `**1. Question Analysis**
Parse the research question to identify:
- Core concepts and entities
- Implicit sub-questions
- Required scope and depth
- Success criteria

**2. Search Planning**
Generate search strategy:
- Keywords and queries
- Source types to prioritize
- Iteration approach

**3. Source Gathering**
Execute searches, collect candidate sources:
- Web search
- Academic databases
- Specialized sources
- Evaluate initial relevance

**4. Deep Reading**
For promising sources:
- Extract relevant passages
- Note key claims and evidence
- Identify source credibility signals

**5. Synthesis**
Combine findings:
- Identify consensus and conflicts
- Weight evidence by source credibility
- Form conclusions
- Note uncertainty and gaps

**6. Output Generation**
Produce final deliverable:
- Structure appropriate to format
- Include citations
- Highlight confidence levels`
      },
      {
        id: "cost-safety",
        title: "Cost and Safety Considerations",
        content: `**Costs:**
- Search API calls (can be significant at scale)
- Document processing (proportional to source count)
- Synthesis reasoning (scales with complexity)

**Safety considerations:**
- Source credibility must be assessed, not assumed
- Conflicting information should be surfaced, not hidden
- Confidence should be calibrated (don't overclaim)
- Limitations should be explicit

**Mitigations:**
- Set search budgets to control costs
- Use credibility heuristics (domain, publication date, authorship)
- Include uncertainty in outputs
- Flag low-confidence conclusions for human review`
      },
      {
        id: "related-concepts",
        title: "Related Concepts",
        content: `This workflow demonstrates several reference concepts:

**Agentic Loop**: Each step involves perceive-reason-act-evaluate cycles.

**Planning**: Question analysis creates an implicit research plan.

**Tool Use**: Search and document processing require external tools.

**Memory**: Findings must be retained across the synthesis process.

**Orchestration**: Multiple specialized stages require coordination.`
      }
    ],
    relatedTerms: [
      { slug: "agentic-workflow", label: "Agentic Workflow" },
      { slug: "planning", label: "Planning" },
      { slug: "tool-use", label: "Tool Use" },
      { slug: "memory", label: "Memory" }
    ]
  }
};

// =============================================================================
// CONTENT LOOKUP UTILITIES
// =============================================================================

export function getHubContent(): AgentPageContent {
  return hubPageContent;
}

export function getCanonicalContent(): AgentPageContent {
  return canonicalPageContent;
}

export function getTermContent(slug: string): AgentPageContent | undefined {
  return termPagesContent[slug];
}

export function getPatternContent(slug: string): AgentPageContent | undefined {
  return patternPagesContent[slug];
}

export function getWorkflowContent(slug: string): AgentPageContent | undefined {
  return workflowPagesContent[slug];
}

export function getAllTermSlugs(): string[] {
  return Object.keys(termPagesContent);
}

export function getAllPatternSlugs(): string[] {
  return Object.keys(patternPagesContent);
}

export function getAllWorkflowSlugs(): string[] {
  return Object.keys(workflowPagesContent);
}
