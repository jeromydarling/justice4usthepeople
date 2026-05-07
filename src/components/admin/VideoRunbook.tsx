// A non-techy walkthrough of how the promo video gets made and how to make
// new ones. Pairs with the "Videos" category in the prompt library.

export function VideoRunbook() {
  return (
    <section id="videos" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Videos</p>
        <h2 className="mt-2 font-serif text-2xl">
          How videos get made on this site.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          The promo video is real HTML and CSS. You can edit it, render new
          variants, or generate fresh music — all by talking to Claude.
        </p>

        <h3 className="mt-7 font-serif text-xl">The five files that matter</h3>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-bone-100 p-4">
            <dt className="font-mono text-xs text-ink-muted">promo/index.html</dt>
            <dd className="mt-1 text-sm text-ink-soft">
              The whole video. Each beat is a <code>&lt;div class=&quot;beat&quot;&gt;</code> with{" "}
              <code>data-start</code> and <code>data-duration</code> in seconds.
              Editing this is editing the video.
            </dd>
          </div>
          <div className="rounded-2xl bg-bone-100 p-4">
            <dt className="font-mono text-xs text-ink-muted">promo/script.md</dt>
            <dd className="mt-1 text-sm text-ink-soft">
              Editorial script + voiceover lines + the music brief. Edit this
              first when you want to change the storyline.
            </dd>
          </div>
          <div className="rounded-2xl bg-bone-100 p-4">
            <dt className="font-mono text-xs text-ink-muted">promo/meta.json</dt>
            <dd className="mt-1 text-sm text-ink-soft">
              Duration, FPS, resolution. You&rsquo;ll rarely touch this.
            </dd>
          </div>
          <div className="rounded-2xl bg-bone-100 p-4">
            <dt className="font-mono text-xs text-ink-muted">public/promo/skyline.png</dt>
            <dd className="mt-1 text-sm text-ink-soft">
              The backdrop. Drop a new AI-generated illustration here and
              re-render to swap it.
            </dd>
          </div>
          <div className="rounded-2xl bg-bone-100 p-4">
            <dt className="font-mono text-xs text-ink-muted">scripts/generate-promo-music.ts</dt>
            <dd className="mt-1 text-sm text-ink-soft">
              The ElevenLabs music brief. Edit the <code>PROMPT</code>{" "}
              constant to change the music vibe.
            </dd>
          </div>
          <div className="rounded-2xl bg-bone-100 p-4">
            <dt className="font-mono text-xs text-ink-muted">.github/workflows/render-promo.yml</dt>
            <dd className="mt-1 text-sm text-ink-soft">
              The GitHub Action that ties it all together — generates the
              music, renders the video, and pushes a branch with the new MP4.
            </dd>
          </div>
        </dl>

        <h3 className="mt-8 font-serif text-xl">The render loop</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink">
          <li>Ask Claude to make whatever change you want (copy, timing, skyline, music brief).</li>
          <li>Claude commits to a branch and merges to <code>main</code>.</li>
          <li>
            <strong>You</strong> trigger the render: GitHub →{" "}
            <strong>Actions → Render promo video → Run workflow</strong>.
          </li>
          <li>
            The action runs for a few minutes, then pushes a{" "}
            <code>render-promo/&lt;run-id&gt;</code> branch with the new MP4.
          </li>
          <li>
            Ask Claude to <em>open the PR</em> for that branch (or click the
            link printed at the end of the workflow).
          </li>
          <li>Review the MP4 in the PR. If it looks right, merge — site picks it up automatically.</li>
        </ol>

        <h3 className="mt-8 font-serif text-xl">A few common asks</h3>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-indigo-700">·</span>
            <span>
              <strong>Change a single line of dialogue.</strong>{" "}
              <em>&ldquo;On the promo, change beat 3 from &lsquo;X&rsquo; to &lsquo;Y&rsquo;.&rdquo;</em>{" "}
              Re-render.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-700">·</span>
            <span>
              <strong>Swap the skyline image.</strong> Drop a new file at{" "}
              <code>public/promo/skyline.png</code>, ask Claude to re-render.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-700">·</span>
            <span>
              <strong>Refresh just the music.</strong>{" "}
              <em>&ldquo;Generate fresh ElevenLabs music with a [different vibe], same composition, re-render.&rdquo;</em>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-700">·</span>
            <span>
              <strong>Make a 30-second cutdown for social.</strong>{" "}
              <em>&ldquo;Save promo/index-30s.html with beats 1, 4, 6, 7. Add a render script.&rdquo;</em>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-700">·</span>
            <span>
              <strong>Spanish version.</strong>{" "}
              <em>&ldquo;Translate every caption in the promo into Spanish, save as promo/index-es.html.&rdquo;</em>
            </span>
          </li>
        </ul>

        <div className="mt-7 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm leading-relaxed text-indigo-900">
          <p className="font-semibold">A few costs to know about</p>
          <p className="mt-1">
            ElevenLabs charges per render (a 60s clip is a few dollars). The
            video render itself is free — runs in GitHub Actions. Try not to
            re-render music for trivial copy edits; you can re-render the
            video without regenerating music by unchecking the &ldquo;Regenerate music&rdquo;
            box in the workflow form.
          </p>
        </div>

        <p className="mt-5 text-sm text-ink-soft">
          See the prompt library&rsquo;s <strong>Videos</strong> category
          above for ready-to-paste prompts that handle each of these.
        </p>
      </div>
    </section>
  );
}
