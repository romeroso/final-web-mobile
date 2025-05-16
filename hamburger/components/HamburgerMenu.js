import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {
  Menu,
  X,
  Home,
  User,
  Smile,
  UtensilsCrossed,
} from 'lucide-react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import SettingsScreen from './screens/SettingsScreen';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const slideAnim = useState(new Animated.Value(-300))[0];

  const toggleMenu = () => {
    const toValue = menuOpen ? -300 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const handleTabPress = (title) => {
    setActiveTab(title);
    toggleMenu();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'BMI':
        return <ProfileScreen />;
      case 'Ai Chat':
        return <ChatBotScreen />;
      case 'Calories':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const menuItems = [
    { id: 1, title: 'Home', icon: Home },
    { id: 2, title: 'BMI', icon: User },
    { id: 3, title: 'Calories', icon: UtensilsCrossed },
    { id: 4, title: 'Ai Chat', icon: Smile },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          {menuOpen ? (
            <X size={24} color="#000" />
          ) : (
            <Menu size={24} color="#000" />
          )}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FitTracker</Text>
      </View>

      {menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}

      <Animated.View
        style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
        <ScrollView>
          <Text style={styles.menuTitle}>Menu</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItems}
              onPress={() => handleTabPress(item.title)}>
              <item.icon size={20} color="#333" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => setActiveTab(item.title)}>
            <item.icon
              size={24}
              color={activeTab === item.title ? '#007AFF' : '#333'}
            />
            <Text
              style={[
                styles.navText,
                activeTab === item.title && styles.boldText,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 50 },
  overlay: {
  position: 'absolute',
  top: 60,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1, // Below menu
},
  menu: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: 250, 
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  menuTitle: { fontSize: 20, fontWeight: 'bold', padding: 15 },
  menuItems: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  menuItemText: { marginLeft: 10, fontSize: 16 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 14, color: '#333', marginTop: 5 },
  boldText: { fontWeight: 'bold', color: '#007AFF' },
});

export default App;
