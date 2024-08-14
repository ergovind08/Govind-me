// src/index.ts
import rehypePrismPlus from "rehype-prism-plus";

// src/withCodeAttributes.ts
import { visit } from "unist-util-visit";
var withCodeAttributes = () => (tree) => {
  visit(tree, "element", (node) => {
    var _a, _b;
    if (node.tagName === "pre") {
      const attributes = {};
      const firstNode = node.children[0];
      if (firstNode && firstNode.tagName === "code") {
        const linesCount = firstNode.children.length;
        if (linesCount) {
          attributes.lines = linesCount;
        }
        const lang = ((_a = node.properties.className[0]) == null ? void 0 : _a.replace("language-", "")) || "";
        if (lang) {
          attributes.language = lang;
        }
        const meta = ((_b = firstNode.data) == null ? void 0 : _b.meta) || "";
        const metas = meta.match(/[^{}]+(?=})/g) || [];
        metas.forEach((attr) => {
          if (attr.indexOf(":")) {
            const key = attr.split(":")[0];
            const val = attr.split(":")[1];
            attributes[key] = val;
          }
        });
        Object.keys(attributes).forEach((key) => {
          node.properties[`data-${key}`] = attributes[key];
        });
      }
    }
  });
};
var withCodeAttributes_default = withCodeAttributes;

// src/withInlineHighlights.ts
import { visit as visit2 } from "unist-util-visit";
var withInlineHighlights = () => (tree) => {
  visit2(tree, "element", (codeElement, _index, parent) => {
    var _a;
    if (!parent || parent.tagName !== "pre" || codeElement.tagName !== "code") {
      return;
    }
    const meta = ((_a = codeElement.data) == null ? void 0 : _a.meta) || "";
    const metas = meta.match(/[^{}]+(?=})/g) || [];
    metas.forEach((attr) => {
      if (attr.indexOf(":")) {
        const [key, val] = attr.split(":");
        if (key.toLowerCase() === "inlineHighlight".toLowerCase()) {
          const [keyword, selected = 0, className = void 0] = val.split("|");
          const selectedIdx = selected && selected.split(",") || [];
          let idx = 0;
          visit2(codeElement, "text", (textNode, index, parentNode) => {
            if (textNode.value === keyword) {
              idx += 1;
              if (selected !== "0" && selectedIdx.length > 0 && selectedIdx.indexOf(idx.toString()) === -1)
                return;
              parentNode.children[index] = {
                type: "element",
                tagName: "span",
                properties: {
                  className: ["inline-highlight", className]
                },
                children: [textNode]
              };
            }
          });
        }
      }
    });
  });
};
var withInlineHighlights_default = withInlineHighlights;

