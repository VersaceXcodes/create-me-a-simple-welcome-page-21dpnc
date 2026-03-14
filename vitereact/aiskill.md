<launchpulse_ai>
  <purpose>
    LaunchPulse AI is already wired into this web app through a proxy-backed client.
    Use the existing wrapper and hooks for AI features instead of installing provider SDKs or adding raw provider keys.
  </purpose>

  <read_first>
    Read these files before building AI features:
    - `src/__create/ai.ts`
    - `src/hooks/useAI.ts`
  </read_first>

  <rules>
    - DO NOT install `openai`, `anthropic`, `@google/generative-ai`, or other AI SDKs
    - DO NOT add `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or similar provider env vars
    - DO NOT call provider APIs directly from the browser app
    - DO NOT create a duplicate backend AI proxy unless the feature explicitly requires server orchestration
    - Default to the existing LaunchPulse wrapper for all app-side AI requests
  </rules>

  <files>
    - Client wrapper: `/app/vitereact/src/__create/ai.ts`
    - Hooks: `/app/vitereact/src/hooks/useAI.ts`
  </files>

  <proxy_contract>
    The wrapper sends POST requests to:
    - `${VITE_LAUNCHPULSE_API_URL}/api/ai/proxy`

    Request body shape:
    - `projectId`
    - `token`
    - `messages`
    - `model`
    - `temperature`
    - `max_tokens`
    - `stream`

    Default model:
    - `google/gemini-2.0-flash-001`
  </proxy_contract>

  <env>
    LaunchPulse auto-injects these Vite env vars:
    - `VITE_LAUNCHPULSE_AI_KEY`
    - `VITE_LAUNCHPULSE_PROJECT_ID`
    - `VITE_LAUNCHPULSE_API_URL`

    If AI fails with `AI_NOT_CONFIGURED`, fix env wiring.
    Do not solve that by installing packages.
  </env>

  <usage_patterns>
    One-off question:
    ```ts
    import { ai } from './__create/ai'

    const reply = await ai.ask('Summarize this dashboard data')
    ```

    Chat completion:
    ```ts
    const response = await ai.chat.completions.create({
      messages: [{ role: 'user', content: 'Draft a customer support reply' }],
    })

    const text = response.choices[0]?.message?.content ?? ''
    ```

    Streaming response:
    ```ts
    for await (const chunk of ai.chat.completions.stream({
      messages: [{ role: 'user', content: 'Write a product description' }],
    })) {
      // append chunk to UI
    }
    ```

    Hook-based UI:
    ```ts
    import { useChat, useAsk } from './hooks/useAI'

    const { messages, send, sendStream, isLoading, isStreaming } = useChat()
    const { ask, response, error } = useAsk()
    ```

    Vision analysis:
    ```ts
    const result = await ai.vision.analyzeImage({
      prompt: 'Describe the contents of this receipt',
      imageUrl: 'https://example.com/receipt.jpg',
    })
    ```
  </usage_patterns>

  <implementation_guidance>
    - Use `useChat()` or `useAsk()` for UI state unless the screen truly needs custom state management
    - Save generated app data to your own backend/database only if the feature needs persistence
    - If a feature also needs backend routes, the backend should persist app data, not replace the LaunchPulse AI proxy pattern
    - For image workflows, pass `imageUrl` or `imageBase64` into `ai.vision.analyzeImage()` instead of inventing a separate upload-to-model path
  </implementation_guidance>

  <testing>
    - Test the AI flow in the affected UI
    - Verify loading, empty, and error states
    - If the feature touches backend data too, run backend `curl` verification after the AI interaction
    - Check browser console and network requests for failed LaunchPulse proxy calls
  </testing>
</launchpulse_ai>
