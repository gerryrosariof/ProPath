import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, ListTree, ChevronRight, ChevronDown, Target, Info, Layers } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_DECISION_TREE, MOCK_DECISION_RULES } from '@/data/model';
import type { DecisionTreeNode } from '@/utils/types';

function TreeNode({ node, depth, isLast }: { node: DecisionTreeNode; depth: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.type === 'leaf';

  return (
    <div className="relative">
      {/* Connector lines */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 border-l-2 border-slate-200"
          style={{ left: `${depth * 24 - 12}px` }}
        />
      )}

      <div
        className="flex items-start gap-2 py-2"
        style={{ paddingLeft: `${depth * 24}px` }}
      >
        {/* Expand/collapse toggle */}
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 mt-0.5"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div className="flex-shrink-0 w-5" />
        )}

        {/* Node content */}
        <div className={`flex-1 rounded-lg border p-3 ${isLeaf ? 'border-teal-200 bg-teal-50' : 'border-slate-200 bg-white'}`}>
          {isLeaf ? (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-800">{node.program}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge tone="teal">Confidence {Math.round((node.confidence ?? 0) * 100)}%</Badge>
                  <span className="text-xs text-slate-500">{node.samples} samples</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone="slate">
                  {node.type === 'root' ? 'ROOT' : 'BRANCH'}
                </Badge>
                {node.condition && (
                  <span className="text-sm font-semibold text-slate-700">
                    {node.condition}
                  </span>
                )}
              </div>
              {node.attribute && !node.condition && (
                <span className="text-sm font-bold text-slate-800">{node.attribute}</span>
              )}
              {node.attribute && node.condition && (
                <span className="text-xs text-slate-500 ml-1">→ {node.attribute}</span>
              )}
              {node.samples !== undefined && (
                <span className="text-xs text-slate-400 ml-2">({node.samples} samples)</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child, idx) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              isLast={idx === node.children!.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DecisionTreeViewer() {
  const [viewMode, setViewMode] = useState<'tree' | 'rules'>('tree');

  return (
    <AppShell title="Decision Tree">
      <div className="max-w-4xl mx-auto space-y-5">
        <Link
          to="/admin/model"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Model
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Decision Tree Viewer</h2>
            <p className="text-slate-500 mt-1">
              Explore the trained C4.5 tree structure and extracted classification rules.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulation Notice:</span> The tree and rules below are hardcoded mock data
            representing what a trained C4.5 model would produce.
          </p>
        </div>

        {/* View toggle */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
          <button
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
              viewMode === 'tree' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ListTree className="w-4 h-4" />
            Tree View
          </button>
          <button
            onClick={() => setViewMode('rules')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
              viewMode === 'rules' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Rule Set
          </button>
        </div>

        {/* Tree View */}
        {viewMode === 'tree' && (
          <Card>
            <CardHeader
              title="Tree Structure"
              subtitle="Expandable nodes — leaf nodes show predicted program and confidence"
              icon={<GitBranch className="w-5 h-5" />}
            />
            <div className="p-5">
              <TreeNode node={MOCK_DECISION_TREE} depth={0} isLast />
            </div>
          </Card>
        )}

        {/* Rules View */}
        {viewMode === 'rules' && (
          <Card>
            <CardHeader
              title="Extracted Rules"
              subtitle={`${MOCK_DECISION_RULES.length} IF-THEN rules derived from the decision tree`}
              icon={<Layers className="w-5 h-5" />}
            />
            <div className="p-5 space-y-3">
              {MOCK_DECISION_RULES.map((rule, idx) => (
                <div
                  key={rule.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-teal-700">R{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-xs font-bold text-slate-400">IF</span>
                        {rule.conditions.map((cond, cidx) => (
                          <span key={cidx} className="inline-flex items-center gap-1">
                            <span
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-700"
                            >
                              {cond}
                            </span>
                            {cidx < rule.conditions.length - 1 && (
                              <span className="text-xs font-bold text-slate-400">AND</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold text-slate-400">THEN</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-sm font-bold text-teal-800">
                          {rule.program}
                        </span>
                        <Badge tone="teal">Conf. {Math.round(rule.confidence * 100)}%</Badge>
                        <Badge tone="slate">{rule.coverage}% coverage</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