// src/index.ts
var plugins = [
  rehypePrismPlus,
  withInlineHighlights_default,
  withCodeAttributes_default
];
var src_default = plugins;
export {
  src_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93aXRoQ29kZUF0dHJpYnV0ZXMudHMiLCAiLi4vc3JjL3dpdGhJbmxpbmVIaWdobGlnaHRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgcmVoeXBlUHJpc21QbHVzIGZyb20gJ3JlaHlwZS1wcmlzbS1wbHVzJztcblxuaW1wb3J0IHdpdGhDb2RlQXR0cmlidXRlcyBmcm9tICcuL3dpdGhDb2RlQXR0cmlidXRlcyc7XG5pbXBvcnQgd2l0aElubGluZUhpZ2hsaWdodHMgZnJvbSAnLi93aXRoSW5saW5lSGlnaGxpZ2h0cyc7XG5cbmltcG9ydCB0eXBlIHsgUGx1Z2dhYmxlTGlzdCB9IGZyb20gJ3VuaWZpZWQnO1xuXG5jb25zdCBwbHVnaW5zOiBQbHVnZ2FibGVMaXN0ID0gW1xuICByZWh5cGVQcmlzbVBsdXMsXG4gIHdpdGhJbmxpbmVIaWdobGlnaHRzLFxuICB3aXRoQ29kZUF0dHJpYnV0ZXMsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuXG5pbXBvcnQgeyB2aXNpdCB9IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQnO1xuXG5jb25zdCB3aXRoQ29kZUF0dHJpYnV0ZXMgPSAoKSA9PiAodHJlZTogYW55KSA9PiB7XG4gIHZpc2l0KHRyZWUsICdlbGVtZW50JywgKG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS50YWdOYW1lID09PSAncHJlJykge1xuICAgICAgY29uc3QgYXR0cmlidXRlczoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgICB9ID0ge307XG5cbiAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG5cbiAgICAgIGlmIChmaXJzdE5vZGUgJiYgZmlyc3ROb2RlLnRhZ05hbWUgPT09ICdjb2RlJykge1xuICAgICAgICAvLyBsaW5lcyBhdHRyaWJ1dGVcbiAgICAgICAgY29uc3QgbGluZXNDb3VudCA9IGZpcnN0Tm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmIChsaW5lc0NvdW50KSB7XG4gICAgICAgICAgYXR0cmlidXRlcy5saW5lcyA9IGxpbmVzQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsYW5ndWFnZSBhdHRyaWJ1dGVcbiAgICAgICAgY29uc3QgbGFuZyA9XG4gICAgICAgICAgbm9kZS5wcm9wZXJ0aWVzLmNsYXNzTmFtZVswXT8ucmVwbGFjZSgnbGFuZ3VhZ2UtJywgJycpIHx8ICcnO1xuICAgICAgICBpZiAobGFuZykge1xuICAgICAgICAgIGF0dHJpYnV0ZXMubGFuZ3VhZ2UgPSBsYW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWV0YSA9IGZpcnN0Tm9kZS5kYXRhPy5tZXRhIHx8ICcnO1xuICAgICAgICBjb25zdCBtZXRhcyA9IG1ldGEubWF0Y2goL1tee31dKyg/PX0pL2cpIHx8IFtdO1xuXG4gICAgICAgIC8vIGR5bmFtaWMgYXR0cmlidXRlc1xuICAgICAgICBtZXRhcy5mb3JFYWNoKChhdHRyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoYXR0ci5pbmRleE9mKCc6JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGF0dHIuc3BsaXQoJzonKVswXTtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGF0dHIuc3BsaXQoJzonKVsxXTtcblxuICAgICAgICAgICAgYXR0cmlidXRlc1trZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYXBwbHkgYXR0cmlidXRlc1xuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBub2RlLnByb3BlcnRpZXNbYGRhdGEtJHtrZXl9YF0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoQ29kZUF0dHJpYnV0ZXM7XG4iLCAiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbmltcG9ydCB7IHZpc2l0IH0gZnJvbSAndW5pc3QtdXRpbC12aXNpdCc7XG5cbmNvbnN0IHdpdGhJbmxpbmVIaWdobGlnaHRzID0gKCkgPT4gKHRyZWU6IGFueSkgPT4ge1xuICB2aXNpdCh0cmVlLCAnZWxlbWVudCcsIChjb2RlRWxlbWVudCwgX2luZGV4LCBwYXJlbnQpID0+IHtcbiAgICBpZiAoIXBhcmVudCB8fCBwYXJlbnQudGFnTmFtZSAhPT0gJ3ByZScgfHwgY29kZUVsZW1lbnQudGFnTmFtZSAhPT0gJ2NvZGUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YSA9IGNvZGVFbGVtZW50LmRhdGE/Lm1ldGEgfHwgJyc7XG4gICAgY29uc3QgbWV0YXMgPSBtZXRhLm1hdGNoKC9bXnt9XSsoPz19KS9nKSB8fCBbXTtcblxuICAgIG1ldGFzLmZvckVhY2goKGF0dHI6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGF0dHIuaW5kZXhPZignOicpKSB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbF0gPSBhdHRyLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSAnaW5saW5lSGlnaGxpZ2h0Jy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgY29uc3QgW2tleXdvcmQsIHNlbGVjdGVkID0gMCwgY2xhc3NOYW1lID0gdW5kZWZpbmVkXSA9IHZhbC5zcGxpdCgnfCcpO1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJZHggPSAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQuc3BsaXQoJywnKSkgfHwgW107XG5cbiAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICB2aXNpdChjb2RlRWxlbWVudCwgJ3RleHQnLCAodGV4dE5vZGUsIGluZGV4LCBwYXJlbnROb2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGV4dE5vZGUudmFsdWUgPT09IGtleXdvcmQpIHtcbiAgICAgICAgICAgICAgaWR4ICs9IDE7XG5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkICE9PSAnMCcgJiZcbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkeC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJZHguaW5kZXhPZihpZHgudG9TdHJpbmcoKSkgPT09IC0xXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5jaGlsZHJlbltpbmRleCFdID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlbGVtZW50JyxcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBbJ2lubGluZS1oaWdobGlnaHQnLCBjbGFzc05hbWVdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt0ZXh0Tm9kZV0sXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoSW5saW5lSGlnaGxpZ2h0cztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLHFCQUFxQjs7O0FDRzVCLFNBQVMsYUFBYTtBQUV0QixJQUFNLHFCQUFxQixNQUFNLENBQUMsU0FBYztBQUM5QyxRQUFNLE1BQU0sV0FBVyxDQUFDLFNBQVM7QUFObkM7QUFPSSxRQUFJLEtBQUssWUFBWSxPQUFPO0FBQzFCLFlBQU0sYUFFRixDQUFDO0FBRUwsWUFBTSxZQUFZ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