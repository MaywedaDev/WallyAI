import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { StyleSheet, View, Button } from "react-native";

export default function VideoScreen() {
  const [videoSource, setVideoSource] = useState(
    "https://cloud.appwrite.io/v1/storage/buckets/67f977460021f98c23b1/files/67ffc3990022e02dd933/view?project=67f938e90016c65a8a33"
  );
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
