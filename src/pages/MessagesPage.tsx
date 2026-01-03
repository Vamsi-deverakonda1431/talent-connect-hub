import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const mockConversations = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    avatar: 'TC',
    lastMessage: 'Thank you for your application. We would like to schedule an interview.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    name: 'DesignHub',
    avatar: 'DH',
    lastMessage: 'Hi! We reviewed your portfolio and are impressed.',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 3,
    name: 'DataFlow',
    avatar: 'DF',
    lastMessage: 'Could you share more about your experience with Python?',
    time: '2 days ago',
    unread: false,
  },
];

const mockMessages = [
  { id: 1, sender: 'them', text: 'Hi Alex! Thank you for applying to the Senior Frontend Developer position.', time: '10:30 AM' },
  { id: 2, sender: 'them', text: 'We reviewed your application and are very impressed with your experience.', time: '10:31 AM' },
  { id: 3, sender: 'me', text: 'Thank you! I\'m very excited about this opportunity.', time: '10:45 AM' },
  { id: 4, sender: 'them', text: 'Would you be available for a video interview this week?', time: '11:00 AM' },
  { id: 5, sender: 'me', text: 'Yes, I\'m available Thursday or Friday afternoon.', time: '11:15 AM' },
  { id: 6, sender: 'them', text: 'Perfect! Let\'s schedule it for Thursday at 2 PM. I\'ll send you the meeting link.', time: '11:20 AM' },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');

  return (
    <DashboardLayout 
      title="Messages"
      subtitle="Communicate with employers"
    >
      <div className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden h-[calc(100vh-12rem)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-80 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <Input placeholder="Search messages..." />
            </div>
            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                    selectedConversation.id === conv.id 
                      ? 'bg-muted' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-sm font-medium text-primary-foreground flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-medium text-primary-foreground">
                {selectedConversation.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedConversation.name}</p>
                <p className="text-sm text-muted-foreground">Hiring Manager</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.sender === 'me'
                        ? 'gradient-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button variant="hero">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
